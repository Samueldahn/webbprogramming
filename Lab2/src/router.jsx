import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";


async function fetchIngredient(ingredentType, ingredientName){
  const response = await fetch(`http://localhost:8080/${ingredentType}/${ingredientName}`)

  if(!response.ok) {
    throw new Error(`${`http://localhost:8080/${ingredentType}/${ingredientName}`} returned status ${response.status}`);
  }
  return response.json(); 
}

// async function fetchData(url, type) {
//   return fetch(url)
//   .then(response => {
//   if(!response.ok) {
//     throw new Error(`${url} returned status ${response.status}`);
//   }
//   return response.json();
  
//   }).then((response) => {
//     response.map(async (name) => {
//       const ingredientOutput = await fetchIngredient(type, name);
//       return {name: ingredientOutput};
//     })
//     return response;
//   });
// }

async function fetchData(url, type) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} returned status ${response.status}`);
  }

  const names = await response.json();

  // Skapa ett sammansatt objekt med ingrediensnamn som nycklar
  const ingredients = await Promise.all(
    names.map(async (name) => {
      const ingredientOutput = await fetchIngredient(type, name);
      return { name, ingredientOutput }; // Returnerar objekt med name och dess ingredientOutput
    })
  );

  // Konvertera arrayen till ett objekt där namnen är nycklar
  const ingredientObj = ingredients.reduce((acc, curr) => {
    acc[curr.name] = curr.ingredientOutput;
    return acc;
  }, {});


  return ingredientObj; // Returnerar ett objekt med ingrediensnamn som nycklar
}



const promises = [
  fetchData("http://localhost:8080/foundations/", "foundations"),
  fetchData("http://localhost:8080/proteins/", "proteins"),
  fetchData("http://localhost:8080/extras/", "extras"),
  fetchData("http://localhost:8080/dressings/", "dressings"),
];

async function inventoryLoader() {
  try{
  const fetchedIngredients = await Promise.all(promises);

  const inventory = fetchedIngredients.reduce((acc, curr) => {
    return { ...acc, ...curr }; // Kombinerar varje objekt i arrayen till ett enda
  }, {});

  console.log(inventory);
  // Promise.all(promises).then(inventory = {...})
  // const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  
  await new Promise(resolve => setTimeout(resolve, 500));
  return inventory;
  }catch (error){
    console.error("Error loading inventory: ", error);
    throw(error);
  }
}

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
        loader: inventoryLoader,
      },{
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:uuid",
            Component: ViewOrder, //OBS!! Detta ska vara en egen komponent med en egen outlet i ViewOrder
          },
        ],

      },{
        index: true,
        element: <p>Welcome to Chill och Snabbt</p>
      }, {
        path: "*",
        element: <p>Sidan finns inte</p>
      }]
  },
]);
export default router;