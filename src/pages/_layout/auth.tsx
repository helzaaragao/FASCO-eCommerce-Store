import { Outlet } from "react-router";

export function AuthLayout() { 
    return(
        <div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}