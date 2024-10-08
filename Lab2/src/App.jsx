import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import BootstrapSpinner from './BootstrapSpinner';
import ConfirmOrder from './ConfirmOrder';
import Salad from './Salad.mjs'


function App() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [confirmations, setConfirmations] = useState([]);

  const getShoppingCartFromLS = () => {
    if(localStorage.getItem("shoppingCart")){
      return Salad.parse(localStorage.getItem("shoppingCart"));
    }
    return [];
  }

  const [shoppingCart, setShoppingCart] = useState(getShoppingCartFromLS());


  const addSalad = (newSalad) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedCart = [...prevShoppingCart, newSalad];
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart)); 
      return updatedCart; 
    });
  };

  const emptyShoppingCart = (event) => {
    event.preventDefault();
    setShoppingCart([]);
    localStorage.removeItem("shoppingCart");
    };


  const helpingPlaceOrder = async (stringSalad) => {
    try {
      const response = await fetch('http://localhost:8080/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: stringSalad, 
      });

      if (!response.ok) {
        throw new Error(`Servern svarade med status ${response.status}`);
      }

      return await response.json();
      
    } catch (error) {
      console.error('Error placing order:', error);
      return { error: 'Failed to place order' }; 
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    setConfirmations([]);

    for (const salad of shoppingCart) {
      const stringSalad = JSON.stringify([Object.keys(salad.ingredients)]);

      const result = await helpingPlaceOrder(stringSalad); 
      if (result && result.status) {
          setConfirmations((prevConfirmations) => [...prevConfirmations, result]);
      }
  }

    console.log(confirmations);

    const toastElList = document.querySelectorAll('.toast');
    toastElList.forEach(toastEl => {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    });
    setShoppingCart([]);
    localStorage.removeItem("shoppingCart");

  };

  function visablePage (){
    if(navigation.state === 'loading'){
      return (<BootstrapSpinner/>);
    }
    return (<Outlet context={{addSalad, shoppingCart, emptyShoppingCart, placeOrder }} />);

  }


  return (
    <div className="container py-4" >
      <header className="pb-3 mb-4 border-bottom">
        <img style={{ width: '100px', height: '100px'}} src="https://www.grontogott.se/wp-content/uploads/2020/07/cropped-logo.png" alt="Chill och snabbt logo"/>
        <span className="fs-1 align-middle">Chill och snabbt</span>
      </header>
      <ConfirmOrder confirmations={confirmations}/>

      <Navbar />
      {visablePage()}



      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;