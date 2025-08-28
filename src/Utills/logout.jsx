import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear any stored data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        // Navigate to login
        navigate("/");
    };
    return (
        <button
            onClick={handleLogout}
            className=" text-red-700 hover:bg-blue-500 px-20 py-2 rounded text-sm cursor-pointer"
        >
            <FiLogOut className="inline-block mr-2" />
            Logout
        </button>
    );
}