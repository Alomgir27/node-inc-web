import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from "../../components/ListItem";
import { BASEURL, sendNetworkRequest } from "../../http/http-request";

import moment from "moment";
import axios from "axios";

const tokens = JSON.parse(localStorage.getItem("tokens"));
// console.log(tokens);
const id = JSON.parse(localStorage.getItem("id"));

const update = async (card, status) => {
  await axios({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokens.accessToken}`,
      refresh_token: tokens.refreshToken,
      idToken: tokens.idToken,
    },
    data: { metadata: { status: status } },
    url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/${card.id}`,
  })
   // .then((res) => {
   //   console.log(res);
   //   window.location.reload();
   // })
    .catch((err) => {
      console.log(err);
    });
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function Widget({ widget, index }) {
  return (
    <Draggable draggableId={widget.id} index={index}>
      {(provided) => (
        <div
          className="DragItem hover"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem key={widget.id} item={widget} index={index} />
        </div>
      )}
    </Draggable>
  );
}

const dummy = {
  id: "1",
  dummy: "dummy",
};

const WidgetList = React.memo(function WidgetList({ widgets, date }) {
  // console.log(date);
  var cardList = widgets.map((widget, index) => {
    // if(startdate){
    //   return (moment(`${widget.metadata.sdate}`).format('YYYY-MM-DD') === date ? <Widget widget={widget} index={index} key={widget.id} /> : null);
    // }
    // else {
    return <Widget widget={widget} index={index} key={widget.id} />;
    // }
  });
  var ok = false;
  for (let i of cardList) {
    if (i !== null) {
      ok = true;
      break;
    }
  }
  return ok ? cardList : <Widget widget={dummy} index={0} key={dummy.id} />;
});

function Column({ droppableId, widgets, date }) {
  return (
    <Droppable droppableId={droppableId} className="DragItem hover done">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <WidgetList widgets={widgets} date={date} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const Container = styled.div`
  display: ${(props) => (props.columnCount === 3 ? "flex" : "block")};
  justify-content: ${(props) =>
    props.columnCount === 3 ? "space-around" : "center"};
  margin: ${(props) => (props.columnCount === 3 ? "0px" : "0 100px")};
`;

const DashboardApp = ({ date }) => {
  const [state, setState] = useState({
    widgets: {
      "column-1": [],
      "column-2": [],
      "column-3": [],
    },
  });
  const columnCount = 3;

  useEffect(() => {
    const listdata = async () => {
      try {
        const res = await sendNetworkRequest(
          `${BASEURL}/invoice/date/${moment(date).format(
            "MM-DD-YYYY"
          )}/service/owner`
        );
        // console.log(res);
        var listItem1 = [];
        var listItem2 = [];
        var listItem3 = [];
        console.log(res);
        res.data.invoices.map((i) => {
          // console.log(i);
          if (i?.metadata?.status == 0) {
            listItem1.push(i);
          } else if (i?.metadata?.status == 1) {
            listItem2.push(i);
          } else {
            listItem3.push(i);
          }
        });
        setState({
          widgets: {
            "column-1": listItem1,
            "column-2": listItem2,
            "column-3": listItem3,
          },
        });
        console.log(date);
      } catch (err) {
        console.log(err);
      }
    };
    if (date) {
      listdata();
    }
  }, [date]);

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      }

      const widgets = reorder(
        state.widgets[source.droppableId],
        source.index,
        destination.index
      );

      const updateState = {
        widgets: {
          ...state.widgets,
          [source.droppableId]: widgets,
        },
      };

      setState(updateState);
    } else {
      const startColumn = [...state.widgets[source.droppableId]];
      const finishColumn = [...state.widgets[destination.droppableId]];
      const [removed] = startColumn.splice(source.index, 1);
      finishColumn.splice(destination.index, 0, removed);
      const status =
        destination.droppableId === "column-1"
          ? 0
          : destination.droppableId === "column-2"
          ? 1
          : 2;
      update(removed, status);
      const updateState = {
        widgets: {
          ...state.widgets,
          [source.droppableId]: startColumn,
          [destination.droppableId]: finishColumn,
        },
      };
      setState(updateState);
      console.log(updateState);
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container columnCount={columnCount}>
        <div className="next-up">
          <h1 className="section-title mb-4">{"Next Up"}</h1>
          <Column
            widgets={state.widgets["column-1"]}
            droppableId="column-1"
            date={date}
          />
        </div>
        <div className="in-progress">
          <h1 className="section-title mb-4">{"In Progress"}</h1>
          <Column
            widgets={state.widgets["column-2"]}
            droppableId="column-2"
            date={date}
          />
        </div>
        <div className="done">
          <h1 className="section-title mb-4">{"Done"}</h1>
          <Column
            widgets={state.widgets["column-3"]}
            droppableId="column-3"
            date={date}
          />
        </div>
      </Container>
    </DragDropContext>
  );
};

export default DashboardApp;
