import { Routes, Route } from 'react-router-dom';

import './Component/Header/nav'
import Navbar from './Component/Header/nav';
import Cart from './Pages/Cart/cartPage/cartPage';
import Home from './Pages/Home/Homepage';

function App() {
  return (
    <div className="App">
       
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
       
    </div>
  );
}

export default App;
