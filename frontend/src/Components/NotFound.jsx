import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("Page not found!");
        navigate("/", { replace: true });
    }, [navigate]);

    return null;
}

export default NotFound;