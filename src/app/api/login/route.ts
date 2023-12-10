import User from "@/models/User";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";


export const POST = async (request: any) => {
    const { email, password } = await request.json();
    if (email && password) {
        await connect();
        try {
            const existingUser = await User.findOne({ email, password }).lean();
            if (!existingUser) {
                return new NextResponse("No user found to login", { status: 400 })
            } else {                
                return new NextResponse("You are logged in successfully", { status: 200 })
            }
        } catch (err: any) {
            return new NextResponse(err, { status: 500 })
        }
    } else return new NextResponse("Either Email or password is missing", { status: 500 })
}