import { BsHouse } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { TbGift } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { TbBasket } from "react-icons/tb";
export const Navideta = [
  {
    title: "Dashboard",
    icon: <BsHouse />,
    link: "/dashboard",
  },

  {
    title: "Users",
    icon: <BsFillPeopleFill />,
    link: "/ViewUsers",
  },

  {
    title: "Customer",
    icon: <TbBasket />,
    link: "/Customer",
  },

  {
    title: "Product Hand.",
    icon: <BsFillCalendarDateFill />,
    link: "#",
  },

  {
    title: "Salse & Refund",
    icon: <TbShoppingCart />,
    link: "#",
  },
  {
    title: "Discount",
    icon: <TbGift />,
    link: "#",
  },
  {
    title: "Report",
    icon: <TbReportSearch />,
    link: "#",
  },
];
