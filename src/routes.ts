import { createBrowserRouter } from "react-router";
import { AuthLayout } from "./pages/_layout/auth";
import { SignIn } from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import { Home } from "./pages/home";


export const routerConfig = createBrowserRouter([
    {
        path: "/",
        Component: AuthLayout,
        children: [
            { index: true, Component: Home }, 
            { path: 'sign-in', Component: SignIn }, 
            { path: 'sign-up', Component: SignUp }
        ]
    }
])
