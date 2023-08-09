import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomMessage, generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState();
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API Polling
      // fetch data and convert it to json
      // console.log("API polling ");

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(20) + "🚀",
        })
      );
    }, 1500);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="ml-2 p-2 w-full h-[440px] bg-slate-100 rounded-lg border border-black overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((c, index) => (
          <ChatMessage key={index} name={c.name} message={c.message} />
        ))}
      </div>

      <form
        className="ml-2 p-2 w-full border border-black flex justify-between  bg-white rounded my-2"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addMessage({
            name:"Hitesh Parihar",
            message: liveMessage,
          }));
          console.log("ON form submit", liveMessage);
          setLiveMessage("");
        }}
      >
        <input
          className="w-80 px-2 rounded py-1"
          placeholder="type your message here"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 bg-green-100 rounded ">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
