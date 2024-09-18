// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Create the UserContext
// export const AdminContext = createContext();

// // Create a provider component
// export const AdminUser = ({ children }) => {
//     const [admin, setAdmin] = useState(null);  // Default to null
//     const [error, setError] = useState(null); // Error state

//     // Fetch user data (on app load or after login)
//     // useEffect(() => {
//         const fetchAdminData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/auth/admin-login', { withCredentials: true });
//                 const user = response.data.user;
//                 console.log(user);
//                 setAdmin(user);  // Assuming the API returns user data
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError('Error fetching data');
//             }
//         };

//     //     fetchUser();
//     // }, []);

//     return (
//         <AdminContext.Provider value={{ admin, setAdmin, fetchAdminData, error }}>
//             {children}
//         </AdminContext.Provider>
//     );
// };