import React, { useEffect } from "react";
import reviewHome from "../utils/images/reviewHome.jpg";
import trackList from "../utils/images/trackList.jpg";
import holidays from "../utils/images/holidays.jpg";
import Button from "../utils/theme/Button";
import Card from "../utils/theme/Cards";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../api/users";
import { addEmployee } from "../store/employeeSlice";

const UserHome = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store?.state?.employees || []);

  useEffect(() => {
    const getUsers = async () => {
      if (employee.length > 0) return;
      const result = await fetchUsers();
      if (result.success) {
        dispatch(addEmployee(result.users));
      } else {
        console.error(result.message);
      }
    };
    getUsers();
  }, [dispatch, employee.length]);
  return (
    <div className="">
      <div className="text-2xl text-black  ">
        Good Evening <WbSunnyOutlinedIcon />
      </div>
      <div className="border rounded-lg bg-[#f2ebd2] my-2  h-20 flex justify-between items-center hover:shadow-lg hover:-translate-y-1 transition-all ease-in-out">
        <div className="flex text-center p-2 text-lg text-black">
          Opening doors to infinite potential.
        </div>
        <div className="text-base mx-4">
          <Button>Explore</Button>
        </div>
      </div>
      <div className="flex lg:flex-row gap-4 sm:flex-col xs:flex-col">
        <Card
          variant="primary"
          title="Track"
          image={trackList}
          description={
            <div className="">
              "We're good to go! Nothing new to track for now."
            </div>
          }
        />
        <Card
          variant="secondary"
          title="Reviews"
          image={reviewHome}
          description={
            <div className="">"Hurrah! you have nothing to Review."</div>
          }
        />
        <Card
          variant="primary"
          title="Upcoming Holidays"
          image={holidays}
          description={
            <div className="">
              <div>26th JAN</div>
              <div>Republic Day</div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UserHome;
