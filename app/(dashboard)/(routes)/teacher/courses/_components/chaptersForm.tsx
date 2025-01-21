"use client"

import * as Z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField,FormItem, FormMessage} from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";


const formSchema = Z.object({
    title: Z.string().min(1),
})



interface ChaptersFormProps{
    initialData:{
     courseId:string
    chapters:Chapter[]}
}

const ChaptersForm = ({initialData}:ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating,setIsUpdating] = useState(false);

    const toggleCreating =()=>{setIsCreating(!isCreating)};

    const route = useRouter();
    const form = useForm<Z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title:""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: Z.infer<typeof formSchema>)=>{
        try {
            await axios.post(`/api/courses/${initialData.courseId}/chapters`,values);
            toast.success("Chapter created");
            toggleCreating();
            route.refresh();
        } catch{
           toast.error("Someting went wrong");
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="flex font-medium justify-between items-center">
            Course Chapters
            <Button type="button" onClick={toggleCreating} >
                {isCreating ?<>Cancel</>  : <> <PlusCircle className="h-4 w-4 mr-2"/>
               Add a chapters </>}
            </Button>
        </div>
        {
            isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g 'Introduction to the course'"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        >
                            Create
                        </Button>
                    </div>

                    </form>
                </Form>
            )
        }
        {!isCreating &&(
            <>
            <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
                {!initialData.chapters.length && "No chapters"}
                {/* {TODO: add list of chapters} */}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
                drag and drop to reorder the chapters
            </p>
            </>
        )

        }
    </div>
  )
}
export default ChaptersForm