import { createBrowserRouter } from "react-router-dom";
import Connexion from "./components/Connexion";
import App from "./App";
import Pokedex from "./components/Pokedex";
import Comptes from "./components/Comptes";
import Recherche from "./components/Recherche";
import Pokemon from "./components/Pokemon";

export const routes=createBrowserRouter([
    {
        element: <App />,
        children:[
            {path: "/", element: <Connexion />},
            {path: "/Pokedex", element: <Pokedex />},
            {path: "/Comptes", element: <Comptes />},
            {path: "/Recherche", element: <Recherche />},
            {path: "/Pokemon/:pokemonName", element:<Pokemon />}
        ]
    }
]);