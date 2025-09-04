import { createBrowserRouter } from "react-router";
import { AuthLayout } from "./pages/_layout/auth";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <AuthLayout></AuthLayout>,
        children: [
            {path: '/sign-in', element: <SignIn></SignIn>},
            {path: '/sign-up', element: <SignUp></SignUp>}
        ]
    }
])