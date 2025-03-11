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
import { Provider } from "react-redux";
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
import ItDeclaration from "./components/userView/salary/ItDeclaration";
import SalaryPayment from "./components/userView/salary/SalaryPayment";
import SalaryDescription from "./components/userView/salary/SalaryDescription";

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
      element: <MainPage />,
      children: [
        // This will redirect from "/userview" to "/userview/userHome"
        { path: "", element: <Navigate to="userHome" replace /> },
        { path: "updateUser", element: <UpdateUserInfo /> },
        { path: "userHome", element: <UserHome /> },
        { path: "employeeInfo", element: <EmployeeInfo /> },
        { path: "AttendanceInfo", element: <Attendance /> },
        { path: "leaveManagement", element: <LeaveManagement /> },
        {
          path: "salaryInfo",
          element: <SalaryInfo />,
          children: [
            { index: true, element:<SalaryDescription/> }, // Default child route
            { path: "paypackage", element: <PackageInfo /> },
            { path: "it-declaration", element: <ItDeclaration /> }, // ✅ Correct path
            { path: "payslip", element: <PaySlip /> },
            { path: "ytd-statement", element: <div>YTD Statement Content</div> },
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

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
