import { createBrowserRouter, RouteObject  } from 'react-router'
import MainLayout from "@/component/MainLayout.tsx";
import Chat01 from "@/router/chat01.tsx";
import Chat02 from "@/router/chat02.tsx";

const router  = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            ...Chat01,
            ...Chat02,
        ]
    }
] as RouteObject[])


export default router;
