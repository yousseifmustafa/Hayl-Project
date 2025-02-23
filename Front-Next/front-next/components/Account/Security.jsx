"use client";

import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function Security() {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [input, setInput] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword.length < 8)
      return "New password must be at least 8 characters.";
    if (newPassword === currentPassword)
      return "New password cannot be the same as the old password.";
    if (newPassword !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handlePasswordSubmit = async () => {
    const error = validatePassword();
    if (error) {
      alert(error);
      return;
    }
    try {
      console.log("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (isConfirmed) {
      try {
        console.log("Account deleted.");
        setDeletePopupOpen(false);
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl w-full p-6">
        <h2 className="text-3xl font-bold mb-6">Account Settings</h2>
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Change Password</h3>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-lg p-4 w-full"
            />
            <div className="flex gap-3">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-lg p-4 w-full"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-lg p-4 w-full"
              />
            </div>
            <button
              onClick={handlePasswordSubmit}
              className="w-[25%] bg-custom-yellow-4 text-white font-bold py-4 rounded-lg hover:bg-custom-yellow-4/80 transition-all"
            >
              Change Password
            </button>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold">Account Deletion</h3>
          <div
            onClick={() => setDeletePopupOpen(true)}
            className="underline flex items-center gap-1 text-red-600 hover:cursor-pointer font-bold py-4 mt-4"
          >
            <MdDeleteForever />
            <p>Delete Account</p>
          </div>
        </div>
      </div>

      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[40%] text-center">
            <h2 className="text-xl font-semibold text-red-500">
              Are you sure?
            </h2>
            <p className="mt-2">
              If you delete your account, you will not be able to create a new
              account with this email.
            </p>
            <input
              type="text"
              placeholder='Write "delete" to proceed'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 mt-4 rounded bg-gray-800 text-white border border-gray-600 text-center"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={input !== "delete"}
              className={`w-full p-2 mt-4 rounded font-bold text-white transition-all 
        ${
          input === "delete"
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-700 cursor-not-allowed"
        }`}
            >
              Delete
            </button>
            <button
              onClick={() => setDeletePopupOpen(false)}
              className="w-full p-2 mt-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
