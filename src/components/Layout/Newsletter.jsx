import React from 'react'

const Newsletter = () => {
  return (
    <div className="bg-[#21669a] py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Subscribe to our newsletter</h2>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. 
          Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="flex w-full max-w-md rounded overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 text-black outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6">
              SUBSCRIBE →
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-8 opacity-80 flex-wrap">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Philips_logo_new.svg" alt="Philips" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Toshiba_logo.svg" alt="Toshiba" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" className="h-5" />
        </div>
      </div>
  )
}

export default Newsletter
