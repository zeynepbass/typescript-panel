import { Routes, Route } from "react-router-dom";
import TableDetails from "./component/TableDetay";
import Home from "./component/Home";
import Table from "./component/Table.js";
import "./index.css"
function App() {
  return (
    <div className=" bg-gray-800">
      <Routes>
 
        <Route path="/" element={<Home content={<Table/>}/>}></Route>
        <Route path="/detail/:id"  element={<Home content={<TableDetails/>}/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
