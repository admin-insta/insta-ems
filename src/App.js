import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MainContainer from "./components/MainContainer";
import InfoCards from "./components/InfoCards";
import UserType from "./components/UserType";
import Reviews from "./components/Reviews";
import MainPage from "./components/userView/MainPage";
import EmployeeInfo from "./components/userView/employeeInfo/EmployeeInfo";
import { Provider, useDispatch, } from "react-redux";
import appStore from "./components/store/appStore";
import DemoRequest from "./components/DemoRequest";
import Attendance from "./components/userView/attendance/Attendance";
import LeaveManagement from "./components/userView/leave/LeaveManagement";
import PaySlip from "./components/userView/salary/PaySlip";
import DocumentCenter from "./components/userView/document/DocumentCenter";
import Feedback from "./components/userView/feedback/Feedback";
import UserHome from "./components/userView/UserHome";
import HelpDesk from "./components/userView/helpDesk/HelpDesk";
import UpdateUserInfo from "./components/userView/UpdateUserInfo";
import SalaryInfo from "./components/userView/salary/SalaryInfo";
import PackageInfo from "./components/userView/salary/PackageInfo";
import ItStatement from "./components/userView/salary/ItStatement";
import SalaryPayment from "./components/userView/salary/SalaryPayment";
import SalaryDescription from "./components/userView/salary/SalaryDescription";
import YtdStatement from "./components/userView/salary/YtdStatement";
import LeaveMain from "./components/userView/leave/LeaveMain";
import LeaveApply from "./components/userView/leave/LeaveApply";
import LeaveBalance from "./components/userView/leave/LeaveBalance";
import LeaveCalendar from "./components/userView/leave/LeaveCalendar";
import HolidayCalendar from "./components/userView/leave/HolidayCalendar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import { setUser } from "./components/store/userSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function AppContent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/getLoggedInUser`, {
          credentials: "include", // sends the cookie
        });

        const data = await response.json();
        console.log("Login status response:", data);
        if (response.ok) {
          dispatch(setUser({
                        uid: data.user._id,
                        email: data.user.email,
                        name: data.user.name || "No Name",
                        profilePicture: data.user.profilePicture || "",
                        firstLogin: data.firstLogin,
                      }));
        } else {
          console.warn("Not logged in or session expired");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

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
      element: <MainPage />,
      children: [
        { path: "", element: <Navigate to="userHome" replace /> },
        { path: "updateUser", element: <UpdateUserInfo /> },
        { path: "userHome", element: <UserHome /> },
        { path: "employeeInfo", element: <EmployeeInfo /> },
        { path: "AttendanceInfo", element: <Attendance /> },
        { path: "leaveManagement", element: <LeaveManagement /> },
        {
          path: "leave",
          element: <LeaveMain />,
          children: [
            { index: true, element: <LeaveManagement /> },
            { path: "leave-apply", element: <LeaveApply /> },
            { path: "leave-balance", element: <LeaveBalance /> },
            { path: "leave-calendar", element: <LeaveCalendar /> },
            { path: "holiday-calendar", element: <HolidayCalendar /> },
          ],
        },
        {
          path: "salaryInfo",
          element: <SalaryInfo />,
          children: [
            { index: true, element: <SalaryDescription /> },
            { path: "paypackage", element: <PackageInfo /> },
            { path: "it-statement", element: <ItStatement /> },
            { path: "payslip", element: <PaySlip /> },
            { path: "ytd-statement", element: <YtdStatement /> },
            { path: "payment", element: <SalaryPayment /> },
          ],
        },
        { path: "documentCenter", element: <DocumentCenter /> },
        { path: "expenseClaim", element: <DocumentCenter /> },
        { path: "helpDesk", element: <HelpDesk /> },
        { path: "feedback", element: <Feedback /> },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Provider store={appStore}>
        <AppContent />
      </Provider>
    </>
  );
}

export default App;
