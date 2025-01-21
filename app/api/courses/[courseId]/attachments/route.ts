import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type ParamsProps={
    params:Promise<{courseId:string}>,
}

export async function POST(req:Request,{params}:ParamsProps){
    try {
        const {courseId} = await params;
        const {userId}=await auth();
        const {url}= await req.json();

        if(!userId){
            return new NextResponse("Unauthorised user",{status:401});
        }
        const courseOwner = await db.course.findUnique(
            {
                where:{
                    id: courseId,
                    userId:userId,
                }
            }
        )

        if(!courseOwner){
            return new NextResponse("Unauthorised user",{status:401});
        }
        
        const attachments = await db.attachment.create({
            data:{url,
                name: url.split("/").pop(),
                courseId: courseId,
            }
        });

        return NextResponse.json(attachments);

    } catch (error) {
        console.error("Error in attachment route",error);
        return new NextResponse("Internal Error",{status:500});
    }
}