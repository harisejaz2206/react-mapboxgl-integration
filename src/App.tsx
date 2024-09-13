import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import MapComponent from "./components/MapComponent";
import MapComponentTwo from "./components/MapComponentTwo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/map' element={<MapComponent></MapComponent>}></Route>
        <Route path='/map-two' element={<MapComponentTwo></MapComponentTwo>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
