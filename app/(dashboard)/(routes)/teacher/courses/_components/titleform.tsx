"use client"

import * as Z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField,FormItem, FormMessage} from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const formSchema = Z.object({
    title: Z.string().min(1,{
        message:"Title is required",
    }),
})



interface TitleFormProps{
    initialData:{
        title:string,
        courseId:string,
    }
}

const TitleForm = ({initialData}:TitleFormProps) => {
    const [isEditing,setIsEditing] = useState(false);

    const toggleEditing =()=>{setIsEditing(!isEditing)};

    const route = useRouter();
    const form = useForm<Z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData,
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: Z.infer<typeof formSchema>)=>{
        try {
            await axios.patch(`/api/courses/${initialData.courseId}`,values);
            toast.success("Course updated");
            toggleEditing();
            route.refresh();
        } catch{
           toast.error("Someting went wrong");
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="flex font-medium justify-between items-center">
            Course title
            <Button type="button" onClick={toggleEditing} >
                {isEditing ?<>Cancel</>  : <> <Pencil className="h-4 w-4 mr-2"/>
                Edit title </>}
            </Button>
        </div>
        {
            !isEditing ? (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            ):(
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
                                placeholder="e.g. 'Advanced web development'"
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
                            Save
                        </Button>
                    </div>

                    </form>
                </Form>
            )
        }
    </div>
  )
}
export default TitleForm