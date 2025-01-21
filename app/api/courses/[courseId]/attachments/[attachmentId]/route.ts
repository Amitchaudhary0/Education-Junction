import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, 
    {params}:{params:{courseId: string, attachmentId: string}}){
        try {
            const {courseId,attachmentId} = await params;
            const {userId}=await auth()
            
            if(!userId){
                return new NextResponse("Unauthorized user",{status:401});
            }
            const courseOwner = await db.course.findUnique({
                where:{
                    id:courseId,
                    userId:userId
                }
            })

            if(!courseOwner){
                return new NextResponse("Unauthorized user",{status:401});
            }

            const attachment = await db.attachment.delete({
                where:{
                    courseId:courseId,
                    id:attachmentId
                }
            });
            return  NextResponse.json(attachment);

        } catch (error) {
            console.error("ATTACHMENT_ID",error);
            return new NextResponse("Internal error",{status:500})
        }
}