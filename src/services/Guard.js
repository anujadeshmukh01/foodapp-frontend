import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

export const CustomerRoute = ({ element: Component }) => {
    const location = useLocation();

    const authenticated = ApiService.isAthenticated();
    const customer = ApiService.isCustomer();
    const admin = ApiService.isAdmin();

    if (!authenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (!customer && !admin) {
        return <Navigate to="/home" replace />;
    }

    return Component;
};

export const AdminRoute = ({ element: Component }) => {
    const location = useLocation();

    if (!ApiService.isAthenticated() || !ApiService.isAdmin()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return Component;
};