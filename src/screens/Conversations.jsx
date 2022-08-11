import React, { useState, useContext, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";
import Tabs from "../components/Tabs";
import TabContents from "../components/TabContents";
import TabContentItem from "../components/TabContentItem";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import { AuthContext } from "../store/auth-context";
import ChatListItem from "../components/ChatListItem";
import Chat from "../components/Chat";

const Converstaions = () => {
  const [page, setPage] = useState(0);
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [userConnections, setUserConnections] = useState([]);
  const {
    tokens,
    user: { user },
  } = useContext(AuthContext);
  const [searchState, setSearchState] = useState("");
  const [videoCallActiveState, setVideoCallActiveState] = useState(false);
  useEffect(() => {
    loadConnections();
  }, []);
  const loadConnections = async () => {
    const response = await fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/connections/${user.id}/${page}`,
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
    const connectionsData = await response.json();
    setUserConnections(connectionsData.connections);
  };

  const onPressChatItem = (item) => {
    return () => {
      setActiveConversation(item);
    };
  };
  const searchChangeHandler = (e) => {
    setSearchState(e.target.value);
  };

  return (
    <MainLayout
      headVector="./assets/vectors/desk.svg"
      sideNavVector="./assets/vectors/sidenav-right-6.svg"
      title="desk"
      contentClassName="pb-0"
      activeLink="desk"
      tabData={{
        img: true,
        tabGroupName: "feed-tabs",
        data: [
          {
            icon: "./assets/vectors/conversations.svg",
            iconActive: "./assets/vectors/conversations-active.svg",
            target: "conversations",
            active: true,
          },
          {
            icon: "./assets/vectors/feed.svg",
            iconActive: "./assets/vectors/feed-active.svg",
            target: "feed",
          },
        ],
      }}
    >
      <div id="conversations-main-content">
        <div className="container-fluid px-0">
          <TabContents tabGroupName="feed-tabs">
            <TabContentItem target="conversations">
              <div className="row mt-4">
                <div className="col-lg-4 short-scrollbar">
                  <div className="emboss-white br-16 px-3 py-4">
                    <Tabs
                      className="mt-4 "
                      tabGroupName="conversatoins-tabs"
                      onChangeTab={setActiveTab}
                      data={[
                        {
                          label: "Users",
                          target: "users",
                          active: true,
                        },
                        {
                          label: "Team",
                          target: "team",
                        },
                      ]}
                    />

                    <div className="left-content">
                      <div className="funcs my-4 px-2 d-flex justify-content-between">
                        <SearchInput placeholder="Search Client or Message" />
                        {/* <AddBtn title="NEW" /> */}
                      </div>

                      <div className="chat-list">
                        {userConnections
                          .filter((el) => {
                            if (activeTab === "users" && el.user_id) {
                              return true;
                            } else if (activeTab === "team" && !el.user_id) {
                              return true;
                            }
                            return false;
                          })
                          .map((el, index) => {
                            return (
                              <ChatListItem
                                entityId={
                                  el.connection_id.target_entity_id.id ===
                                  user.entity_id.id
                                    ? el.entity_id.id
                                    : el.connection_id.target_entity_id.id
                                }
                                idx={index}
                                onPressChatItem={onPressChatItem}
                                activeConversation={activeConversation}
                                key={`chat_list_item_${index}`}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 short-scrollbar">
                  <Chat converstaion={activeConversation} />
                </div>
              </div>
            </TabContentItem>

            <TabContentItem target="feed">
              <div className="feed-container mt-4">
                <div className="feed-main mt-5">
                  <div className="container-fluid px-0">
                    <div className="row gy-5">
                      <div className="col-lg-6">
                        <div className="row gy-5 justify-content-center justify-content-md-start">
                          <h3 className="section-title mb-3 ms-2">Noded</h3>
                          {[
                            {
                              img: "./assets/vectors/feed-1.svg",
                              title: "Car Color",
                              time: "5 min ago",
                              sub: "WO #9386a47324",
                            },
                            {
                              img: "./assets/vectors/feed-2.svg",
                              title: "Repair Scratch",
                              time: "7 min",
                              sub: "WO #9386a47324",
                            },
                            {
                              img: "./assets/vectors/feed-3.svg",
                              title: "VIN location",
                              time: "24 min",
                              sub: "WO #9386a47324",
                            },
                            {
                              img: "./assets/vectors/feed-4.svg",
                              title: "Battery check",
                              time: "1 hour",
                              sub: "WO #9386a47324",
                            },
                            {
                              img: "./assets/vectors/feed-5.svg",
                              title: "Tires use",
                              time: "1 hour",
                              sub: "WO #9386a47324",
                            },
                            {
                              img: "./assets/vectors/feed-6.svg",
                              title: "Car Repair",
                              time: "2 hour",
                              sub: "WO #9386a47324",
                            },
                          ].map((el, idx) => {
                            return (
                              <FeedItem key={"feed-item-noded" + idx} {...el} />
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row gy-5 justify-content-center justify-content-md-start">
                          <h3 className="section-title mb-3">General</h3>
                          {[
                            {
                              img: "./assets/vectors/feed-7.svg",
                              title: "Tires use",
                              time: "8 hour",
                              sub: "WO #9386a47324",
                            },
                            {
                              img: "./assets/vectors/feed-8.svg",
                              title: "Corrosion",
                              time: "23 hours",
                              sub: "WO #9386a47324",
                            },
                          ].map((el, idx) => {
                            return (
                              <FeedItem
                                key={"feed-item-general" + idx}
                                {...el}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabContentItem>
          </TabContents>
        </div>
      </div>
    </MainLayout>
  );
};

export default Converstaions;

const FeedItem = ({ img, title, time, sub }) => {
  return (
    <div className="feed-item text-center emboss-white m-2 mx-3 mt-4 p-4 py-5 br-16">
      <img src={img} alt="" />

      <div className="text mt-3">
        <div className="fw-600">{title}</div>
        <div className="text-inter fw-400 fs-11">{time} min ago</div>
        <div className="mt-3 text-light-5 fw-700 fs-12">{sub}</div>
      </div>
    </div>
  );
};
