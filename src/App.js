import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MainContainer from "./components/MainContainer";
import InfoCards from "./components/InfoCards";
import UserType from "./components/UserType";
import Reviews from "./components/Reviews";
import MainPage from "./components/userView/MainPage";
import PeopleList from "./components/userView/people/PeopleList";
import { Provider } from "react-redux";
import appStore from "./components/store/appStore";
import DemoRequest from "./components/DemoRequest";
import { getCookie } from "./cookieStorage/cookie";
import Attendance from "./components/userView/attendance/Attendance";
import LeaveManagement from "./components/userView/leave/LeaveManagement";
import PaySlip from "./components/userView/salary/PaySlip";
import DocumentCenter from "./components/userView/document/DocumentCenter";
import Feedback from "./components/userView/feedback/Feedback";
import UserHome from "./components/userView/UserHome";
import HelpDesk from "./components/userView/helpDesk/HelpDesk";

const ProtectedRoute = ({ children }) => {
  const token = getCookie("authToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const UserLayout = () => (
  <ProtectedRoute>
    <MainPage />
  </ProtectedRoute>
);

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
        { path: "/login", element: <Login /> },
        { path: "/demorequest", element: <DemoRequest /> },
      ],
    },
    {
      path: "/userview",
      element: <UserLayout />,
      children: [
        { path: "userHome", element: <UserHome /> },
        { path: "employeeInfo", element: <PeopleList /> },
        { path: "AttendanceInfo", element: <Attendance /> },
        { path: "leaveManagement", element: <LeaveManagement /> },
        { path: "salaryInfo", element: <PaySlip /> },
        { path: "documentCenter", element: <DocumentCenter /> },
        { path: "expenseClaim", element: <DocumentCenter /> },
        { path: "helpDesk", element: <HelpDesk /> },
        { path: "feedback", element: <Feedback /> },
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
