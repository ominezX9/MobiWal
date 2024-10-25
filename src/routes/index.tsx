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

// pages
const Login = lazy(() => import("@pages/auth/login"))

const appRoutes = (
    <Route 
        path="/" 
        element={<ProtectedRoute/>}
    >
        <Route path="/login" element={<Login/>}/>
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

        </Route>

    </Route>
)
const routes = createRoutesFromElements(appRoutes);
const Router = createBrowserRouter(routes);

export default Router;
