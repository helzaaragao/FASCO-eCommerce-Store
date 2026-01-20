import { Outlet } from "react-router";

export function AuthLayout() { 
    return(
        <div className="lg:p-7">
             <Outlet></Outlet>
        </div>
    )
}