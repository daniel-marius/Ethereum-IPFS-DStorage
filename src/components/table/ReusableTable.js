import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReusableTable = ({ rows, cols, size, label }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        size={`${size === "small" ? "small" : "medium"}`}
        aria-label={`${label === "simple table" ? "simple table" : "a dense table"}`}
      >
        <TableHead>
          <TableRow>
            {cols.map((col, idx) => (
              <TableCell key={idx}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {cols.map((col, idx) => (
                <TableCell key={idx}>{col.render(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ReusableTable.propTypes = {
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
  size: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ReusableTable.defaultProps = {
  size: "small",
  label: "simple table",
};

export default ReusableTable;
