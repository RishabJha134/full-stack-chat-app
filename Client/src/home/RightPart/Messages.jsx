import React, { useEffect, useRef } from "react";
import useGetMessage from './../../context/useGetMessage';
import useGetSocketMessage from './../../context/useGetSocketMessage';
import Loading from './../../components/Loading';
import  Message  from "../RightPart/Message";

function Messages() {
  const { loading, messages } = useGetMessage();
  console.log("before socket messages"+ JSON.stringify(messages));
  
  useGetSocketMessage(); // listing incoming messages

  // console.log(messages);
  console.log("after socket messages" + JSON.stringify(messages));

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
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
}

export default Messages;