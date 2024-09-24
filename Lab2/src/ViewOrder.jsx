import { v4 as uuidv4 } from 'uuid';

function ViewOrder(props) {
  
    if (props.shoppingCart.length === 0){
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
          {props.shoppingCart.map((salad, index) => {
    
            const ingredients = Object.keys(salad.ingredients).join(', ');
            const price = salad.getPrice();

            return (
        
              <div className="mb-3 fs-10 border centered rounded bg-white " key={salad.uuid}>
                <p>{ingredients + ", pris: " + price + "kr"}</p>
              </div>
      
            );
            
          })}

          <input className="mt-4 btn btn-secondary" id="clear" type="button" value="Töm varukorgen" onClick={props.emptyShoppingCart}></input>

        </div>
      </div>
    )

  };
export default ViewOrder;