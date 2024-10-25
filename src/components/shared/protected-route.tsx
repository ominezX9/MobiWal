import { useAppDispatch, useAppSelector } from "@hooks/index";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useLazyGetUserQuery } from "@api/usersApi"; // Assuming this is from RTK Query
import { updateUser } from "store/action";

export default function ProtectedRoute() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { password } = useAppSelector((store) => store.userDetails); // Select user password from Redux
    const navigate = useNavigate();

    const [getMyDetails, { isLoading, isError }] = useLazyGetUserQuery({
        refetchOnReconnect: true,
    });

    // Function to initiate the app, checking if the user is authenticated
    const initiateApp = useCallback(async (password: string) => {
        try {
            // If user is not authenticated, redirect to login
            if (!password) {
                navigate("/login");
            } else {
                // Fetch user details if authenticated
                const res = await getMyDetails(password); 
                if (res?.data) {
                    // Dispatch the action to update user details in the Redux store
                    dispatch(
                        updateUser({
                            password,
                            id: res.data?.id || "",
                            name: res.data?.name || "",
                            email: res.data?.email || "",
                            phone: res.data?.phone || "",
                            balance: res.data?.balance || 0,
                        })
                    );
                }
            }
        } catch (err) {
            // Handle the error and navigate to login if necessary
            if (!password) navigate("/login");
        }
    }, [dispatch, navigate, getMyDetails]);

    const pathsAllowedWithoutAuth = new Set(["/update-password"]);

    useEffect(() => {
        if (!password && !pathsAllowedWithoutAuth.has(pathname)) {
            navigate("/login");
        } else {
            initiateApp(password || "");
        }
    }, [password, pathname, initiateApp, navigate]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: Could not fetch user details.</p>;
    }

    return <Outlet />;
}
