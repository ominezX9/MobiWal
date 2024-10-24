import { lazy } from "react";
import { 
    createBrowserRouter ,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import ProtectedRoute from "@components/shared/protected-route";

const Login = lazy(() => import("@pages/auth/login"))

const appRoutes = (
    <Route 
        path="/" 
        element={<ProtectedRoute/>}
    >
        <Route path="/login" element={<Login/>}/>

    </Route>
)
const routes = createRoutesFromElements(appRoutes);
const Router = createBrowserRouter(routes);

export default Router;
