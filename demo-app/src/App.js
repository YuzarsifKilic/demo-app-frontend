import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import User from "./components/User/User";

function App() {
  return (
    <div className="App">

        <Navbar></Navbar>
        <Routes>
            <Route exact path={"/"} element={<Home/>} ></Route>
            <Route exact path={"/user/:userId"} element={<User/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;
