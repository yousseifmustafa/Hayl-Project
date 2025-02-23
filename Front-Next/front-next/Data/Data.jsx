const cup =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881185/Cup_z2om06.jpg";
const straws =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881197/straws_umy89k.jpg";
const plates =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881189/Plates_kmtd50.jpg";
const Rolls =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881195/Rolls_fbt0l7.jpg";
const printedItems =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881190/PrintedItems_ey2wp1.jpg";
const dividers =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881186/Dividers_xvmhx9.jpg";
const napkins =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881190/n_nwdlsy.jpg";
const pizzaBoxes =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881193/pizzaboxes_gjzall.jpg";
const bags =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881184/bags_p8lgds.jpg";
const food_containers =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881187/Food_containers_hi5hm2.jpg";
const fork_spoons =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881185/Fork_spoons_ljnz0v.jpg";
const bottle =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881184/bottle_n1myng.jpg";
const sugarpackage =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881194/sugarpackage_geeckd.jpg";

const logo =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738880266/Logo_n4drwz.png";

import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
const image1 =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881185/Cup_z2om06.jpg";

const Categories = [
  "Cups",
  "Straws",
  "Forks & Spoons",
  "Food Containers",
  "Dividers",
  "Plates",
  "Printed Items",
  "Rolls",
  "Bags",
  "Pizza Boxes",
  "Bottles",
  "Sugar Packages",
  "Plates",
];



const slides = [
  { id: 1, name: "cups & sleeves", image: cup, link: "" },
  { id: 2, name: "straws", image: straws, link: "" },
  { id: 3, name: "spoons & forks", image: fork_spoons, link: "" },
  { id: 4, name: "Food containers", image: food_containers, link: "" },
  { id: 5, name: "Dividers", image: dividers, link: "" },
  { id: 6, name: "Plates", image: plates, link: "" },
  { id: 7, name: "Printed items", image: printedItems, link: "" },
  { id: 8, name: "Rolls", image: Rolls, link: "" },
  { id: 9, name: "Bags", image: bags, link: "" },
  { id: 10, name: "Boxes", image: pizzaBoxes, link: "" },
  { id: 11, name: "Bottles & Jugs", image: bottle, link: "" },
  { id: 12, name: "sugar portions", image: sugarpackage, link: "" },
];

const socialLinks = [
  { icon: faPhone, link: "tel:+201005013303", text: "+201005013303" },

  {
    icon: faLocationDot,
    link: "mailto:Sales@alhayl.com",
    text: "Sales@alhayl.com",
    url: "https://maps.app.goo.gl/FH4JQbNSyDadDTK2A",
    color: "white",
  },
  {
    icon: faEnvelope,
    link: "mailto:Sales@alhayl.com",
    text: "Sales@alhayl.com",
    url: "https://www.facebook.com/hayl.trading?_rdc=1&_rdr#",
    color: "white",
  },

  {
    icon: faFacebook,
    link: "https://www.facebook.com/hayl.trading?_rdc=1&_rdr#",
    text: "Elhayl Facebook",
    color: "text-blue-600",
    url: "https://www.facebook.com/hayl.trading?_rdc=1&_rdr#",
  },
  {
    icon: faWhatsapp,
    link: "https://api.whatsapp.com/send?phone=201005013303",
    text: "Elhayl Whatsapp",
    color: "text-green-500",
    url: "https://api.whatsapp.com/send?phone=https://wa.me/20%201005013303",
  },
  {
    icon: faInstagram,
    link: "https://www.instagram.com/hayltrading?igsh=MXM5MXowbWhlZ3UzdQ==",
    text: "Elhayl Instagram",
    color: "text-red-500",
    url: "https://www.instagram.com/hayltrading?igsh=MXM5MXowbWhlZ3UzdQ==",
  },
];

const filterOptions = [
  {
    key: "category",
    label: "Category",
    options: [
      "Cups",
      "Straws",
      "Forks & Spoons",
      "Food Containers",
      "Dividers",
      "Plates",
      "Printed Items",
      "Rolls",
      "Bags",
      "Pizza Boxes",
      "Bottles",
      "Sugar Packages",
    ],
  },
];

const FooterLinks = [
  {
    title: "Company",
    links: [
      { name: "About us", path: "/" },
      { name: "Contact us", path: "/contact" },
      {
        name: "Our Location",
        path: "https://maps.app.goo.gl/WFvr9Bes7AcFKPcS9",
        external: true,
      },
      { name: "Our Customers", path: "/" },
    ],
  },
  {
    title: "SHOP WITH US",
    links: [
      { name: "Paper & Plastic Cups", path: "/shop?category=Cups" },
      { name: "Cutlery & Straws", path: "/shop?category=Straws" },
      {
        name: "Plastic Food Containers",
        path: "/shop?category=Food%20Containers",
      },
      { name: "Foil Containers", path: "/shop?category=Dividers" },
      { name: "Bags & Packaging", path: "/shop?category=Bags" },
      {
        name: "Cardboard Containers & Packaging",
        path: "/shop?category=Pizza%20Boxes",
      },
      { name: "Paper Napkins & Tissues", path: "/shop?category=Plates" },
      {
        name: "Juice Bottles & Sugar Portion Packs",
        path: "/shop?category=Bottles",
      },
    ],
  },
];

const DropdownCom = [
  {
    title: "COMPANY",
    items: [
      { Name: "About us", Link: "" },
      { Name: "Our Customers", Link: "" },
      {
        Name: "Our Location",
        Link: "https://maps.app.goo.gl/WFvr9Bes7AcFKPcS9",
      },
    ],
  },
  {
    title: "SHOP WITH US",
    items: [
      { Name: "Paper & Plastic Cups", Link: "/Paper_Plastic_Cups" },
      { Name: "Cutlery & Straws", Link: "/Cutlery_Straws" },
      {
        Name: "Plastic Food Containers",
        Link: "/Plastic_Food_Containers",
      },
      { Name: "Foil Containers", Link: "/Foil_Containers" },
      { Name: "Bags & Packaging", Link: "/Bags_Packaging" },
      { Name: "Cardboard Containers", Link: "Cardboard_Containers" },
      { Name: "Paper Napkins & Tissues", Link: "Paper_Napkins_Tissues" },
      {
        Name: "Juice Bottles & Sugar Packs",
        Link: "juice_Bottles_Sugar_Packs",
      },
    ],
  },
];

const Navslides = [
  { id: 1, title: "About us", link: "/about" },
  { id: 2, title: "SHOP NOW", link: "/Shop" },
  { id: 3, title: "Our Location", link: "/location" },
  { id: 4, title: "Our Customers", link: "/customers" },
  { id: 1, title: "About us", link: "/about" },
  { id: 2, title: "SHOP NOW", link: "/Shop" },
  { id: 5, title: "ContactUs", link: "/Contact" },
  { id: 4, title: "Our Customers", link: "/customers" },
];

const contactNumbers = ["+201141000024", "+201005013303"];

const usersData = [
  {
    id: "#U1001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "#U1002",
    name: "Emily Smith",
    email: "emily.smith@example.com",
    role: "User",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: "#U1003",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    role: "User",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "#U1004",
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    role: "Moderator",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    id: "#U1005",
    name: "Daniel Martinez",
    email: "daniel.martinez@example.com",
    role: "User",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
];

export {
  socialLinks,
  slides,
  products,
  filterOptions,
  contactNumbers,
  DropdownCom,
  FooterLinks,
  Categories,
  Navslides,
  usersData,
  logo,
};
