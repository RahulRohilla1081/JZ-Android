import Icons from "../../../constants/Icons";
import Account from "../../screens/AccountDetails/AccountDetails";
import Orders from "../../screens/Orders/Orders";
import Portfolio from "../../screens/Portfolio/Portfolio";
import WatchList from "../../screens/WatchList/WatchList";
import { ACCOUNT_DETAILS, ORDERS, PORTFOLIO, WATCH_LIST } from "../../utils/Routes/Routes";
export  const ScreenNamesList = [
  {
    route_path: WATCH_LIST,
    label: 'Watchlist',
    icon: Icons.watch_list,
    component: WatchList,
  },
  {
    route_path: PORTFOLIO,
    label: 'Portfolio',
    icon: Icons.portfolio,
    component: Portfolio,
  },
  {
    route_path: ORDERS,
    label: 'Orders',
    icon: Icons.orders,
    component: Orders,
  },
  {
    route_path: ACCOUNT_DETAILS,
    label: 'LJS128',
    icon: Icons.profile,
    component: Account,
  },
];
