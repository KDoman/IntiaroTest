import CALCULATOR_ICON from "../assets/calc.svg";
import CONVERTER_ICON from "../assets/converter.svg";
import HOME_ICON from "../assets/home.svg";
import ICON_AND_THUMB_ICON from "../assets/icon.svg";
import GHOST_ICON from "../assets/ghost.svg";

export const TABS = [
  { id: "homepage", label: "HomePage", img: HOME_ICON, path: "/" },
  {
    id: "measurements",
    label: "Measurements",
    img: CALCULATOR_ICON,
    path: "/Measurements",
  },
  {
    id: "icon_thumbnail",
    label: "Icon & Thumbnail",
    img: ICON_AND_THUMB_ICON,
    path: "/Icon_&_thumbnail",
  },
  {
    id: "jgpToPng",
    label: "JPG to PNG",
    img: CONVERTER_ICON,
    path: "/Jpg_to_png",
  },
  {
    id: "ghost",
    label: "Ghost (in progress)",
    img: GHOST_ICON,
    path: "/Ghost",
  },
];

export const TABS_WITHOUT_HOMEPAGE = [
  {
    id: "measurements",
    label: "Measurements",
    img: CALCULATOR_ICON,
    path: "/Measurements",
  },
  {
    id: "icon_thumbnail",
    label: "Icon & Thumbnail",
    img: ICON_AND_THUMB_ICON,
    path: "/Icon_&_thumbnail",
  },
  {
    id: "jgpToPng",
    label: "JPG to PNG",
    img: CONVERTER_ICON,
    path: "/Jpg_to_png",
  },
  {
    id: "ghost",
    label: "Ghost (in progress)",
    img: GHOST_ICON,
    path: "/Ghost",
  },
];
