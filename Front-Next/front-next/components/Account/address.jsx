import React, { useState, useEffect } from "react";
import AddressCard from "@/components/Account/AddressCard";
import AddressForm from "@/components/Account/AddressForm";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Youssef Mustafa",
      phone: "+20-10-22968460",
      department: "بجوار الجامع الكبير",
      street: "Street No. 74",
      buildingNumber: "482",
      city: "Al Obour City",
      state: "Al Qalyubia Governorate",
      zipCode: "6361716",
      isDefault: true,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  // This ensures the component runs only after client-side rendering
  useEffect(() => {
    // Optionally add any client-side only logic here if needed.
  }, []);

  const handleAddAddress = () => {
    setShowForm(true);
    setCurrentAddress(null);
  };

  const handleEditAddress = (address) => {
    setShowForm(true);
    setCurrentAddress(address);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => {
        const updatedAddresses = prev.filter((address) => address.id !== id);
        if (!updatedAddresses.some((addr) => addr.isDefault) && updatedAddresses.length > 0) {
          updatedAddresses[0].isDefault = true;
        }
        return updatedAddresses;
      });
    }
  };

  const handleSaveAddress = (address) => {
    setAddresses((prev) => {
      let updatedAddresses;
      if (address?.id) {
        updatedAddresses = prev.map((item) => (item.id === address.id ? address : item));
      } else {
        updatedAddresses = [...prev, { ...address, id: prev.length + 1 }];
      }
      if (!updatedAddresses.some((addr) => addr.isDefault)) {
        updatedAddresses[0].isDefault = true;
      }
      return updatedAddresses;
    });
    setShowForm(false);
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4">Addresses</h2>
        <p className="text-gray-600 mb-6">Manage your saved addresses for fast and easy checkout.</p>
        <button
          onClick={handleAddAddress}
          className="main-bg-color text-white font-bold py-3 px-6 rounded-lg hover:cursor-pointer transition-all mb-6"
        >
          ADD NEW ADDRESS
        </button>
        {[{ title: "Default address", filter: (a) => a?.isDefault }, { title: "Other addresses", filter: (a) => !a?.isDefault }].map(
          ({ title, filter }) => (
            <div key={title}>
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              {addresses?.filter(filter).length ? (
                addresses?.filter(filter).map((address) => (
                  <AddressCard
                    key={address?.id}
                    address={address}
                    addresses={addresses}
                    setAddresses={setAddresses}
                    onEdit={() => handleEditAddress(address)}
                    onDelete={() => handleDeleteAddress(address?.id)}
                    onSetDefault={() => handleSetDefault(address?.id)}
                  />
                ))
              ) : (
                <p className="text-gray-600">No {title.toLowerCase()} added.</p>
              )}
            </div>
          )
        )}
      </div>
      {showForm && <AddressForm address={currentAddress} onClose={() => setShowForm(false)} onSave={handleSaveAddress} />}
    </div>
  );
}
