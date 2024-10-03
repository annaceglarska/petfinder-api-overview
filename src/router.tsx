import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Start from "./views/start/Start";
import { Main } from "./views/main/Main";
import PetsMain from "./views/pets-main/PetsMain";
import OrganizationsMain from "./views/organizations-main/OrganizationsMain";
import Animals from "./views/animals/Animals";
import UserDashboard from "./views/user-dashboard/UserDashboard";
import AnimalDetails from "./views/animal-details/AnimalDetails";
import { Pets } from "./views/pets/Pets";
import { Organizations } from "./views/organizations/Organizations";
import OrganizationDetails from "./views/organization-details/OrganizationDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Start />,
        children: [
          {
            path: "/",
            element: <Main />,
          },
          {
            path: "pets",
            element: <PetsMain />,
            children: [
              {
                path: "",
                element: <Pets />,
              },
              {
                path: ":animalType",
                element: <Animals />,
              },
            ],
          },
          {
            path: "organizations",
            element: <OrganizationsMain />,
            children: [
              {
                path: "",
                element: <Organizations />,
              },
            ],
          },
          {
            path: "/user",
            element: <UserDashboard />,
          },
        ],
      },
      {
        path: "pet/details/:id",
        element: <AnimalDetails />,
      },
      {
        path: "organization/details/:id",
        element: <OrganizationDetails />,
      },
    ],
  },
]);
