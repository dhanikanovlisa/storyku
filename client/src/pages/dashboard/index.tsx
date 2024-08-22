import { SideBar } from "@/components"

export default function DashboardPage(){
    return ( 
    <main className="flex h-full">
        <SideBar />
        <div className="flex-1 flex flex-col p-4 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-600 p-4">Dashboard Page</h1>
        </div>
        </main>
    )
}