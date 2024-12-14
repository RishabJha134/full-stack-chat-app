import React, { useState } from "react";
import axios from "axios";
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";

const Logout = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    // console.log("Logging out...");
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
  
      // console.log("Logout response:", response.data);
  
      // Clear local storage
      localStorage.removeItem("ChatApp");
      toast.success("Logged out successfully")

      // alert("Logged out successfully")
      window.location.reload();
  
      // console.log("Navigating to login...");
      // navigate("/login");
      // console.log("Navigation triggered.");
  
      setLoading(false);
    } catch (err) {
      console.error("Error during logout:", err);
      setLoading(false);
      toast.error("Error in logout")
      // alert("Error logging out. Please try again.");
    }
  }
  

  return (
    <>
      <hr />
      <div className=" h-[10vh] bg-transparent">
        <div>
          <BiLogOutCircle
            className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Logout;
