import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
      }, {
        index: true,
        element: <p>Welcome to my Chill och Snabbt</p>
      }]
  },
]);
export default router;