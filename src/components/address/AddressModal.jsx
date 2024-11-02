import React, { useState } from 'react'


const AddressModal = ({ onSave, onCancel }) => {

    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        zipCode: ''
    });
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 mb-2 w-full"
                    value={shippingAddress.name}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Address"
                    className="border p-2 mb-2 w-full"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="City"
                    className="border p-2 mb-2 w-full"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    className="border p-2 mb-2 w-full"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                />
                <button
                    onClick={handleAddressSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-4 w-full"
                >
                    Save Address
                </button>
                <button
                    onClick={() => setShowAddressPopup(false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 mt-2 w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default AddressModal
