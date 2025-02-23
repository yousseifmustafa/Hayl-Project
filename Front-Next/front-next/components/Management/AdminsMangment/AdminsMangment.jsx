"use client";

import { useState } from "react";
import AdminPreview from "./AdminPreview";
import CreateAdmin from "./CreateAdmin";
import AdminList from "./AdminList";

const initialAdmins = [
  {
    id: "#A1001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Owner",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "#A1002",
    firstName: "Emily",
    lastName: "Smith",
    email: "emily.smith@example.com",
    role: "Admin",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
];

export default function AdminsManagement() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [view, setView] = useState("list");

  const addNewAdmin = (newAdmin) => {
    setAdmins([...admins, { ...newAdmin, id: `#A${1000 + admins.length + 1}` }]);
    setView("list");
  };

  const updateAdmin = (updatedAdmin) => {
    if (!updatedAdmin) {
      setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id));
      setSelectedAdmin(null);
    } else {
      setAdmins(admins.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin)));
      setSelectedAdmin(updatedAdmin);
    }
  };

  return (
    <>
      {view === "create" ? (
        <CreateAdmin onCreate={addNewAdmin} onCancel={() => setView("list")} />
      ) : selectedAdmin ? (
        <AdminPreview
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
          onUpdate={updateAdmin}
        />
      ) : (
        <AdminList
          admins={admins}
          onSelectAdmin={setSelectedAdmin}
          onAddAdmin={() => setView("create")}
        />
      )}
    </>
  );
}
