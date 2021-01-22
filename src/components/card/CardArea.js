import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: "hsla(89, 43%, 51%, 0.3)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
}));

const CardArea = () => {
  const classes = useStyles();

  const renderCard = () => {
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.pos} variant="h5" component="h2">
            Decentralized Storage Ethereum IPFS
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to="/files/new">
              <b>Add New File(s)</b>
            </Link>
          </Button>
          <Button size="small">
            <Link to="/blockexplorer">
              <b>View Block Explorer</b>
            </Link>
          </Button>
          <Button size="small">
            <a href="https://ethereum.org/en/developers/docs/storage/">
              <b>Learn More</b>
            </a>
          </Button>
        </CardActions>
      </Card>
    );
  };

  return <div>{renderCard()}</div>;
};

export default CardArea;
