import React, { useReducer } from "react";

import { useHttpClient } from "../services/BackEndAPI";

const EventContext = React.createContext();

const initialState = {
  subscribedEvent: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBSCRIBED_EVENT":
      return { ...state, subscribedEvent: action.payload };
    default:
      return state;
  }
};
const EventProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sendRequest } = useHttpClient();

  const getSubscribedEventsOfUser = async (headers) => {
    const response = await sendRequest("eventsSubscribed", "GET", headers);
    if (response.status === 200) {
      const responseData = await response.json();
      return dispatch({ type: "SUBSCRIBED_EVENT", payload: responseData });
    }
  };
  return (
    <EventContext.Provider value={{ ...state, getSubscribedEventsOfUser }}>
      {props.children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
