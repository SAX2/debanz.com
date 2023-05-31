"use client";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, DebanzLogo, SearchIcon, CartIcon, BackIcon, InstagramIcon, FacebookIcon } from "../../../components/Icons";
import { useCartContext } from "../../../context/CartContext";
import Link from "next/link";
import style from "./navbar.module.css";
import Bag from "./Bag";
import Announce from "../announces/Announce";
import Search from "./Search";
import { useUserContext } from "@/app/context/UserContext";

const Dropdown = ({item, setOnMenuOpen}) => {
  const [dropdown, setDropdown] = useState(false)

  return (
    <div>
      <button
        className={style.m_route}
        style={{ justifyContent: "space-between" }}
        onClick={() => setDropdown((menu) => !menu)}
      >
        {item.title.toUpperCase()}
        <div className={dropdown ? style.svgOn : style.svgOff}>
          <BackIcon bg="#000" width={16} height={16} />
        </div>
      </button>
      <div
        className={style.dropDown}
        style={dropdown ? { display: "flex" } : { display: "none" }}
      >
        {item.items.map((i) => {
          return (
            <Link
              key={i.title}
              className={style.m_route}
              href={i.path}
              onClick={() => setOnMenuOpen((menu) => !menu)}
            >
              {i.title.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const Menu = ({ setOnMenuOpen }) => {
  const { user } = useUserContext()

  const routes = [
    {
      path: "/productos",
      title: "Todos los productos",
    },
    {
      path: "/contacto",
      title: "Contacto",
    },
    {
      path: "/envios",
      title: "Envios",
    },
    {
      path: "/devoluciones-cambios",
      title: "Cambios y Devoluciones",
    },
  ];

  const options = [
    {
      path: !user.id ? "/panel/login" : `/panel/${user.id}`,
      title: !user.id ? "Iniciar Sesión" : `Mi cuenta • ${user.first_name} ${user.last_name}`,
    },
  ];

  return (
    <nav className={style.m_container}>
      <div className={style.m_head_container}>
        <div className={style.m_head}>
          <button
            className={style.m_close_button}
            onClick={() => setOnMenuOpen((menu) => !menu)}
          >
            <CloseIcon bg="#000" width={20} heigth={20} />
          </button>
        </div>
        <div className={style.m_body}>
          {routes.map((item) => {
            if (item.isDropdown) {
              return <Dropdown item={item} setOnMenuOpen={setOnMenuOpen} />;
            } else {
              return (
                <Link
                  key={item.title}
                  className={style.m_route}
                  href={item.path}
                  onClick={() => setOnMenuOpen((menu) => !menu)}
                >
                  {item.title.toUpperCase()}
                </Link>
              );
            }
          })}
        </div>
      </div>
      <div className={style.m_bottom_container}>
        <div className={style.m_options}>
          {options.map((item) => {
            return (
              <Link
                key={item.title}
                className={style.m_route}
                href={item.path}
                onClick={() => setOnMenuOpen((menu) => !menu)}
              >
                {item.title.toUpperCase()}
              </Link>
            );
          })}
          <div className={style.social_media}>
            <a href="https://www.instagram.com/debanzba/" target="_blank">
              <InstagramIcon bg="#000" width={25} height={25} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100086655642017" target="_blank">
              <FacebookIcon bg="#000" width={25} height={25} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MenuButton = ({ setOnMenuOpen }) => {
  return (
    <button
      className={style.m_button}
      onClick={() => setOnMenuOpen((open) => !open)}
    >
      <MenuIcon bg="#000" width={30} heigth={18} />
    </button>
  );
};

export default function Navbar() {
  const [onMenuOpen, setOnMenuOpen] = useState(false);
  const [openBag, setOpenBag] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { countOfProducts } = useCartContext();

  const routes = [
    {
      isLink: false,
      type: "search",
      title: "buscar",
      icon: <SearchIcon width={22} higheigth={22} />,
    },
    {
      isLink: false,
      type: "bag",
      title: `BAG (${countOfProducts()})`,
      icon: <CartIcon width={22} heigth={22} />,
    },
  ];

  if (typeof window !== "undefined") {
    if (onMenuOpen || openBag || openSearch) {
      var x = window.scrollX;
      var y = window.scrollY;
      window.onscroll = function () {
        window.scrollTo(x, y);
      };
    } else window.onscroll = null;
  }

  return (
    <header className={style.nav}>
      <div className={style.menu}>
        <div className={onMenuOpen ? style.menu_open : style.menu_closed}>
          <div className={style.menu_container}>
            <Menu setOnMenuOpen={setOnMenuOpen} />
          </div>
          <div
            className="backgorund-modal"
            onClick={() => setOnMenuOpen(false)}
          ></div>
        </div>
      </div>

      <div className={style.menu}>
        <div className={openSearch ? style.menu_open : style.menu_closed}>
          <div className={style.search_container}>
            <Search setOpenSearch={setOpenSearch} />
          </div>
          <div
            className="backgorund-modal"
            onClick={() => setOpenSearch(false)}
          ></div>
        </div>
      </div>

      <div className={style.menu}>
        <div className={openBag ? style.menu_open : style.menu_closed}>
          <div className={style.bag_container}>
            <Bag setOpenBag={setOpenBag} style={style} />
          </div>
          <div
            className="backgorund-modal"
            onClick={() => setOpenBag(false)}
          ></div>
        </div>
      </div>

      <Announce desc="COLLAPSE DROP YA DISPONIBLE" />

      <div className={style.container}>
        <div className={style.left_section}>
          <div className={style.m_button_container}>
            <MenuButton setOnMenuOpen={setOnMenuOpen} />
          </div>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <DebanzLogo width={90} heigth={22} bg="#000" />
          </Link>
        </div>
        <nav className={style.rigth_section}>
          {routes.map((item) => {
            if (item.isLink) {
              return (
                <Link key={item.title} className={style.link} href={item.path}>
                  {item.title.toUpperCase()}
                </Link>
              );
            }
            return (
              <button
                key={item.title}
                className={style.link}
                onClick={() => {
                  if (item.type == "bag")
                    return setOpenBag((openBag) => !openBag);
                  else if (item.type == "search")
                    return setOpenSearch((openSearch) => !openSearch);
                }}
              >
                <span>{item.title.toUpperCase()}</span>
                <div className={style.icon_res}>
                  {item.icon}
                  {item.type == "bag" && <div>{countOfProducts()}</div>}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
