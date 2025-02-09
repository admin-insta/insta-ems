import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import footer from "../components/utils/images/footer.png";
import XIcon from "@mui/icons-material/X";
import { useSelector } from "react-redux";
const Footer = () => {
  const user = useSelector((store) => store?.user);
  if (user) {
    return null;
  }
  const phoneNumber = "8123897887";
  const message = "Hi, I would like to connect with you";

  const whatsappLink = `https://wa.me/${phoneNumber}? text =${message}`;
  return (
    <>
      <div className="flex flex-col">
        <div className=" bg-blue-700 border-b">
          <span className="font-semibold lg:text-lg md:text-sm sm:text-xs text-white p-4">
            Connect To Us
          </span>
          <ul className="text-sm flex">
            <li className="p-2 flex flex-col justify-center items-center">
              <FacebookOutlinedIcon
                sx={{
                  fontSize: { lg: 24, md: 16, sm: 12 },
                  color: "whitesmoke",
                }}
              />
              {/* <span className="text-white">Facebook</span> */}
            </li>
            <li className=" p-2">
              <XIcon
                sx={{
                  fontSize: { lg: 24, md: 16, sm: 12, color: "whitesmoke" },
                }}
              />
            </li>
            <li className=" p-2">
              <InstagramIcon
                className="bg-red"
                sx={{
                  fontSize: { lg: 24, md: 16, sm: 12 },
                  color: "whitesmoke",
                }}
              />
            </li>
            <li className=" p-2">
              <LinkedInIcon
                sx={{
                  fontSize: { lg: 24, md: 16, sm: 12 },
                  color: "whitesmoke",
                }}
              />
            </li>
            <li className=" p-2">
              <YouTubeIcon
                sx={{
                  fontSize: { lg: 24, md: 16, sm: 12 },
                  color: "whitesmoke",
                }}
              />
            </li>
            <li className=" p-2">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon
                  sx={{
                    fontSize: { lg: 24, md: 16, sm: 12 },
                    color: "whitesmoke",
                  }}
                />
              </a>
            </li>
          </ul>
        </div>
        {/* <img alt="/" src={footer}/> */}
      </div>
      <div className="text-right md:text-sm sm:text-xs  bg-blue-700 text-white p-2 ">
        © 2025 InstaEms. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;
