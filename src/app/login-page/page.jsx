import { GoogleLogo } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

const LoginPage = () => {
    return (
        <div className="h-screen flex justify-center items-center gap-x-7" id="loginPage">
            {/* Begin of Login */}
            <div className="flex flex-col gap-y-7 w-[300px]">
                {/* Begin of Heading */}
                <h2 className="text-2xl font-semibold">Login</h2>
                {/* End of Heading */}

                {/* Begin of Login Form */}
                <form className="flex flex-col gap-y-3">
                    <input type="text" placeholder="Email" className="text-sm p-2 rounded-2xl outline-none tracking-widest"/>
                    <input type="password" placeholder="Password" className="text-sm p-2 rounded-2xl outline-none tracking-widest"/>
                    <input type="submit" value="Login" className="bg-neutral-700/40 tracking-wider p-2 rounded-2xl hover:bg-neutral-700 transition"/>
                </form>
                {/* End of Login Form  */}

                <span className="border-t-2 w-full text-center">OR</span>

                {/* Begin of Google Btn */}
                
                    <button className="flex justify-center items-center gap-x-3 p-2 rounded-2xl bg-neutral-700/40 hover:bg-neutral-700 transition">
                        <GoogleLogo className="text-xl"/>
                        <span className="text-sm">Login with Google</span>
                    </button>
                
                {/* End of Google Btn */}

                <Link href="/" className="text-xs font-semibold underline">Forgot my Password</Link>

                {/* Begin of Register */}
                <div className="flex flex-col item-start gap-y-3 ">
                    <p className="text-sm">If  you don't have an account, please register.</p>
                    <button className="bg-neutral-700/40 hover:bg-neutral-700 transition px-4 py-1 rounded-2xl text-sm tracking-wider">Register</button>
                </div>
                {/* End of Register */}
            </div>
            {/* End of Login */}

            {/* Begin of Image */}
            <div className="relative w-[600px] grid place-items-center">
                <img
                src="/loginsrc/sofa.gif"
                className="absolute rounded-2xl"/>
            </div>
            {/* End of Image */}
        </div>
    )
}

export default LoginPage