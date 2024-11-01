import { lazy, Suspense } from "react";
import { 
    createBrowserRouter ,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import ProtectedRoute from "@components/shared/protected-route";
import DefaultLayout from "layout/layout";
import Redirect from "@components/shared/redirect";

import { dashboardRoute } from "./dashboard-routes";
import Signup from "@pages/auth/signup";
import Logout from "@pages/auth/logout";
import Login from "@pages/auth/login";
import More from "@pages/dashboard/more";
// pages
// const Login = lazy(() => import("@pages/auth/login"));

const Transfer = lazy(() => import("@pages/dashboard/transfer"));
const TopUp = lazy(() => import("@pages/topup"));
const Bills = lazy(() => import("@pages/bills"));
const Profile  = lazy(() => import("@pages/profile"));



const appRoutes = (
    <Route 
        path="/" 
        element={<ProtectedRoute/>}
    >
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/logout" element={<Logout/>}/>
        
        <Route
            element={
                <Suspense
                    fallback={"Loading..."}
                >
                    <DefaultLayout/>
                </Suspense>
            }
        >
            <Route
                index 
                element={<Redirect to="/dashboard" />}
            />
            {dashboardRoute()}
            <Route 
                path="transfer"
                element={<Transfer/>}
            />
            <Route 
                path="topup"
                element={<TopUp/>}
            />
            <Route 
                path="bills"
                element={<Bills/>}
            />
            <Route
                path="more"
                element={<More/>}
            />
            <Route
                path="profile"
                element={<Profile/>}
            />

        </Route>

    </Route>
)
const routes = createRoutesFromElements(appRoutes);
const Router = createBrowserRouter(routes);

export default Router;
