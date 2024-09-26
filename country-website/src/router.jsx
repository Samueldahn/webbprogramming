import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Countryfinder from "./Countryfinder";
import Home from './Home';
import Arvid from './Arvid';
import Samuel from './Samuel';




const router = createBrowserRouter([
  {
    Component: App,
    children: [
        {
            path: "/",
            Component: Home,
        }, {
            path: "arvid",
            Component: Arvid,
        }, {
            path: "samuel",
            Component: Samuel,
        }, {
            path: "country-finder",
            Component: Countryfinder,
        }, {
            path: "*",
            element: <p>Sidan finns inte</p>
        }]
    },
]);
export default router;