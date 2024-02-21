"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const Page = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();
        signIn("credentials", {
            ...data,
            callbackUrl: '/',
        });
    };
    return (
        <div
            className="h-screen flex justify-center items-center gap-x-7 mx-6"
            id="loginPage"
        >
            {/* Begin of Image */}
            <div className="relative w-[600px] grid place-items-center">
                <img src="/loginsrc/sofa.gif" className="absolute rounded-2xl" />
            </div>
            {/* End of Image */}

            {/* Begin of Login */}
            <div className="flex flex-col gap-y-7 w-[300px]">

                {/* Begin of Heading */}
                <h2 className="text-2xl font-semibold">Register</h2>
                {/* End of Heading */}

                {/* Begin of Login Form */}
                <form onSubmit={loginUser} className="flex flex-col gap-y-3">
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
                {/* End of Login Form  */}

                <span className="border-t-2 w-full text-center"></span>


                {/* Begin of Footnote */}
                <div className="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the {" "}
                    <a
                        className="no-underline border-b border-grey-dark text-grey-dark"
                        href="#"
                    >
                        Terms of Service
                    </a>{" "}
                    and {" "}
                    <a
                        className="no-underline border-b border-grey-dark text-grey-dark"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                </div>
                {/* End of Footnote */}
            </div>
            {/* End of Login */}
        </div>

    )
}

export default Page