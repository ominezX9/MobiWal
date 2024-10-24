

import { useAppDispatch, useAppSelector } from "@hooks/index";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useLazyGetUserQuery } from "@api/usersApi";
import { updateUser } from "store/action";


export default function ProtectedRoute() {
    const dispatch = useAppDispatch()
    const { pathname } = useLocation();
    const { password } = useAppSelector((store) => store.userDetails)
    const navigate = useNavigate();

    const [getMyDetails, { isLoading, isError }] = useLazyGetUserQuery({
        refetchOnReconnect: true,
    });

    const initiateApp = useCallback(async function (password: string){
        try{
            // If the user is not authenticated, redirect to login page
            if (!password) {
                navigate("/login");
            } else {
                // If the user is authenticated, fetch their details
                const res = await getMyDetails(password);
                dispatch(
                    updateUser({
                        id: res.data?.id || "",
                        name: res.data?.name || "",
                        email: res.data?.email || "",
                        phone: res.data?.phone || "",
                        balance: res.data?.balance || 0,
                        password
                    })
                )
            }
        } catch (err) {
            !password && navigate("/login");
        }
    }, [])
    const pathsAllowedWithoutAuth = new  Set([
        "/update-password",
    ])

    useEffect(() => {
        if (!password && !pathsAllowedWithoutAuth.has(pathname)) {
          navigate("/login");
        } else {
          initiateApp(password || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, initiateApp]);

    if (isLoading) {
        return <p>loading ... </p>;
    }
    if (isError) {
        return <p>404</p>;
    }
    return (
        <Outlet/>
    )
}
