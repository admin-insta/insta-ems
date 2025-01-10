import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MainContainer from "./components/MainContainer";
import InfoCards from "./components/InfoCards";
import UserType from "./components/UserType";
import Reviews from "./components/Reviews";
import MainPage from "./components/userView/MainPage";
import { Provider } from "react-redux";
import appStore from "./components/store/appStore";
import DemoRequest from "./components/DemoRequest";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: (
            <>
              <MainContainer />
              <InfoCards />
              <UserType />
              <Reviews />
            </>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/demorequest",
          element: <DemoRequest />,
        },
        {
          path: "/userview",
          element: <MainPage />,
        },
       
      ],
    },
  ]);
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
