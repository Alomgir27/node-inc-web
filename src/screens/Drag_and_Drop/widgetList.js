import React from "react";
import axios from "axios";

const tokens = JSON.parse(localStorage.getItem('tokens'));
var listItem1 = [];
var listItem2 = [];
var listItem3 = [];

const fetchData = async () => {
  try {
    const res = await axios({
      method: "GET",
      headers: {
        authorization: `Bearer ${tokens.accessToken}`,
        idToken: tokens.idToken,
        refresh_token: tokens.refreshToken,
      },
      url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/service/owner/0`,
    });
      res.data.invoices.map((i) => {  console.log(i);
        if(i?.metadata?.status == 0){
          listItem1.push(i);
        }
        else if(i?.metadata?.status == 1){
          listItem2.push(i);
        }
        else {
          listItem3.push(i);
        }
      })
  } catch (error) {
    console.log(error);
  }
};
fetchData();


const widgetList = {
    "column-1": listItem1,
    "column-2": listItem2,
    "column-3": listItem3
  };

  export default widgetList;
  