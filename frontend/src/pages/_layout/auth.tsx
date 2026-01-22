import { Outlet } from "react-router";

export function AuthLayout() { 
    return(
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
             <Outlet></Outlet>
        </div>
    )
}