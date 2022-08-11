import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";

const ChatListItem = ({ entityId, onPressChatItem, activeConversation }) => {
  const { tokens } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    loadUser(entityId);
  }, [entityId]);

  async function loadUser(entityId) {
    const response = await fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/${entityId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        },
      }
    );
    const userinfo = await response.json();
    setUser(userinfo);
  }
  if (!user) {
    return <div>Loading....</div>;
  }
  const badgeText = 2;
  const active = activeConversation ? activeConversation.id === user : false;
  return (
    <div
      className={`chat${active ? " active" : ""}`}
      onClick={onPressChatItem(user)}
    >
      <div className="img">
        <img src="./assets/img/boyDefault.png" alt={"Profile"} />
      </div>

      <div className="text">
        <div className="left">
          <div className="name fw-600">{`${user.first_name} ${user.last_name}`}</div>
          <div className="lastMsg text-small">New message</div>
        </div>
        <div className="right">
          <div className="timeAgo text-small">time</div>
          {badgeText && <div className="badge">{badgeText}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
