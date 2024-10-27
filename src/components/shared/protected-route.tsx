import React, { useCallback, useEffect, startTransition } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/index"; 
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "@api/usersApi"; 
import { updateUser } from "store/action";
import { SessionStorageService } from "services/SessionStorageService";

export default function ProtectedRoute() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { password } = useAppSelector((store) => store.userDetails);
    const isUserSignedIn = SessionStorageService.getItem("user");
    const navigate = useNavigate();

    console.log(password);

    const [getMyDetails, { isLoading, isError }] = useLazyGetUserQuery({
        refetchOnReconnect: true,
    });

    const pathsAllowedWithoutAuth = new Set([
        "/signup", 
        "/update-password", 
    ]);

    const initiateApp = useCallback((password: string) => {
        if (!password && !isUserSignedIn && !pathsAllowedWithoutAuth.has(pathname)) {
            startTransition(() => {
                navigate("/login");
            });
        } else {
            (async () => {
                try {
                    if (!isUserSignedIn) {
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
                    // Additional user-related logic here if necessary
                } catch (err) {
                    // Error handling
                    if (!password && !pathsAllowedWithoutAuth.has(pathname)) {
                        navigate("/login");
                    }
                }
            })();
        }
    }, [dispatch, navigate, getMyDetails, isUserSignedIn, pathname, pathsAllowedWithoutAuth]);

    useEffect(() => {
        if (!password && !isUserSignedIn && !pathsAllowedWithoutAuth.has(pathname)) {
            startTransition(() => navigate("/login"));
        } else {
            initiateApp(password || "");
        }
    }, [password, pathname, initiateApp, navigate, isUserSignedIn, pathsAllowedWithoutAuth]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: Could not fetch user details.</p>;
    }

    return <Outlet />;
}
