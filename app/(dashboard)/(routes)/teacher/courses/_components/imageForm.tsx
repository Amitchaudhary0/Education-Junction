"use client";

// import type * as Z from "zod"; // Importing only the type for Zod
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/fileUpload";

interface ImageFormProps {
    initialData: {
        imageUrl: string;
        courseId: string;
    };
}




const ImageForm = ({ initialData }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [previousUrl, setPreviousUrl] = useState<null |string>(null);

    useEffect(()=>{
        setPreviousUrl(initialData.imageUrl);
    },[])

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const route = useRouter();

    const onSubmit = async (values: { imageUrl: string }) => {
        try {
            await axios.patch(`/api/courses/${initialData.courseId}`, values); 
            if(previousUrl!==null){
                await axios.delete(`/api/courses/${initialData.courseId}/deleteUploadthing/${previousUrl?.split("/").at(-1)}`);
            }    
            setPreviousUrl(values.imageUrl);
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
                Course Image
                <Button type="button" onClick={toggleEditing}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : initialData.imageUrl ? (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Image
                        </>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Upload Image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                !initialData.imageUrl ? (
                    <div className="flex justify-center items-center h-60 rounded-md bg-slate-200 mt-2">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            fill={true}
                            src={initialData.imageUrl}
                            alt="Course Image"
                            className="rounded-md object-cover"
                        />
                    </div>
                )
            ) : (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />
                    <div className="text-sm mt-4 text-muted-foreground">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageForm;
