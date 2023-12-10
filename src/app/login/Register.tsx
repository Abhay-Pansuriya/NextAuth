"use client";
import React, { useState } from 'react'
const Register = () => {
    type Input = { email: string, password: string }
    const [input, setInput] = useState<Input>({ email: "", password: "" })
    const [error, setError] = useState<string>("");

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const submitRegister = async (e: any) => {
        e?.preventDefault();
        if (input.email && input.password) {
            if (validateEmail(input.email)) {
                try {
                    const res = await fetch("/api/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(input)
                    });
                    if (res?.status === 200) {
                        alert("User has been registered")
                    }else setError("Something went wrong")
                    console.log("🚀 ~ file: Register.tsx:25 ~ submitRegister ~ res:", res)
                } catch (error: any) {
                    setError(error)
                }
            } else setError("Please enter valid email")
        } else setError("Both Email and passwords are required")

    }
    return (
        <div><div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-primary border-t-4 border-primary-content rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-primary-content">Register</h1>
                <form className="space-y-4" onSubmit={submitRegister}>
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
                {error && <div role="alert" className="alert alert-error mt-3" onClick={() => setError("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>}
            </div>
        </div></div>
    )
}

export default Register