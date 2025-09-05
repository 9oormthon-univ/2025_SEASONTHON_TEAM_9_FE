import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.js";
import Globalstyle from "./styles/Globalstyle";



function App() {

  return (
    <>
      <Globalstyle />
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App