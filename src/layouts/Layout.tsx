import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>

            <header className="bg-slate-900">
                <div className="mx-auto max-w-6xl py-10 text-center p-4">
                     <h1 className="text-6xl text-white font-bold"> Administrador de Tareas </h1>
                </div>
            </header>
            <main className="mt-10 mx-auto max-w-6xl p-10 inset-shadow-2xs  rounded-sm bg-slate-300">
                <Outlet/>
            </main>
            
        </>
    )
}