import React, { useState, useEffect } from "react";
import axios from "axios";
const ClientCard = ({
  entityId,
  setClientSelected,
  setSingleClient,
  connection,
}) => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const fetchData = async () => {
      try {
        const data = await axios({
          method: "GET",
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/${entityId}`,
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
        });

        try {
          const profilePicture = await axios({
            method: "GET",
            url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/profile/picture/${data.data.id}`,
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
              refresh_token: tokens.refreshToken,
              idToken: tokens.idToken,
            },
          });
          setProfilePic(profilePicture.data.picture);
        } catch (error) {
          console.log(error);
        }

        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [entityId]);

  const handleClientClick = () => {
    setClientSelected(true);
    setSingleClient({ ...user, entityId, connection, profilePic });
  };

  return user ? (
    <div className="client-card emboss-md" onClick={() => handleClientClick()}>
      <div className="head">
        <div className="img" style={{ background: "#CAD4E3" }}>
          {/* {profilePic && (
            <img src={profilePic?.file_id?.link} alt={"Profile"} />
          )} */}
          <img
            src={
              // user.human_identity_id.gender &&
              // user.human_identity_id.gender === 0
              "./assets/img/boyDefault.png"
              // : "./assests/img/girlDefault.png"
            }
            alt={"Profile"}
          />
        </div>
        <div className="text">
          <h3 className="section-title">{user.human_identity_id.first_name}</h3>
          <div className="ts-16">
          {user.human_identity_id.last_name}
          </div>
        </div>
      </div>
      <div className="body">
        <div className="section">
          <div className="text-dark-4 fw-400">{`${user.email_id.contact}@${user.email_id.domain}`}</div>
          <div className="text-small">Email</div>
        </div>
        <div className="section">
          <div className="text-dark-4 fw-400">
            {user.phone === null
              ? "Oh no! There is none 🤯"
              : user.phone.phone_number_id.number}
          <div className="text-small">Phone</div>
          </div>
        </div>
        <div className="section noded">
          {/* {noded && <button className="btn btn-vert">Noded</button>} */}
        </div>
      </div>
    </div>
  ) : (
    <p>...</p>
  );
};

export default ClientCard;