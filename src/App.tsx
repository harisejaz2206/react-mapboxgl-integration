import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import MapComponent from "./components/MapComponent";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/map' element={<MapComponent></MapComponent>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
