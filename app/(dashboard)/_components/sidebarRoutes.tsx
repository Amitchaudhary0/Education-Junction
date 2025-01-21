'use client';
import { usePathname } from "next/navigation";
import SidebarItems from "./sidebarItems";
import { BarChart, Compass, Layout, List, } from "lucide-react";


const guestRoutes = [
    {
        icon: Layout,
        lable: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        lable: "Browse",
        href: "/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        lable: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        lable: "Analytics",
        href: "/teacher/analytics"
    }
]

const SidebarRoutes = () => {

    const pathName = usePathname();
    const isTeacherPage = pathName.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return (
        <div className="w-full flex flex-col gap-y-2">
            {routes.map((route) => {
                return (
                    <SidebarItems key={route.href} icon={route.icon} lable={route.lable} href={route.href} />
                )
            })}
        </div>
    )
}

export default SidebarRoutes
