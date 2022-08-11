import React, { useState, useEffect } from "react";
import Input from "./Input";

const Chat = ({ converstaion }) => {
  const [searchState, setSearchState] = useState("");
  const [videoCallActiveState, setVideoCallActiveState] = useState(false);
  useEffect(()=>{
   
  },[])
  const searchChangeHandler = (e) => {
    setSearchState(e.target.value);
  };
  if (!converstaion) {
    return null;
  }
  return (
    <div className="right-content">
      <div className="main-chat">
        {videoCallActiveState && (
          <div className="video-call-container">
            <img src="./assets/img/video-call.png" alt="video-call" />
          </div>
        )}
        <div className="chat-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="img">
              <img src="./assets/vectors/chat-user-1.svg" alt="chat-user" />
            </div>
            <div className="text ms-3">
              <div className="fw-600 text-blue fs-22">{`${converstaion.human_identity_id.first_name} ${converstaion.human_identity_id.last_name}`}</div>
              <div className="fw-600">
                {converstaion.phone.phone_number_id.number}
              </div>
            </div>
          </div>
          <div>
            <div className="menu">
              {videoCallActiveState ? (
                <div
                  className="menu-container"
                  onClick={() => setVideoCallActiveState(false)}
                >
                  <img src="./assets/vectors/horizontal-menu.svg" alt="menu" />
                </div>
              ) : (
                <>
                  <img
                    className="me-3"
                    src="./assets/vectors/call-voice.svg"
                    alt="call-voice"
                  />
                  <img
                    src="./assets/vectors/call-video.svg"
                    alt="call-video"
                    onClick={() => setVideoCallActiveState(true)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="chat-main-body mb-4 p-4">
          {[
            {
              type: "msg",
              userImg: "./assets/vectors/chat-user-1.svg",
              msgContents: [
                {
                  type: "text",
                  text: "Recently I saw properties in a great location that I did not pay attention to before😄",
                },
              ],
              msgTime: "1 day ago",
            },
            {
              me: true,
              type: "msg",
              userImg: "./assets/img/chat-me.png",
              msgContents: [
                {
                  type: "text",
                  text: "I am interested to know more about your prices and services you offer",
                },
              ],
              msgTime: "1 day ago",
            },
            {
              type: "timetag",
              date: "Today",
            },
            {
              type: "msg",
              userImg: "./assets/vectors/chat-user-1.svg",
              msgContents: [
                {
                  type: "text",
                  text: "I’ll raise a retun request for you. Here are the instructions to get the package ready for return. The return process will take max 2 days depends on the traffic return exclude the shipping",
                },
                {
                  type: "file",
                  icon: "",
                  text: "Return Product",
                  info: "pdf - 2.9MB",
                },
              ],
              msgTime: "2 min ago",
            },
            {
              me: true,
              type: "msg",
              userImg: "./assets/img/chat-me.png",
              msgContents: [
                {
                  type: "text",
                  text: "I am interested to know more about your prices and services you offer",
                },
              ],
              msgTime: "just now",
            },
          ].map((el, idx) => {
            const { type, userImg, msgContents, msgTime, me, date } = el;

            if (type === "msg") {
              return (
                <div
                  key={"msgs" + idx}
                  className={`chat-msg${me ? " me" : ""}`}
                >
                  {msgContents.map((item, idx2) => {
                    const { type, text, info } = item;
                    return (
                      <div className="msg-body" key={"msg" + idx + idx2}>
                        <div className="img">
                          <img src={userImg} alt="user-img" />
                        </div>
                        <div className="text">
                          {type === "text" ? (
                            <div className="chat-text">{text}</div>
                          ) : (
                            <div className="file-container">
                              <div className="file-desc">
                                <img
                                  src="./assets/vectors/file-icon.svg"
                                  alt="file"
                                />
                                <div className="file-text">
                                  <div className="chat-text">{text}</div>
                                  <div className="chat-text">{info}</div>
                                </div>
                              </div>
                              <img
                                className="download"
                                src="./assets/vectors/file-download.svg"
                                alt="download"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="msg-foot">
                    <div className="time">{msgTime}</div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="timetag-container" key={"foot" + idx}>
                  <div className="time-tag">
                    <div className="tag">{date}</div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="new-msg">
        <Input
          value={searchState}
          onChange={searchChangeHandler}
          id="msg"
          name="msg"
          placeholder="Write a message"
        />
        <div className="ms-4 btn btn-send btn-gradient">Send</div>
      </div>
    </div>
  );
};

export default Chat;
