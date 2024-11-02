import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { userId } = location.state;

    const client = new Client();
    client
        .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

    const account = new Account(client);

    const verifyOTP = async () => {
        try {
            const response = await account.updatePhoneSession(userId, otp);
            console.log('Phone session verified:', response);

            // Redirect to the address page upon successful verification
            navigate('/address');
        } catch (error) {
            console.error('Error verifying session:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="max-w-lg mx-auto bg-white p-8 border border-gray-300">
                <h1 className="text-2xl font-semibold mb-5">Verify OTP</h1>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={verifyOTP}
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full mt-5"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

// export default VerifyOTP;
