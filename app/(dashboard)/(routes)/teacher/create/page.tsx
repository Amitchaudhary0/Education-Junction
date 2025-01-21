'use client'
import * as Z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link"
import toast from "react-hot-toast"

const formSchema = Z.object({
    title: Z.string().min(1, {
        message: "Title is required",
    }),
})

const CreateCoursePage = () => {

    const router = useRouter()
    const form = useForm<Z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: Z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values); 
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created successfully");
        } catch {
            toast.error("Someting went wrong");
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center flex-col md:justify-center h-full p-6">
            <h1 className="text-2xl">
                Name Your Course
            </h1>
            <p className="text-sm text-slate-600">
                Give your course a short and descriptive title.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Advanced web development'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Provide a clear and concise title that accurately reflects the content and goals of your course.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href={"/"}>
                            <Button
                                type="button"
                                variant={"ghost"}
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Continue
                        </Button>

                    </div>
                </form>
            </Form>
        </div>
    )
}
export default CreateCoursePage