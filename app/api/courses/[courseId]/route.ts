import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


type RouteContext = { params:Promise< { courseId: string } >};

export async function PATCH(req: Request, {params}:RouteContext) {
    try {
        const { userId } = await auth();
        const { courseId }= await params;
        const values = await req.json();
        if(!userId){
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where:{
                id: courseId,
                userId:userId,
            },
            data:{
                ...values,
            }
        }) 

        return NextResponse.json(course, { status: 200 });
        
    } catch (error) {
        console.log("[COURSES_ID]", error)
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}