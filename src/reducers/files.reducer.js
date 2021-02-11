// import _ from "lodash";

import { BLOCKCHAIN_ITEMS, ETHEREUM_ERROR } from "../actions";

const filesReducer = (state = [], action) => {
  switch (action.type) {
    case BLOCKCHAIN_ITEMS:
      return action.payload || [];
    // return { ...state, ..._.mapKeys(action.payload, "id") };
    case ETHEREUM_ERROR:
      return action.payload || ETHEREUM_ERROR;
    default:
      return state;
  }
};

export default filesReducer;
