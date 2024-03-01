import { Routes, Route } from "react-router-dom";
import TableDetails from "./component/TableDetay";
import Home from "./component/Home";
import Table from "./component/Table";
import User from "./component/User";
import "./index.css"
function App() {
  return (
    <div className=" bg-gray-800">
      <Routes>
 
        <Route path="/" element={<Home content={<Table/>}/>}></Route>
        <Route path="/group" element={<Home content={<User/>}/>}></Route>
        <Route path="/detail/:id"  element={<Home content={<TableDetails/>}/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
