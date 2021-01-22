import {
  BLOCKCHAIN_ITEMS,
  LATEST_BLOCKS,
  IPFS_UPLOAD,
  ETHEREUM_ERROR,
  IPFS_ERROR,
} from "./types";

import ipfs from "../ipfs/ipfs";
import history from "../history";

export const loadBlockchainData = (contract) => async (dispatch) => {
  try {
    const fileCount = await contract.getFileCount();
    const files = await Promise.all(
      Array.from({ length: parseInt(fileCount.toString()) + 1 }).map(
        (element, index) => {
          return contract.files(index);
        }
      )
    );
    dispatch({ type: BLOCKCHAIN_ITEMS, payload: files });
  } catch (error) {
    dispatch({ type: ETHEREUM_ERROR, payload: error });
  }
};

export const getLatestBlocks = (numberOfLastBlocks, provider) => async (
  dispatch
) => {
  try {
    const lastBlockNumber = await provider.getBlockNumber();
    const latestBlocks = await Promise.all(
      Array.from({ length: parseInt(numberOfLastBlocks) }).map(
        (element, index) => {
          return provider.getBlock(lastBlockNumber - index);
        }
      )
    );
    dispatch({ type: LATEST_BLOCKS, payload: latestBlocks });
  } catch (error) {
    dispatch({ type: ETHEREUM_ERROR, payload: error });
  }
};

export const ipfsFileUpload = (file, description, contract) => async (
  dispatch
) => {
  try {
    const fileName = file.name;
    const fileType = file.type;
    const fileExtension = file.name.split(".")[1];
    let fileContent = undefined;

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      fileContent = Buffer.from(reader.result);
    };

    const res = await ipfs.add(fileContent);

    // const cid = res.cid.toV1();
    // console.log(cid.toBaseEncodedString('base32'));

    const fileHash = res.path;
    const fileSize = res.size;

    const tx = await contract.uploadFile(
      fileHash.toString(),
      fileName.toString(),
      fileType.toString(),
      fileExtension.toString(),
      description.toString(),
      parseInt(fileSize)
    );
    const receipt = await tx.wait();
    console.log(receipt);
    history.push("/");
    dispatch({ type: IPFS_UPLOAD, payload: res });
  } catch (error) {
    dispatch({ type: IPFS_ERROR, payload: error });
  }
};
