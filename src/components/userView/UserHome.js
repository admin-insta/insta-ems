import React from "react";
import track from "../utils/images/track.jpg";
import reviewsbg from "../utils/images/reviewsbg.jpg";
import holidays from "../utils/images/holidays.jpg";
import Button from "../utils/theme/Button";
import Card from "../utils/theme/Cards";

const UserHome = () => {
  return (
    <div className="">
      <div className="text-2xl text-black px-8 py-4">Good Evening</div>
      <div className="border rounded-lg bg-[#abebc6] h-20 mx-8 flex justify-between items-center">
        <div className="flex text-center p-2 text-lg text-black">
          Opening doors to infinite potential.
        </div>
        <div className="text-base mx-4">
          <Button>Explore</Button>
        </div>
      </div>
      <div className="flex lg:flex-row gap-4 mx-4 my-2 p-4 sm:flex-col xs:flex-col">
        <Card
          variant="primary"
          title="Track"
          image={track}
          description={
            <div className="">
              "We're good to go! Nothing new to track for now."
            </div>
          }
        />
        <Card
          variant="secondary"
          title="Reviews"
          image={reviewsbg}
          description={
            <div className="">"Hurrah! NWe have nothing to Review."</div>
          }
        />
        <Card
          variant="primary"
          title="Upcoming Holidays"
          image={holidays}
          description={
            <div className="">
              <p>26th JAN</p>
              <p>Republic Day</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UserHome;
