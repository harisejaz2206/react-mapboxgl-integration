import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import MapComponent from "./components/MapComponent";
import MapComponentTwo from "./components/MapComponentTwo";
import MapComponentThree from "./components/MapComponentThree";
import MapComponentFour from "./components/MapComponentFour";
import MapComponentFive from "./components/MapComponentFive";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/map' element={<MapComponent></MapComponent>}></Route>
        <Route path='/map-two' element={<MapComponentTwo></MapComponentTwo>}></Route>
        <Route path='/map-three' element={<MapComponentThree></MapComponentThree>}></Route>
        <Route path='/map-four' element={<MapComponentFour></MapComponentFour>}></Route>
        <Route path='/map-five' element={<MapComponentFive></MapComponentFive>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
