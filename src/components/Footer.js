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
  const user = useSelector((store)=>store?.user)
  if(user){
    return null;
  }
  const phoneNumber = "8123897887";
  const message = "Hi, I would like to connect with you";

  const whatsappLink = `https://wa.me/${phoneNumber}? text =${message}`;
  return ( 
    <>
    <div
      className="p-4 lg:h-72 md:h-60 sm:h-48"
      style={{
        backgroundImage: `url(${footer})`, // Correct syntax for inline styles
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "center", // Centers the image
      }}
    >
      <div className="p-4">
        <span className="font-semibold lg:text-lg md:text-sm sm:text-xs">Connect To Us</span>
        <ul className="text-sm flex">
          <li className="m-2 p-2">
            <FacebookOutlinedIcon sx={{ fontSize:{lg:36, md:28, sm:20} , color: "blue" }} />
          </li>
          <li className="m-2 p-2">
            <XIcon sx={{ fontSize:{lg:36, md:28, sm:20} }} />
          </li>
          <li className="m-2 p-2">
            <InstagramIcon
              className="bg-red"
              sx={{ fontSize:{lg:36, md:28, sm:20} , color: "orange" }}
            />
          </li>
          <li className="m-2 p-2">
            <LinkedInIcon sx={{ fontSize:{lg:36, md:28, sm:20} , color: "blue" }} />
          </li>
          <li className="m-2 p-2">
            <YouTubeIcon sx={{ fontSize:{lg:36, md:28, sm:20} , color: "red" }} />
          </li>
          <li className="m-2 p-2">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon sx={{ fontSize:{lg:36, md:28, sm:20} , color: "green" }} />
            </a>
          </li>
        </ul>
      </div>
      {/* <img alt="/" src={footer}/> */}
    </div>
    <div className="text-right md:text-sm sm:text-xs p-2 bg-black text-white ">
      © 2025 InstaEms. All Rights Reserved.
    </div>
  </>
  
  );
};

export default Footer;
