import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.js";
import Globalstyle from "./styles/Globalstyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Globalstyle />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
