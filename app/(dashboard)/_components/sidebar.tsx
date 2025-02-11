import Logo from "./logo"
import SidebarRoutes from "./sidebarRoutes"

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </div>
  )
}
export default Sidebar