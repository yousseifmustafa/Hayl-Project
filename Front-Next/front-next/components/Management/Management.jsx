  "use client";

  import dynamic from "next/dynamic";
  import { useState } from "react";
  import LeftMenu from "./LeftMenu";

  const Dashboard = dynamic(() => import("./Dashboard/Dashboard"), { ssr: false });
  const ProductsManagement = dynamic(() => import("./ProductsManagement/ProductsManagement"), { ssr: false });
  const OrderManagement = dynamic(() => import("./OrderMangment/orderMangment"), { ssr: false });
  const UsersManagement = dynamic(() => import("./CustomersManagement/CustomersManagement"), { ssr: false });
  const AdminManagement = dynamic(() => import("./AdminsMangment/AdminsMangment"), { ssr: false });

  export default function Management() {
    const [page, setPage] = useState("Dashboard");

    return (
      <div className="bg-gray-100   absolute top-0 bottom-0 left-0 right-0">
        <div className=" p-[2%] pt-6 m-auto flex bg-gray-100">
          <div className="w-[30%]  bg-gray-100  h-dvh ">
            <LeftMenu page={page} setPage={setPage} />
          </div>

          <div className="w-3/4 mt-2 p-4 ">
            {page === "Dashboard" && <Dashboard />}
            {page === "Products Management" && <ProductsManagement />}
            {page === "Order Management" && <OrderManagement />}
            {page === "Customers Management" && <UsersManagement />}
            {page === "Admins Management" && <AdminManagement />}
          </div>
        </div>
      </div>
    );
  }
