import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Главная",
    key: "main",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Вход",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
