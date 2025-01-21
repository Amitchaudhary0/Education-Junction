"use client";

import * as Z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/fileUpload";
import { Attachment } from "@prisma/client";

const formSchema = Z.object({
    url:Z.string().min(1),
});

interface AttachmentsFormProps {
    initialData: {
        imageUrl: string;
        courseId: string;
    } & {attachments:Attachment[]}
}

const AttachmentsForm = ({ initialData }: AttachmentsFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string|null>(null);
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const route = useRouter();

    const onSubmit = async (values: { url: string }) => {
        try {
            await axios.post(`/api/courses/${initialData.courseId}/attachments`, values);
            toast.success("Course updated");
            toggleEditing();
            route.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async (id:string,name:string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${initialData.courseId}/attachments/${id}`);
            await axios.delete(`/api/courses/${initialData.courseId}/deleteUploadthing/${name}`);
            toast.success("Attachment deleted");
            route.refresh();
        } catch {
            toast.error("Something went wrong")
        }finally{
            setDeletingId(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex font-medium justify-between items-center">
                Course Attachments
                <Button type="button" onClick={toggleEditing}>
                    {isEditing ? (
                        <>Cancel</>
                    )  : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Upload file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                <>
                {initialData.attachments.length === 0 &&(
                    <p className="text-sm mt-2 text-slate-500 italic">
                        No Attachments Yet
                    </p>
                )

                }
                {initialData.attachments.length > 0 &&(
                    <div
                    className="space-y-2 mt-2 ">
                        {initialData.attachments.map((attachment)=>{
                            return <div key={attachment.id}
                            className="flex items-center p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                                <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                                <p
                                className="text-sm line-clamp-1">{attachment.name}</p>
                                {deletingId === attachment.id &&(
                                    <div>
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                    </div>
                                )}
                                {deletingId !== attachment.id &&(
                                    <button
                                    onClick={()=>onDelete(attachment.id,attachment.name)}
                                    className="ml-auto hover:opacity-75 transition pl-2"
                                    >
                                        <X className="h-4 w-4"/>
                                    </button>
                                )}
                            </div>
                        })}
                    </div>
                )

                }
                </>
            ) : (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-sm mt-4 text-muted-foreground">
                        Add anything your students might need to complete the course
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttachmentsForm;
