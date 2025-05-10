// components/SessionGuard.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../src/components/store/userSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function SessionGuard({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/getLoggedInUser`, {
          credentials: "include",
        });

        if (response.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/", { replace: true });
          return;
        }

        const data = await response.json();
        if (response.ok && data.user) {
          dispatch(setUser({
            uid: data.user._id,
            email: data.user.email,
            name: data.user.name || "No Name",
            profilePicture: data.user.profilePicture || "",
            firstLogin: data.firstLogin,
          }));
        } else {
          toast.warn("Invalid session.");
          navigate("/", { replace: true });
        }
      } catch (error) {
        toast.error("Server error. Try again later.");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [dispatch, navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
}
