import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { courseId } = await params;
        const { userId } = await auth();
        const { list } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized user", { status: 401 })
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if (!courseOwner) {
            return new NextResponse("Unauthorized user", { status: 401 })
        }

        for(let item of list){
            await db.chapter.update({
                where:{
                    id:item.id,
                },data:{
                    position:item.position,
                }
            });
        }

        return new NextResponse("Success",{status:200});
    } catch (error) {
        console.error("[REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}