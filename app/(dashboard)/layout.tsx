import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
 
import { ourFileRouter } from "@/app/api/uploadthing/core";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* flex col is removed by me just to check if it works without it */}
      <div className='hidden md:block h-full w-56 inset-y-0 fixed z-50'>
        <Sidebar />
      </div>
      <main className='md:pl-56'>
        <Navbar />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
        {children}
      </main>
    </div>
  )
}
export default DashboardLayout 