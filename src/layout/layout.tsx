import { Outlet } from "react-router-dom";
import {Suspense, useState} from "react";
import MenuBar from "@components/shared/menu-bar";
import Header from "@components/shared/header";

// import Loader 



export default function DefaultLayout() {
    return (
        <div className="flex overflow-hidden h-[100vh] w-full">
            <MenuBar />
            <div className="w-full">
                <Header/>
                <main className="">
                    <Suspense
                    fallback={
                        <div className="h-screen flex items-center justify-center">
                            {/* <Loader /> */}
                            Loading ... 
                        </div>
                    }>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    )
}
