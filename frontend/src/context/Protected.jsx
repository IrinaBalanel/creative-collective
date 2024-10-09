import { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Protected = ({ children, adminRoute = false,  providerRoute = false, clientRoute = false}) => {
	const { user, loading } = useContext(UserContext);
	const location = useLocation(); // gets the current route location
	
	// if (user === undefined) {
	// 	return <div>Loading...</div>; // shows loading until token verification is done
	// }

	if (loading) {
        return <div>Loading...</div>;
    }
	// If guest user tries to access admin routes
	if (!user) {
		if (adminRoute) {
			return <Navigate to="/admin/login" state={{ from: location }} />;
		}
	}
	// If guest user tries to access client routes
	if (!user) {
		if (clientRoute) {
			return <Navigate to="/login" state={{ from: location}} />;
		} 
	}
	// If guest user tries to access client provider routes
	if (!user) {
		if (providerRoute) {
			return <Navigate to="/login" state={{ from: location, fromProvider: true}} />;
		} 
	}

	// If logged in user tries to access provider routes but not a provider
	if (user && user.role !== "provider") {
		if (providerRoute) {
			return <Navigate to="/login" state={{ from: location, fromProvider: true }} />;
		}
	}
	// If logged in user tries to access client routes but not an client
	if (user && user.role !== "client") {
		if (clientRoute) {
			return <Navigate to="/login" state={{ from: location }} />;
		}
	}

	// If logged in user tries to access admin routes but not an admin
	if (adminRoute && user.role !== "admin") {
		return <Navigate to="/admin/login" />;
	}

	return children;
};

export default Protected;