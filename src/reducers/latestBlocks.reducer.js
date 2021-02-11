// import _ from "lodash";

import { LATEST_BLOCKS, ETHEREUM_ERROR } from "../actions";

const latestBlocksReducer = (state = [], action) => {
  switch (action.type) {
    case LATEST_BLOCKS:
      // return { ...state, ..._.mapKeys(action.payload, "id") };
      return action.payload || [];
    case ETHEREUM_ERROR:
      return action.payload || ETHEREUM_ERROR;
    default:
      return state;
  }
};

export default latestBlocksReducer;
