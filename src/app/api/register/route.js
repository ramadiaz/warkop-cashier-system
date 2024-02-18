import bcrypt from "bcrypt"
import prisma from "@/app/libs/prisma"
import {NextResponse} from "next/server"

export async function POST(request) {
    const body = await request.json()
    const {name, email, password, address, contact} = body.data;
    console.log(body)

    if(!name || !email || !password || !address || !contact) {
        return new NextResponse("Missing value", {status: 400})
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(exist) {
        return new NextResponse("User already exist", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            address,
            contact,
            hashedPassword,
            role: "cashier",
        }
    })

    return NextResponse.json(user)
}