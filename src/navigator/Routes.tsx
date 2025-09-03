
import { createBrowserRouter, createHashRouter } from "react-router-dom"; // 👈 여기만 바꿈

import Mainpage from "../pages/Mainpage";
import Searchpage from "../pages/Searchpage";
import Wordpage from "../pages/Wordpage";
import Communitypage from "../pages/Communitypage";
import Contentspage from "../pages/Contentspage";
import Homepage from "../pages/Homepage";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
    children:[
        {
            path:"",
            element:<Homepage/>
        },
        {
            path:"search",
            element:<Searchpage/>
        },
        {
            path:"word",
            element:<Wordpage/>
        },
        {
            path:"community",
            element:<Communitypage/>
        },
        {
            path:"contents",
            element:<Contentspage/>
        }
    ]
  },
  
]);

export default routes;