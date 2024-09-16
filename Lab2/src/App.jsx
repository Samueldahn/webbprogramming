import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import { useState } from 'react';

function App() {
  const [salads, setSalads] = useState([]);

  let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  const addSalad = (newSalad) => {
    setSalads((prevSalads) => [...prevSalads, newSalad]);
  };

  function getSalads() {
    if (salads.length === 0) {
      return <p>No salads in the cart.</p>;
    }

    return salads.map((salad, index) => {
      const ingredients = Object.keys(salad.ingredients).join(', ');
      const price = salad.getPrice();
      return (
        <div className="mb-3 fs-10 border centered rounded bg-white " key={index}>
          <p>{ingredients + ", pris: " + price + "kr"}</p>
        </div>
      );
    });
  }


  return (
    <div className="container py-4" >
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Chill och snabbt</span>
      </header>

      <div className="container col-12 mb-5">
          <div className="row h-200 p-5 bg-light border rounded-3">
            <h2>Varukorgen</h2>
            {getSalads()}
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