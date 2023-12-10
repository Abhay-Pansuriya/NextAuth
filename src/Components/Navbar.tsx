"use client";
import React from 'react'
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {

    const { data: session }: any = useSession();
    return (
        <div>
            <div className="navbar bg-primary text-primary-content">
                <div className="navbar-start">
                    <Link href="/" className="btn btn-ghost text-xl">Basic Authentication</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/dashboard/boards">Boards</Link></li>
                    </ul>
                </div>
                {
                    !session ?
                        <div className="navbar-end">
                            <Link href="/login" className="btn">Login / Register</Link>
                        </div> :
                        <>
                            <div className="navbar-end">
                                Welcome : {session?.user?.email}
                                <button className="btn" onClick={() => signOut()}>Logout</button>
                            </div>
                        </>
                }
            </div>

        </div>
    )
}

export default Navbar