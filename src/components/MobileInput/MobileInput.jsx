import React from 'react'

const MobileInput = () => {
    return (
        <div>

            <htmlForm className=" mx-auto w-60">
                <div className="flex items-center ">

                    <div id="dropdown-phone" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700">
                    </div>
                    <label htmlFor="phone-input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Phone number:</label>
                    <div className="relative w-full">
                        <input type="text" id="phone-input" aria-describedby="helper-text-explanation" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </div>
                </div>
                <p id="helper-text-explanation" className="mt-2 mb-4 text-sm text-gray-500 dark:text-gray-400">We will send you an SMS with a verification code.</p>
                <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send verification code</button>
            </htmlForm>

        </div>
    )
}

export default MobileInput
