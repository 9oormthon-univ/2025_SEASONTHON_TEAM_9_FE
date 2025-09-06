import { createBrowserRouter, createHashRouter } from "react-router-dom"; // 👈 여기만 바꿈

import MainLayout from "@/components/MainLayout";
import Searchpage from "@/pages/Searchpage";
import Wordpage from "@/pages/Wordpage";
import Communitypage from "@/pages/Communitypage";
import Contentspage from "@/pages/Contentspage";
import Homepage from "@/pages/Homepage";
import Loginpage from "@/features/login/Loginpage";
import Signuppage from "@/features/login/Signup";
import SignupSuccess from "@/features/login/SignupSuccess";
import BookMarkPage from "@/pages/BookMarkPage";
import BookMarkWordDetailPage from "@/pages/BookMarkWordDetailPage";
import BookMarkContentDetailPage from "@/pages/BookMarkContentDetailPage";
import ContentsDetailPage from "@/pages/ContentsDetailPage";
import WordDetailPage from "@/pages/WordDetailPage";
import KeywordRequestForm from "@/pages/Wordupload";
import BadgePage from "@/pages/BadgePage";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "search",
        element: <Searchpage />,
      },
      {
        path: "word",
        element: <Wordpage />,
      },
      {
        path: "community",
        element: <Communitypage />,
      },
      {
        path: "contents",
        element: <Contentspage />,
      },
      {
        path: "login",
        element: <Loginpage />,
      },
      {
        path: "signup",
        element: <Signuppage />,
      },
      {
        path: "signupsuccess",
        element: <SignupSuccess />,
      },
      {
        path: "bookmark",
        element: <BookMarkPage />,
      },
      {
        path: "contents/:id",
        element: <ContentsDetailPage />,
      },
      {
        path: "bookmark/word/:id",
        element: <BookMarkWordDetailPage />,
      },
      {
        path: "bookmark/contents/:id",
        element: <BookMarkContentDetailPage />,
      },
      {
        path: "word/:id",
        element: <WordDetailPage />,
      },
      {
        path:"wordupload",
        element:<KeywordRequestForm/>
      },
      {
        path: "badge",
        element: <BadgePage />,
      },
    ],
  },
]);

export default routes;
