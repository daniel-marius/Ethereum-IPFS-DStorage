import { Router, Route, Switch } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import UploadTablePage from "./pages/UploadTablePage";
import BlockExplorerPage from "./pages/BlockExplorerPage";
import TransactionExplorerPage from "./pages/TransactionExplorerPage";

import history from "./history";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={FirstPage} />
        <Route exact path="/files/new" component={UploadTablePage} />
        <Route exact path="/blockexplorer" component={BlockExplorerPage} />
        <Route
          exact
          path="/block/:number"
          component={TransactionExplorerPage}
        />
      </Switch>
    </Router>
  );
};

export default App;
