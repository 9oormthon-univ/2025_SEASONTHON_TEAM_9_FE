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
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
