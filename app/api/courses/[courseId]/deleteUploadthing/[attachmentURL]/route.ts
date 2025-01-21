import { utapi } from "@/app/api/uploadthing/route";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, 
    {params}:{params:{courseId: string, attachmentURL: string}}){
        try {
            const {courseId,attachmentURL} = await params;
            const {userId}=await auth();

            if(!userId){
                return new NextResponse("Unauthorized user",{status:401});
            }
            const courseOwner = await db.course.findUnique({
                where:{
                    id:courseId,
                    userId:userId
                }
            });

            if(!courseOwner){
                return new NextResponse("Unauthorized user",{status:401});
            }

            await utapi.deleteFiles(attachmentURL);
            
            return new NextResponse("Deleted from Uploadthing");

        } catch (error) {
            console.error("ATTACHMENT_URL",error);
            return new NextResponse("Internal error",{status:500});
        }
}