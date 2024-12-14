import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        // console.log(token);
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/allUsers",
          {
            withCredentials: true,
          }
        );

        // console.log("response:" + JSON.stringify(response.data.data));

        setAllUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        // toast.error("Failed to fetch users");
      }
    };
    getUser();
  }, []);
  return [allUsers, loading];
};

export default useGetAllUsers;
