import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  const addSalad = (newSalad) => {
    setShoppingCart((prevShoppingCart) => [...prevShoppingCart, newSalad]);
  };

  const emptyShoppingCart = (event) => {
    event.preventDefault();
    setShoppingCart([]);
  };


  return (
    <div className="container py-4" >
      <header className="pb-3 mb-4 border-bottom">
        <img style={{ width: '100px', height: '100px'}} src="https://www.grontogott.se/wp-content/uploads/2020/07/cropped-logo.png" alt="Chill och snabbt logo"/>
        <span className="fs-1 align-middle">Chill och snabbt</span>
      </header>

      <div className="container col-12 mb-5">
          <div className="row h-200 p-5 bg-light border rounded-3">
            <h2>Varukorgen</h2>
            <ViewOrder shoppingCart={shoppingCart}></ViewOrder>
            <input className="mt-4 btn btn-secondary" id="clear" type="button" value="Töm varukorgen" onClick={emptyShoppingCart}></input>

          </div>
      </div>
      

      <ComposeSalad inventory={inventory} onSubmit={addSalad}></ComposeSalad>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;