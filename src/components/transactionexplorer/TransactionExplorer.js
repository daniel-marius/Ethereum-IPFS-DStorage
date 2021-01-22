import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import initEthers from "../../ethereum/ethers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function TransactionExplorer() {
  const [blockWithTransactions, setBlockWithTransactions] = useState(undefined);
  const params = useParams();

  const classes = useStyles();

  useEffect(() => {
    const init = async () => {
      const { provider } = await initEthers();
      const { number } = params;
      const blockWithTransactions = await provider.getBlockWithTransactions(
        parseInt(number)
      );
      setBlockWithTransactions(blockWithTransactions);
    };

    init();
  }, [params]);

  const renderTable = () => {
    if (blockWithTransactions !== undefined) {
      const columns = [
        { field: "blockHash", headerName: "Block Hash", width: 130 },
        { field: "hash", headerName: "Hash", width: 110 },
        { field: "data", headerName: "Data", width: 110 },
        { field: "from", headerName: "From", width: 110 },
        {
          field: "confirmations",
          headerName: "Confirmations",
          type: "number",
          width: 150,
        },
        {
          field: "nonce",
          headerName: "Nonce",
          type: "number",
          width: 110,
        },
      ];

      const rows = blockWithTransactions.transactions.map((tr) => {
        return {
          id: parseInt(tr.blockNumber),
          blockHash: String(tr.blockHash).substring(0, 10) + "...",
          hash: String(tr.hash).substring(0, 10) + "...",
          data: String(tr.data).substring(0, 10) + "...",
          from: String(tr.from).substring(0, 10) + "...",
          confirmations: parseInt(tr.confirmations),
          nonce: parseInt(tr.nonce),
        };
      });

      return (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      );
    } else {
      return <CircularProgress />;
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Block #{params.number} Transaction Explorer
        </Typography>
      </div>
      {renderTable()}
    </>
  );
}
