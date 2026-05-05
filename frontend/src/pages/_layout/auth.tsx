import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex justify-center bg-gray-50 p-4 lg:p-10">
      <Outlet></Outlet>
    </div>
  );
}
