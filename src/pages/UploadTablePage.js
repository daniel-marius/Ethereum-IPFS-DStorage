// The import of { makeStyles } allows us to manipulate the styling (in this case) our buttons and text field along with importing the default Material UI styling
import { makeStyles } from "@material-ui/core/styles";

import FullUploadForm from "../components/form/FullUploadForm";
import SearchAppBar from "../components/navbar/SearchAppBar";

import "../style/Global.css";

// Brings in the boilerplate styling from Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const UploadTablePage = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SearchAppBar />
      <div className="main">
        <div className="card">
          <FullUploadForm />
        </div>
      </div>
    </div>
  );
};

export default UploadTablePage;
