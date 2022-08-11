import React , {useState,useEffect} from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import axios from "axios";

const DraggableElement = ({prefix, elements }) => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  // const [cardsData,setCardsData] = useState();
  // const fetchData = async () => {
  //   try {
  //     const res = await axios({
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${tokens.accessToken}`,
  //         idToken: tokens.idToken,
  //         refresh_token: tokens.refreshToken,
  //       },
  //       url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/service/owner/0`,
  //     });
  //     setCardsData(res.data.invoices);
  //   } catch (error) {
  //    console.log(error) 
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
return(
  <div
    // className={` ${
    //   prefix === "Next Up"
    //     ? "next-up"
    //     : prefix === "In Progress"
    //     ? "in-progress"
    //     : "done"
    // }`}
  >
    
    {/* <div className="dropable"> */}
      <Droppable droppableId={`prefix`} isDropDisabled={false}>
        {(provided) => (
          <div 
          ref={provided.innerRef}
          >
            {/* {console.log(elements)} */}
            {elements.map((item, index) => {
              return (
                <ListItem 
                key={item.id} 
                item={item} 
                index={index}
                 />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    {/* </div> */}
  </div>
);
}
export default DraggableElement;
