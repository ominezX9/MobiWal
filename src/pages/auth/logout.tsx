import { useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Start a transition to navigate asynchronously
        startTransition(() => {
            sessionStorage.removeItem('user');
            navigate('/login');
        });
    }, [navigate]);

    return (
        <div className='flex h-full w-full items-center justify-center'>
            Logging out...
        </div>
    );
}
