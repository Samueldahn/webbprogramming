import { v4 as uuidv4 } from 'uuid';

function ViewOrder(props) {
  
    if (props.shoppingCart.length === 0){
        return <p>Inget i varukorgen.</p>;

    }

    return props.shoppingCart.map((salad, index) => {
      const ingredients = Object.keys(salad.ingredients).join(', ');
      const price = salad.getPrice();
      return (
        <div className="mb-3 fs-10 border centered rounded bg-white " key={salad.uuid}>
          <p>{ingredients + ", pris: " + price + "kr"}</p>
        </div>
      );
    });
}
export default ViewOrder;