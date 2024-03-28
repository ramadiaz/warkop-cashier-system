"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const router = useRouter();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        contact: ''
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data}),
            cache: "no-store"
        })
        const userInfo = await response.json()
        console.log(userInfo)
        router.push('/login')
    }

    return (
        <div
            className="h-screen flex justify-center items-center gap-x-7 mx-6"
            id="loginPage"
        >
            <div className="relative w-[600px] grid place-items-center">
                <img src="/loginsrc/sofa.gif" className="absolute rounded-2xl" />
            </div>

            <div className="flex flex-col gap-y-7 w-[300px]">

                <h2 className="text-2xl font-semibold">Register</h2>

                <form onSubmit={registerUser} className="flex flex-col gap-y-3">
                    <input
                        type="text"
                        className="text-sm p-2 rounded-2xl outline-none tracking-widest"
                        name="fullname"
                        placeholder="Full Name"
                        value={data.name}
                        onChange={(e) => { setData({ ...data, name: e.target.value }) }}
                    />

                    <input
                        type="email"
                        className="text-sm p-2 rounded-2xl outline-none tracking-widest"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                    />

                    <input
                        type="text"
                        className="text-sm p-2 rounded-2xl outline-none tracking-widest"
                        name="contact"
                        placeholder="Contact"
                        value={data.contact}
                        onChange={(e) => { setData({ ...data, contact: e.target.value }) }}
                    />

                    <input
                        type="text"
                        className="text-sm p-2 rounded-2xl outline-none tracking-widest"
                        name="address"
                        placeholder="Address"
                        value={data.address}
                        onChange={(e) => { setData({ ...data, address: e.target.value }) }}
                    />

                    <input
                        type="password"
                        className="text-sm p-2 rounded-2xl outline-none tracking-widest"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                    />

                    <button
                        type="submit"
                        className="bg-neutral-700/40 tracking-wider p-2 rounded-2xl hover:bg-neutral-700 transition"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center text-sm text-grey-dark">
                    By Signing up, You Agree to The {" "}
                    <a
                        className="no-underline border-b border-grey-dark text-grey-dark hover:border-green-400 hover:text-green-400 transition-all duration-300"
                        href="#"
                    >
                        Terms of Service
                    </a>{" "}
                    and {" "}
                    <a
                        className="no-underline border-b border-grey-dark text-grey-dark hover:border-green-400 hover:text-green-400 transition-all duration-300"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                </div>

                <span className="border-t-2 w-full text-center"></span>
                
                <div className="text-grey-dark text-center">
                    Already Have an Account? {" "}
                    <a
                        className="no-underline border-b border-blue text-blue hover:border-green-400 hover:text-green-400 transition-all duration-300"
                        href="../login/"
                    >
                        Log in.
                    </a>
                </div>


            </div>
        </div>

    )
}

export default Page