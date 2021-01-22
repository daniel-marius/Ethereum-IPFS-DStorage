import { combineReducers } from "redux";

import filesReducer from "./files.reducer";
import latestBlocksReducer from "./latestBlocks.reducer";
import ipfsReducer from "./ipfs.reducer";

export default combineReducers({
  files: filesReducer,
  blocks: latestBlocksReducer,
  ipfsObject: ipfsReducer,
});
