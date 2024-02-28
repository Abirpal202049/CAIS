import { CaseSensitive, Paperclip, Plus, Smile, Users } from "lucide-react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

interface ChatData {
  chat: string;
  chatTime: string;
  firstTag?: string;
  secondTag?: string;
}

const Communication = () => {
  const [value, setValue] = useState("");

  const incomingChatData: ChatData[] = [
    {
      chat: "Hi, this is the request from my side",
      chatTime: "4h ago",
      firstTag: "RECALL",
      secondTag: "RESPOND",
    },
    {
      chat: "Hi, what is the progress update for this week’s?",
      chatTime: "4h ago",
      firstTag: "RECALL",
      secondTag: "RESPOND",
    },
  ];

  const outgoingChatData: ChatData[] = [
    {
      chat: "Hi, this is the response from my side as requested",
      chatTime: "4h ago",
    },
    {
      chat: "Hi, this is progress update for this week’s",
      chatTime: "4h ago",
    },
  ];

  const chatData = incomingChatData.flatMap((incomingChat, index) => {
    const outgoingChat = outgoingChatData[index];
    return [incomingChat, outgoingChat];
  });

  return (
    <>
      <div className="flex flex-col min-w-[35rem] border border-surface-300 rounded-lg mt-4 p-4 ">
        <div className="flex flex-row justify-between">
          <span className="flex flex-col ">
            <span className="font-semibold !text-xl pb-1 ">General</span>
            <span className="text-surface-600">
              Communication about current alert
            </span>
          </span>

          <span className="flex flex-row gap-2 items-center">
            <Users width={20} color="var(--surface-500)" />
            <span>4</span>
          </span>
        </div>

        <div className="flex flex-col  ">
          {chatData.map((data: any, index) => (
            <span
              key={index}
              className={`flex items-center gap-3 py-3 border-surface-200 ${
                outgoingChatData.includes(data) ? "flex-row-reverse" : ""
              }`}
            >
              <span className="bg-surface-200 p-3 border border-surface-300 rounded-full">
                <Plus />
              </span>

              <div className="flex flex-col ">
                <span
                  className={`flex flex-col relative border-solid border border-surface-200 shadow-lg p-3 mt-8 ${
                    outgoingChatData.includes(data)
                      ? "bg-primary text-surface-0 rounded-l-lg "
                      : "rounded-r-lg"
                  }`}
                >
                  <span>{data?.chat}</span>
                </span>

                <span className="flex justify-between text-surface-600 mt-2 ">
                  <span>{data?.chatTime}</span>
                  <span className="flex gap-4 items-center">
                    <span
                      className={`bg-surface-300 rounded-lg !text-sm ${
                        outgoingChatData.includes(data)
                          ? ""
                          : "px-[0.75rem] py-[0.15rem]"
                      }`}
                    >
                      {data?.firstTag}
                    </span>

                    <span
                      className={`bg-surface-300 rounded-lg !text-sm ${
                        outgoingChatData.includes(data)
                          ? ""
                          : "px-[0.75rem] py-[0.15rem]"
                      }`}
                    >
                      {data?.secondTag}
                    </span>
                  </span>
                </span>
              </div>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col border border-surface-300 rounded-lg p-2 mt-5 gap-2 relative">
        <span className="flex ">
          <InputText
            placeholder="Message  # General"
            className="w-full !border-none text-gray-400 !shadow-none !opacity-70  !focus:outline-none -ml-2"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </span>
        <span className="flex items-center justify-between ">
          <span className="flex gap-5">
            <Smile width={20} color="var(--surface-500)" />
            <Paperclip width={20} color="var(--surface-500)" />
            <CaseSensitive width={25} color="var(--surface-500)" />
          </span>
          <span>
            <Button label="Request" className="w-36 h-10 " />
          </span>
        </span>
      </div>
    </>
  );
};

export default Communication;
