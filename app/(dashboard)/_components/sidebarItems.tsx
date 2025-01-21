'use client'
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


type SidebarItemProps = {
  icon: LucideIcon,
  lable: string,
  href: string
};

const SidebarItems = ({ icon: Icon, lable, href }: SidebarItemProps) => {

  const pathName = usePathname();
  const route = useRouter();
  const isActive = pathName === href || (pathName === "/" && href === "/") || pathName?.startsWith(`${href}/`);

  const onClick = () => { route.push(href)}

  return (
    <button className={cn(" text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 border-r-4 border-sky-700")} type="button" onClick={onClick}>
      <div className="flex items-center gap-x-2 py-3">
        <Icon  size={22} className={cn("text-slate-500",isActive&&"text-sky-700")}/>
      {lable}
      </div>
    </button>
  )
}
export default SidebarItems