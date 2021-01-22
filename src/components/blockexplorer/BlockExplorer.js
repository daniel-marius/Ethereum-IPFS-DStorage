import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import initEthers from "../../ethereum/ethers";
import { getLatestBlocks } from "../../actions";
import ReusableTable from "../table/ReusableTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    width: "100%",
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function BlockExplorer() {
  const [lastBlockNumber, setLastBlockNumber] = useState(undefined);
  const [miningDifficulty, setMiningDifficulty] = useState(undefined);
  const [gasPrice, setGasPrice] = useState(undefined);
  const [events, setEvents] = useState([]);

  const blocks = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    const init = async () => {
      const { provider, dstorageContract } = await initEthers();

      const filter = dstorageContract.filters.FileUploaded();

      filter.fromBlock = 1;
      filter.toBlock = "latest";

      const logs = await provider.getLogs(filter);
      const lastBlockNumber = await provider.getBlockNumber();
      const gasPrice = await provider.getGasPrice();
      const lastBlock = await provider.getBlock(lastBlockNumber);
      const miningDifficulty = lastBlock.difficulty;
      const numberOfLastBlocks = 7;

      setLastBlockNumber(lastBlockNumber);
      setMiningDifficulty(miningDifficulty);
      setGasPrice(gasPrice);
      setEvents(logs);

      dispatch(getLatestBlocks(numberOfLastBlocks, provider));
    };
    init();
  }, [dispatch]);

  const renderGrids = () => {
    if (
      lastBlockNumber !== undefined &&
      miningDifficulty !== undefined &&
      gasPrice !== undefined
    ) {
      const renderItems = [
        { text: "Last Block Number", value: lastBlockNumber, key: 1 },
        { text: "Current Block Difficulty", value: miningDifficulty, key: 2 },
        {
          text: "Current Gas Price (ETH)",
          value: ethers.utils.formatUnits(gasPrice, "ether"),
          key: 3,
        },
      ];

      return _.map(renderItems, ({ text, value, key }) => {
        return (
          <Paper className={classes.paper} key={key}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs zeroMinWidth>
                <Typography noWrap>
                  {text}: {value}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        );
      });
    } else {
      return <CircularProgress />;
    }
  };

  const renderBlocksTable = () => {
    if (blocks) {
      const rows = blocks.map((block) => {
        return {
          number: block.number,
          parentHash: String(block.parentHash).substring(0, 10) + "...",
          hash: String(block.hash).substring(0, 10) + "...",
          timestamp: moment.unix(block.timestamp).format("h:mm:ss A M/D/Y"),
          link: <Link to={`/block/${block.number}`}>View Transactions</Link>,
        };
      });

      // render: receives 'rowData' which is the current iteration item for received from table component to this constants so you can dig down to any level of the JSON to display your desired input.
      const cols = [
        {
          title: "Block #",
          render: (rowData) => {
            return <span>{rowData.number}</span>;
          },
        },
        {
          title: "Parent Hash",
          render: (rowData) => {
            return <span>{rowData.parentHash}</span>;
          },
        },
        {
          title: "Hash",
          render: (rowData) => {
            return <span>{rowData.hash}</span>;
          },
        },
        {
          title: "Timestamp",
          render: (rowData) => {
            return <span>{rowData.timestamp}</span>;
          },
        },
        {
          title: "Transactions",
          render: (rowData) => {
            return <span>{rowData.link}</span>;
          },
        },
      ];

      return (
        <ReusableTable
          rows={rows}
          cols={cols}
          size="medium"
          label="a dense table"
        />
      );
    } else {
      return <CircularProgress color="secondary" />;
    }
  };

  const renderEventsTable = () => {
    if (events) {
      const rows = events.map((event) => {
        return {
          number: event.blockNumber,
          address: String(event.address).substring(0, 10) + "...",
          blockHash: String(event.blockHash).substring(0, 10) + "...",
          transactionHash:
            String(event.transactionHash).substring(0, 10) + "...",
          data: String(event.data).substring(0, 10) + "...",
          topics: String(event.topics[0]).substring(0, 10) + "...",
        };
      });

      const cols = [
        {
          title: "Block #",
          render: (rowData) => {
            return <span>{rowData.number}</span>;
          },
        },
        {
          title: "Address",
          render: (rowData) => {
            return <span>{rowData.address}</span>;
          },
        },
        {
          title: "Block Hash",
          render: (rowData) => {
            return <span>{rowData.blockHash}</span>;
          },
        },
        {
          title: "Transaction Hash",
          render: (rowData) => {
            return <span>{rowData.transactionHash}</span>;
          },
        },
        {
          title: "Data",
          render: (rowData) => {
            return <span>{rowData.data}</span>;
          },
        },
        {
          title: "Topics",
          render: (rowData) => {
            return <span>{rowData.topics}</span>;
          },
        },
      ];

      return (
        <ReusableTable
          rows={rows}
          cols={cols}
          size="small"
          label="simple table"
        />
      );
    } else {
      return <CircularProgress color="secondary" />;
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Ethereum Block Explorer
        </Typography>
        {renderGrids()}
        <Divider />
        {renderBlocksTable()}
        <br />
        <Typography variant="h4" gutterBottom>
          Block Events
        </Typography>
        {renderEventsTable()}
      </div>
    </>
  );
}
