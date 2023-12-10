"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Login = () => {
    type Input = { email: string, password: string }
    const [input, setInput] = useState<Input>({ email: "", password: "" })
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session?.status === "authenticated") {
            console.log("🚀 ~ file: Login.tsx:15 ~ useEffect ~ session:", session)
            router.push("/dashboard")
        }
    }, [session])

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    const submitLogin = async (e: any) => {
        e?.preventDefault();
        if (input.email && input.password) {
            if (validateEmail(input.email)) {
                // here we are providing credentials provider which we cerated in login route file
                const res = await signIn("credentials", {
                    redirect: false,
                    email: input.email,
                    password: input.password

                });
                if (res?.error) { setError("Invalid Email or Password") }
                if (res?.url) router.push("/dashboard")
            } else setError("Please enter valid email")
        } else setError("Both Email and passwords are required")

    }
    return (
        <div><div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-primary border-t-4 border-primary-content rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-primary-content">Login</h1>
                <form className="space-y-4" onSubmit={submitLogin}>
                    <div>
                        <label className="label"><span className="text-base label-text text-primary-content">Email</span></label>
                        <input type="text" value={input?.email} onChange={(e: any) => setInput({ ...input, email: e.target.value })} placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text text-primary-content">Password</span></label>
                        <input type="password" value={input?.password} onChange={(e: any) => setInput({ ...input, password: e.target.value })} placeholder="Enter Password" className="w-full input input-bordered" />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className="btn bg-green-600 border-green-600 w-1/3 align-center" type='submit'>Register</button>
                    </div>
                </form>
            </div>
            {error && <div role="alert" className="alert alert-error mt-3" onClick={() => setError("")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
            </div>}
        </div></div>
    )
}

export default Login