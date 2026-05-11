import { RouterProvider } from "react-router";
import { routerConfig } from "./routes";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <RouterProvider router={routerConfig}></RouterProvider>
      <Toaster position="bottom-right" richColors></Toaster>
    </>
  );
}
