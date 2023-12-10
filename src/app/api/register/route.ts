import User from "@/models/User";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";


export const POST = async (request: any) => {
    const { email, password } = await request.json();
    if (email && password) {
        await connect();
        try {
            console.log(" I am fucking working fine-------------------------")
            const existingUser = await User.findOne({ email }).lean();
            console.log("🚀 ~ file: route.ts:12 ~ POST ~ existingUser:", existingUser)
            if (existingUser) {
                return new NextResponse("User is already exists", { status: 400 })
            } else {
                await User.create({ email, password });
                return new NextResponse("You are registered successfully", { status: 200 })
            }
        } catch (err: any) {
            return new NextResponse(err, { status: 500 })
        }
    } else return new NextResponse("Either Email or password is missing", { status: 500 })
}