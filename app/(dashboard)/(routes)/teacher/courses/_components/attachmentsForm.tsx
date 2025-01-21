"use client";

import * as Z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
