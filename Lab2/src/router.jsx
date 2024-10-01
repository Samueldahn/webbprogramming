import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
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