import { RouterProvider } from "react-router";
import { routerConfig } from "./routes";

export function App() {
  return(
    <>
     <RouterProvider router={routerConfig}></RouterProvider>
    </>
  )
}
