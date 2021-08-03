import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Workplaces from "./components/Workplaces";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css"

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-app">
        <SideMenu />
        <Workplaces />
      </div>
    </div>
  );
}

export default App;
