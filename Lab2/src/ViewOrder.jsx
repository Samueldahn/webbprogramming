import { v4 as uuidv4 } from 'uuid';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewOrder(props) {
  const { shoppingCart, emptyShoppingCart } = useOutletContext();
  const { uuid } = useParams();
  
    if (shoppingCart.length === 0){
        return(
          <div className="container col-12 mb-5">
            <div className="row h-200 p-5 bg-light border rounded-3">
              <h2>Varukorgen</h2>
                <p>Inget i varukorgen.</p>
            </div>
          </div>
        )
    }
    return (
      <div className="container col-12 mb-5">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Varukorgen</h2>
          {shoppingCart.map((salad, index) => {
    
            const ingredients = Object.keys(salad.ingredients).join(', ');
            const price = salad.getPrice();

            return (
              <div className="mb-3 fs-10 border centered rounded bg-white " key={salad.uuid}>
                <p>{ingredients + ", pris: " + price + "kr"}</p>
              </div>
      
            );
          })}

          <input className="mt-4 btn btn-secondary" id="clear" type="button" value="Töm varukorgen" onClick={emptyShoppingCart}></input>

        </div>

        {uuid && (
          <div className="mt-4">
            <p>Din sallad med id: {uuid} har lagts till i varukorgen.</p>
          </div>
        )}

      </div>
    )

  };
export default ViewOrder;