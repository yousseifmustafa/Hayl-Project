import React, { useState } from "react";
import AddressCard from "@/components/Account/AddressCard";
import AddressForm from "@/components/Account/AddressForm";
import { useAddress } from "@/Hooks/useUser";
import {
  useAddAddressHandler,
  useDeleteAddressHandler,
  useEditAddressHandler,
  useSetDefaultAddressHandler,
} from "./AccountHander";

export default function AddressBook() {
  const { data: addresses } = useAddress();
  const DeleteAddressMutation = useDeleteAddressHandler();
  const DefaultAddressMutation= useSetDefaultAddressHandler();
  const addAddressMutation = useAddAddressHandler();
  const editAddressMutation = useEditAddressHandler();
  const [showForm, setShowForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleAddAddress = () => {
    setShowForm(true);
    setCurrentAddress(null);
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setShowForm(true);
  };

  const handleDeleteAddress = (id) => {
    DeleteAddressMutation.mutate(id);
  };

  const handleUpdateAddress = (address) => {
    console.log("ana el update address : " , address);
    
    editAddressMutation.mutate(address);
    setShowForm(false);
  };
  const handleSaveAddress = (address) => {
    addAddressMutation.mutate(address);
    setShowForm(false);
  };

  const handleSetDefault = (id) => {
    DefaultAddressMutation.mutate(id)
  };
  return (
    <div className="w-full min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Addresses</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Manage your saved addresses for fast and easy checkout.
        </p>
        <button
          onClick={handleAddAddress}
          className="main-bg-color text-white font-bold py-3 px-4 sm:px-6 rounded-lg hover:cursor-pointer transition-all mb-6 w-full sm:w-auto"
        >
          ADD NEW ADDRESS
        </button>
        {[
          { title: "Default address", filter: (a) => a?.isDefault },
          { title: "Other addresses", filter: (a) => !a?.isDefault },
        ].map(({ title, filter }) => (
          <div key={title} className="mt-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>
            {addresses?.length && addresses.some(filter) ? (
              <div className="grid gap-4 sm:gap-6">
                {addresses.filter(filter).map((address, index) => (
                  <AddressCard
                    key={address?._id || index}
                    address={address}
                    addresses={addresses}
                    onEdit={() => handleEditAddress(address)}
                    onDelete={() => handleDeleteAddress(address?._id)}
                    onSetDefault={() => handleSetDefault(address?._id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No {title.toLowerCase()} added.</p>
            )}
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <AddressForm
            address={currentAddress}
            onSave={handleSaveAddress}
            onUpdate={handleUpdateAddress}
            onClose={() => {
              setShowForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
