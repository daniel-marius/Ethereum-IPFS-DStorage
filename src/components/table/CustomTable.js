import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ethers } from "ethers";

import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { convertBytes } from "../../utils/convertBytes";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CustomTable = ({ files }) => {
  const classes = useStyles();

  const renderTable = () => {
    files.shift(); // removes the first element of the array; this element has empty fields
    if (files) {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Extension</StyledTableCell>
                <StyledTableCell align="right">Size (IPFS)</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">View</StyledTableCell>
                <StyledTableCell align="right">Uploader</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <StyledTableRow key={file.fileName}>
                  <StyledTableCell component="th" scope="row">
                    {ethers.BigNumber.from(file.fileId._hex).toString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {file.fileName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {file.fileDescription}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {file.fileType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {file.fileExtension}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {convertBytes(ethers.BigNumber.from(file.fileSize._hex))}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {moment
                      .unix(ethers.BigNumber.from(file.uploadTime._hex))
                      .format("h:mm:ss A M/D/Y")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <a
                      href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      >{String(file.fileHash).substring(0, 10)}...
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {String(file.uploader)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <CircularProgress />;
    }
  };

  return <div>{renderTable()}</div>;
};

CustomTable.propTypes = {
  files: PropTypes.array.isRequired,
};

export default CustomTable;
