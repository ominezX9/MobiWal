import { useCallback, useEffect, startTransition } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/index"; 
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "@api/usersApi"; 
import { updateUser } from "store/action";
import { SessionStorageService } from "services/SessionStorageService";

const pathsAllowedWithoutAuth = new Set(["/signup", "/update-password"]);

export default function ProtectedRoute() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { password } = useAppSelector((store) => store.userDetails);
    const isUserSignedIn = SessionStorageService.getItem("user");
    const navigate = useNavigate();

    const [getMyDetails, { isLoading, isError }] = useLazyGetUserQuery({
        refetchOnReconnect: true,
    });

    // Initiate app function without navigate check (moved to useEffect) 👌🐱‍🐉
    const initiateApp = useCallback(async () => {
        if (!isUserSignedIn) {
            const res = await getMyDetails(password || "");
            if (res?.data) {
                startTransition(() => {
                    dispatch(
                        updateUser({
                            password,
                            id: res?.data?.id || "",
                            name: res?.data?.name || "",
                            email: res?.data?.email || "",
                            phone: res?.data?.phone || "",
                            balance: res?.data?.balance || 0,
                        })
                    );
                });
            }
        }
    }, [dispatch, getMyDetails, isUserSignedIn, password]);

    useEffect(() => {
        if (!password && !isUserSignedIn && !pathsAllowedWithoutAuth.has(pathname)) {
            // 🤳 Navigate to login if not authenticated and path is restricted
            startTransition(() => navigate("/login"));
        } else if (password || isUserSignedIn) {
            // Call initiateApp only when there’s a password or user is signed in
            initiateApp();
        }
    }, [password, pathname, isUserSignedIn, navigate, initiateApp]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: Could not fetch user details.</p>;
    }

    return <Outlet />;
}
