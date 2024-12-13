import React from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "./../../components/Loading";

const Messages = () => {
  const { loading, messages } = useGetMessage();
  console.log(messages);
  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((item) => {
          return <Message key={item._id} message={item}></Message>;
        })
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
