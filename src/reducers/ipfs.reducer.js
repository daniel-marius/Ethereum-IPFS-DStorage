import { IPFS_UPLOAD, IPFS_ERROR } from "../actions";

const ipfsReducer = (state = {}, action) => {
  switch (action.type) {
    case IPFS_UPLOAD:
      return action.payload;
    case IPFS_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default ipfsReducer;
