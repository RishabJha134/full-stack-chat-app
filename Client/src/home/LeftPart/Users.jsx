import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

const Users = () => {
  const [allUsers, loading] = useGetAllUsers();
  // console.log(JSON.stringify(allUsers));
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="removeScroll overflow-y-auto"
        style={{ maxHeight: "calc(84vh-10vh)" }}
      >
        {allUsers &&
          allUsers.map((item, index) => {
            return <User key={index} item={item}></User>;
          })}
      </div>
    </div>
  );
};

export default Users;
