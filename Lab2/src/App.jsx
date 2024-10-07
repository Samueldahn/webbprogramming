import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import BootstrapSpinner from './BootstrapSpinner';


function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  const addSalad = (newSalad) => {
    setShoppingCart((prevShoppingCart) => [...prevShoppingCart, newSalad]);
  };

  const emptyShoppingCart = (event) => {
    event.preventDefault();
    setShoppingCart([]);
  };

  function visablePage (){
    if(useNavigation().state === 'loading'){
      return (<BootstrapSpinner/>);
      // return (BootstrapSpinner());
    }

    return (<Outlet context={{addSalad, shoppingCart, emptyShoppingCart }} />);

  }


  return (
    <div className="container py-4" >
      <header className="pb-3 mb-4 border-bottom">
        <img style={{ width: '100px', height: '100px'}} src="https://www.grontogott.se/wp-content/uploads/2020/07/cropped-logo.png" alt="Chill och snabbt logo"/>
        <span className="fs-1 align-middle">Chill och snabbt</span>
      </header>
      <Navbar />
      {visablePage()}
      
      {/* <ViewOrder shoppingCart={shoppingCart} emptyShoppingCart={emptyShoppingCart}></ViewOrder>

      <ComposeSalad inventory={inventory} addSalad={addSalad} ></ComposeSalad> */}

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;