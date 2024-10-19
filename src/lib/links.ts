import MoneyBagIcon from "../../public/icons/moneyBag";
import TransactionIcon from "../../public/icons/transactions";
import WalletIcon from "../../public/icons/wallet";
import { routes } from "./routes";

export const sideBarLinksSyndicate = [
  {
    key: 1,
    name: routes.overview.name,
    subLinks: [
      {
        name: routes.overview.name,
        key: routes.overview.url,
        label: routes.overview.label,
        icon: WalletIcon,
      },
    ],
  },
  {
    key: 2,
    name: routes.dataList.name,
    subLinks: [
      {
        name: routes.dataList.name,
        key: routes.dataList.url,
        label: routes.dataList.label,
        icon: TransactionIcon,
      },
    ],
  },
];

export const auth = {
  login: {
    label: "Login",
    url: "/",
    name: "login",
  },
  serverLogin: {
    url: "/api/login",
  },
  serverLogout: {
    url: "/",
  },
};
