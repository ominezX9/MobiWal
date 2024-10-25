import { lazy } from "react"
import { Route } from "react-router-dom"
const Dashboard = lazy(() => import("@pages/dashboard"))

export function dashboardRoute(){
    return(
        <Route path="dashboard" element={<Dashboard/>}>

        </Route>
    )
}