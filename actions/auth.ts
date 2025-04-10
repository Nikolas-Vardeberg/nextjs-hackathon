"use server";

import { client } from "@/lib/prisma";

export const onCompleteUserRegistration = async (fullname: string, clerkId: string, type: string) => {
    try {
        const registred = await client.user.create({
            data: {
                clerkId: clerkId,
                fullname: fullname,
                type: type
            },
            select: {
                fullname: true,
                id: true,
                type: true,
            }
        })

        if (registred) {
            return { status: 200, user: registred }
        }
    } catch (e) {
        return { status: 400, message: "Something went wrong" }
    }
}