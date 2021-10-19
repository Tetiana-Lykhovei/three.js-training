import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useRoutes } from "./components/routes";

function App() {
  const routes = useRoutes();
  return (
    <Router>
      <Navbar />
      <div>{routes}</div>
    </Router>
  );
}

export default App;
