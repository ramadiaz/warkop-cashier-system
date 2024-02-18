"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const router = useRouter()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        })
        const userInfo = await response.json()
        console.log(userInfo)
        router.push('/login')
    }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <form onSubmit={registerUser} className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => {setData({...data, name: e.target.value})}}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => {setData({...data, email: e.target.value})}}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => {setData({...data, password: e.target.value})}}
          />
          

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </form>
    </div>
  );
};

export default Page
