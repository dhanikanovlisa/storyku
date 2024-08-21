import { LayoutDashboard, LibraryBig } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Story Management", href: "/dashboard/story", icon: LibraryBig },
  ];

  return (
    <nav className="min-h-screen bg-white shadow-xl">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-center text-center align-middle items-center mb-12 w-full p-4  ">
            <h1 className=" text-2xl font-semibold text-cyan-600">STORYKU</h1>
          </div>
          <div className="w-full flex flex-col gap-4 items-start">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`h-8 flex py-6 pl-4 pr-6 w-full items-center font-bold ${
                  location.pathname === item.href
                    ? " bg-cyan-600 text-white"
                    : "text-gray-400"
                }`}
              >
                <item.icon className="mx-2" />{" "}
                {/* Add the icon with some right margin */}
                <a href={item.href} className="">
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
