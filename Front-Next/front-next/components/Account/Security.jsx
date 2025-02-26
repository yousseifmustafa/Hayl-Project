"use client";

import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteHandler, useUpdateHandler } from "./AccountHander";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { passwordSchema } from "./AccountSchema";

export default function Security() {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [input, setInput] = useState("");
  const DeleteMeMutation = useDeleteHandler();
  const updatePasswordMutation = useUpdateHandler();

  const handleDeleteAccount = async () => {
    DeleteMeMutation.mutate();
  };

  return (
    <div className="w-full flex items-center justify-center md:p-6">
      <div className="bg-white rounded-2xl w-full p-6">
        <h2 className="text-3xl font-bold mb-6">Security Settings</h2>
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Change Password</h3>

          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              updatePasswordMutation.mutate({
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
                passwordConfirm: values.confirmPassword,
              });
            }}
          >
            {({ isValid }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <Field
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    className="border border-gray-300 rounded-lg p-4 w-full"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <Field
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      className="border border-gray-300 rounded-lg p-4 w-full"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      className="border border-gray-300 rounded-lg p-4 w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`max-w-md w-full sm:w-[25%] font-bold py-4 rounded-lg transition-all text-white 
                    ${
                      isValid
                        ? "bg-custom-yellow-4 hover:bg-custom-yellow-4/80"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  Change Password
                </button>
              </Form>
            )}
          </Formik>
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md sm:w-[40%] text-center">
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
