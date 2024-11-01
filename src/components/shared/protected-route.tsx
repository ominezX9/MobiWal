import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/index"; 
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "@api/usersApi"; 
import { updateUser } from "store/action";
import { SessionStorageService } from "services/SessionStorageService";

const pathsAllowedWithoutAuth = new Set(["/signup", "/update-password"]);

export default function ProtectedRoute() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { password } = useAppSelector((state) => state.userDetails);
    const isUserSignedIn = SessionStorageService.getItem("user");
    const navigate = useNavigate();
    const [getMyDetails, { isLoading, isError }] = useLazyGetUserQuery({ refetchOnReconnect: true });

    useEffect(() => {
        const authenticateUser = async () => {
            if (!isUserSignedIn && !pathsAllowedWithoutAuth.has(pathname)) {
                navigate("/login");
            } else if (password || isUserSignedIn) {
                const response = await getMyDetails(password || "");
                if (response?.data) {
                    dispatch(updateUser({
                        password,
                        id: response.data.id || "",
                        name: response.data.name || "",
                        email: response.data.email || "",
                        acc_no: response.data.acc_no || "",
                        balance: response.data.balance || 0,
                    }));
                }
            }
        };

        authenticateUser();
    }, [dispatch, getMyDetails, isUserSignedIn, password, pathname, navigate]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: Could not fetch user details.</p>;

    return <Outlet />;
}
