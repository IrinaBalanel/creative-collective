import SideNav from "../../components/SideNav/SideNav";
import ProfileButton from "../../components/ProfileButton"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { formatDate, formatTime, capitalizeFirstLetter } from "../../functions";
import "./ProviderAppointments.css"


export default function ProviderSettings() {
    const { user_id } = useParams();
    const [token, setToken] = useState(null);
    const [userUri, setUserUri] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    // Fetching the token from database
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/provider/settings/${user_id}/token`, {
                    withCredentials: true
                });
                const providerToken = response.data.provider.calendly_token;
                setToken(providerToken);
            } catch (error) {
                console.error('Error fetching token:', error);
                setError('Failed to fetch token');
            }
        };

        if (user_id) {
            fetchToken();
        }
    }, [user_id]);

    // Fetching current user info from Calendly using the token
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!token) return;
            try {
                const response = await axios.get('https://api.calendly.com/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                //console.log(response.data)
                const userUri = response.data.resource.uri;
                setUserUri(userUri);
            } catch (error) {
                console.error('Error fetching Calendly user info:', error);
                setError('Failed to fetch Calendly user info');
            }
        };

        if (token) {
            fetchUserInfo();
        }
    }, [token]);

    // Fetching scheduled events using the user's URI
    useEffect(() => {
        const fetchCalendlyEvents = async () => {
            if (!userUri) return;
            try {
                const response = await axios.get('https://api.calendly.com/scheduled_events', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        user: userUri,
                        sort: 'start_time:asc'
                    }
                });
                console.log(response.data)
                //setAppointments(response.data.collection);
                const sortedAppointments = response.data.collection.filter(appointment => new Date(appointment.start_time) >= new Date());
                setAppointments(sortedAppointments);
                console.log(sortedAppointments)
            } catch (error) {
                console.error('Error fetching Calendly events:', error);
                setError('Failed to fetch appointments');
            }
        };

        if (userUri) {
            fetchCalendlyEvents();
        }
    }, [userUri, token]);

    return (
        <>
            <SideNav/>
            <main className="main">
                <ProfileButton/>
                <h1 className="dashboard-header-one" style={{textAlign:"center"}}>Upcoming Appointments</h1>
                {/* <h2> Appointments</h2> */}
                <div className="appointments">
                    {appointments && appointments.map((appointment) => (
                        <div key={appointment.uri} className="appointment">
                            <div className="dateTime-container">
                                <p>{formatDate(appointment.start_time)} </p>
                                <p>{formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}</p>
                            </div>
                            <div className="app-text-container">
                                <h3>{appointment.name}</h3>
                                <p>
                                    <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                    </svg>
                                    {appointment.location.location}
                                </p>
                            </div>
                            <div className="status-container">
                                {appointment.status === "active" && (
                                    <p style={{color: "green", fontWeight: "600"}}>{appointment.status}</p>
                                )}
                                {appointment.status === "canceled" && (
                                    <p style={{color: "red", fontWeight: "600"}}>{appointment.status}</p>
                                )}
                            </div>
                            
                        </div>
                    ))}
                    {appointments < 1 && (
                        <p><i>No appointments yet.</i></p>
                    )}
                </div>
            </main>
        </>
    )
}