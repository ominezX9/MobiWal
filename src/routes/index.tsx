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

// pages
const Login = lazy(() => import("@pages/auth/login"))
const Logout = lazy(() => import("@pages/auth/logout"));

const Transfer = lazy(() => import("@pages/dashboard/transfer"));

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

        </Route>

    </Route>
)
const routes = createRoutesFromElements(appRoutes);
const Router = createBrowserRouter(routes);

export default Router;
