import { IconBadge } from "@/components/icon-badge"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { CircleDollarSign, File, LayoutDashboardIcon, ListCheck } from "lucide-react"
import { redirect } from "next/navigation"
import TitleForm from "../_components/titleform"
import DescriptionForm from "../_components/descriptionForm"
import ImageForm from "../_components/imageForm"
import CategoryForm from "../_components/categoryForm"
import PriceForm from "../_components/priceForm"
import AttachmentsForm from "../_components/attachmentsForm"
import ChaptersForm from "../_components/chaptersForm"

type RouteContext = { params:Promise< { courseId: string } >};


const CourseId = async ({ params }:RouteContext) => {
    const {courseId}= await params; 

    const { userId } = await auth();
    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId
        },
        include:{
            chapters:{
                orderBy:{
                    position:"asc",
                },
            },
            attachments:{
                orderBy:{
                    createdAt:"desc",
                },
            },
        },
    })

    const categories = await db.category.findMany({
        orderBy:{
            name:"asc",
        },
    });


    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.price,
        course.imageUrl,
        course.categoryId,
        course.chapters.some(chapter=>chapter.isPublished),
    ]

    const totalFields = requiredFields.length;

    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className="">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-500">Complete all fields {completionText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-2">
                        <IconBadge variant={"default"} icon={LayoutDashboardIcon} />
                        <div className="text-xl">
                            Customize your course
                        </div>
                    </div>
                    <TitleForm initialData={{ ...course, courseId }} />
                    <DescriptionForm initialData={{ description: course.description ?? "", courseId }} />
                    <ImageForm initialData={{ imageUrl: course.imageUrl ?? "", courseId }} />
                    <CategoryForm initialData={{ categoryId: course.categoryId ?? "", courseId } } options={categories.map((category)=>({
                        label:category.name,
                        value: category.id,
                    }))} />
                </div>
                <div>
                     <div >
                        <div className="flex items-center gap-2">
                            <IconBadge icon={ListCheck}/>
                            <h2 className="text-xl">Course chapters</h2>
                        </div>
                        <ChaptersForm initialData={{...course,courseId}} />
                     </div>
                     <div>
                     <div className="flex items-center gap-x-2 mt-6">
                            <IconBadge icon={CircleDollarSign}/>
                            <h2 className="text-xl">Sell your course</h2>
                        </div>
                        <PriceForm
                        initialData={{ price: course.price ?? 0, courseId }}
                        />
                     </div>
                     <div>
                     <div className="flex items-center gap-x-2 mt-6">
                            <IconBadge icon={File}/>
                            <h2 className="text-xl">Resourses & Attachments</h2>
                        </div>
                        <AttachmentsForm initialData={{ imageUrl: course.imageUrl ?? "", courseId,attachments:course.attachments }} />
                     </div>
                </div>
            </div>
        </div>
    )
}
export default CourseId