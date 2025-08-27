import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
