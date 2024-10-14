import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from "../../components/SideNav/SideNav";
import ProfileButton from "../../components/ProfileButton";
import { formatDate, formatTime } from "../../functions";
import "./ProviderAppointments.css";
import { baseUrl } from "../../config";

export default function ProviderSettings() {
    const { user_id } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            //console.log("User id to get calendly events", user_id)
            try {
                const response = await axios.get(`${baseUrl}/provider/calendly/${user_id}/appointments`, {
                    withCredentials: true
                });
                //console.log("Response from fetching Calendly data:", response);
                const { userInfo, appointments } = response.data;
                
                const sortedAppointments = appointments.filter(appointment => new Date(appointment.start_time) >= new Date());
                setAppointments(sortedAppointments);
            } catch (error) {
                // console.log("Error fetching Calendly data:", error);
                setError("Failed to fetch appointments");
            }
        };

        if (user_id) {
            fetchAppointments();
        }
    }, [user_id]);

    return (
        <>
            <SideNav />
            <main className="main">
                <ProfileButton />
                <h1 className="dashboard-header-one" style={{ textAlign: "center" }}>Upcoming Appointments</h1>
                <p>{error}</p>
                <div className="appointments">
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment.uri} className="appointment">
                                <div className="dateTime-container">
                                    <p>{formatDate(appointment.start_time)} </p>
                                    <p>{formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}</p>
                                </div>
                                <div className="app-text-container">
                                    <h3>{appointment.name}</h3>
                                    <p>{appointment.location?.location || "Online"}</p>
                                </div>
                                <div className="status-container">
                                    {appointment.status === "active" && (
                                        <p style={{ color: "green", fontWeight: "600" }}>{appointment.status}</p>
                                    )}
                                    {appointment.status === "canceled" && (
                                        <p style={{ color: "red", fontWeight: "600" }}>{appointment.status}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p><i>No appointments yet.</i></p>
                    )}
                </div>
            </main>
        </>
    );
}