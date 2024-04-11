import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Website-Layout"
import Advantage from "./pages/Advantage";

const routes = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path:'/',
                element: <Home />
            },
            {
                path:'advantage',
                element: <Advantage />
            },
            {
                path:'contact-us',
                element: <Advantage />
            },
            {
                path:'career',
                element: <Advantage />
            },
            {
                path:'magazine',
                element: <Advantage />
            },
            {
                path:'partner',
                element: <Advantage />
            },
            {
                path:'login',
                element: <Advantage />
            },
        ]
    }
]);


export default routes;