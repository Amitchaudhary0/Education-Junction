
import MobileSidebar from "./mobileSidebar"
import NavbarRoutes from "@/components/navbar-routes"

const Navbar = () => {
  return (
    <div className=" p-4 h-[3.5rem] border-b shadow-md bg-white flex items-center">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}
export default Navbar