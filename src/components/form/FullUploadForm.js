import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import initEthers from "../../ethereum/ethers";
import { loadBlockchainData, ipfsFileUpload } from "../../actions";

import CustomTable from "../table/CustomTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    width: "100%",
  },
  input: {
    display: "",
  },
}));

const FullUploadForm = () => {
  const [file, setFile] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [contract, setContract] = useState(undefined);

  const files = useSelector((state) => state.files);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    const init = async () => {
      const { dstorageContract } = await initEthers();

      setContract(dstorageContract);
      dispatch(loadBlockchainData(dstorageContract));
    };

    init();
  }, [dispatch]);

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(ipfsFileUpload(file, fileDescription, contract));
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h3" gutterBottom>
          Upload Files
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            id="outlined-basic"
            label="File Description"
            variant="outlined"
            input={fileDescription}
            onChange={(event) => setFileDescription(event.target.value)}
          />
          <br />
          <br />
          <input
            className={classes.input}
            type="file"
            multiple
            id="Files"
            input={file}
            onChange={(event) => setFile(event.target.files[0])}
          />
          <input type="submit" value="Upload" />
        </form>
        <br />
        <CustomTable files={files} />
      </div>
    </div>
  );
};

export default FullUploadForm;
