import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Shimmer = () => {
  return (
    <div className="grid grid-cols-11 gap-4 p-4">
      {/* Sidebar Placeholder */}
      <div className="col-span-2 hidden sm:block">
        <div className="h-screen w-full bg-gray-300 animate-pulse rounded-md ">
          <div className=" flex items-center justify-around p-4">
            <span></span>
            <span>
              <AccountCircleIcon />{" "}
            </span>
          </div>
          <ul className="mt-2">
            {[...Array(10)].map((_, index) => (
              <li
                key={index}
                className="h-10 bg-gray-400 animate-pulse rounded-md m-2"
              ></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Placeholder */}

      {/* Header Placeholder */}
      {/* <div className="w-full col-span-2 bg-gray-300 animate-pulse rounded-md">
        <ul className="mt-10">
          {[...Array(11)].map((_, index) => (
            <li
              key={index}
              className="h-10 bg-gray-400 animate-pulse rounded-md m-2"
            ></li>
          ))}
        </ul>
      </div>

      <div className="h-screen col-span-7  bg-gray-300 animate-pulse rounded-md"></div> */}
      <div className="col-span-9 flex flex-col gap-4">
        <div className="mt-10 h-20 bg-gray-300 animate-pulse rounded-md m-2"></div>
        <div className="flex flex-row gap-4 ">
          <div className="h-64 w-1/3 bg-gray-300 animate-pulse rounded-md m-2"></div>
          <div className="h-64 w-1/3 bg-gray-300 animate-pulse rounded-md m-2"></div>
          <div className="h-64 w-1/3 bg-gray-300 animate-pulse rounded-md m-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
