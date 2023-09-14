"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon, DebanzLogo, SearchIcon, CartIcon, BackIcon, InstagramIcon, FacebookIcon, BagIcon } from "../../../components/Icons";
import { useCartContext } from "../../../context/CartContext";
import { useBagContext } from "@/app/context/BagContext";
import Link from "next/link";
import style from "./navbar.module.css";
import Bag from "./Bag";
import Announce from "../announces/Announce";
import Search from "./Search";

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

const Menu = ({ setOnMenuOpen, setStyleClass }) => {

  const routes = [
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

  return (
    <nav className={style.m_container}>
      <div className={style.m_head_container}>
        <div className={style.m_head}>
          <button
            className={style.m_close_button}
            onClick={() => {
              setStyleClass(true)
              setTimeout(() => {
                setStyleClass(false)
                setOnMenuOpen((menu) => !menu)
              }, 400)
            }}
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

const MenuComponent = ({ setOpenFn, setStyleFn, children, openStatus, styleStatus, customStyle, top, mainClass }) => {
  const styleAlias = {
    s_container: `${customStyle}_container`,
    s_off: `${customStyle}_off`,
  };


  return (
    <div className={mainClass?.active ? style.search : style.menu}>
      <div className={openStatus ? style.menu_open : style.menu_closed}>
        <div className={`${styleStatus ? style[styleAlias.s_off] : style[styleAlias.s_container]}`}>
          {children}
        </div>
        <div
          style={top && { top: top }}
          className={`backgorund-modal ${styleStatus ? 'backgorund-modal-close' : ""}`}
          onClick={() => {
            setStyleFn(true);
            setTimeout(() => {
              setStyleFn(false);
              setOpenFn((bag) => !bag);
            }, 400);
          }}
        ></div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [onMenuOpen, setOnMenuOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { openBag, setOpenBag } = useBagContext();
  const { totalQuantity } = useCartContext();

  const routes = [
    {
      isLink: false,
      type: "search",
      title: "buscar",
      icon: <SearchIcon />,
    },
    {
      isLink: false,
      type: "bag",
      icon: <BagIcon />,
      totalQuantity: totalQuantity
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

  const [styleClassBag, setStyleClassBag] = useState(false);
  const [styleClassMenu, setStyleClassMenu] = useState(false);
  const [styleClassSearch, setStyleClassSearch] = useState(false);

  return (
    <>
      <div className={style.nav_models}>
        <MenuComponent
          setStyleFn={setStyleClassMenu}
          setOpenFn={setOnMenuOpen}
          openStatus={onMenuOpen}
          styleStatus={styleClassMenu}
          customStyle={"menu"}
        >
          <Menu
            setOnMenuOpen={setOnMenuOpen}
            setStyleClass={setStyleClassMenu}
          />
        </MenuComponent>

        {openBag && (
          <MenuComponent
            setStyleFn={setStyleClassBag}
            setOpenFn={setOpenBag}
            openStatus={openBag}
            styleStatus={styleClassBag}
            customStyle={"bag"}
          >
            <Bag
              setOpenBag={setOpenBag}
              style={style}
              setStyleClass={setStyleClassBag}
            />
          </MenuComponent>
        )}
      </div>

      <div className={style.zIndex_search}>
        <MenuComponent
          setStyleFn={setStyleClassSearch}
          setOpenFn={setOpenSearch}
          openStatus={openSearch}
          styleStatus={styleClassSearch}
          customStyle={"search"}
          top={86}
          mainClass={{
            active: true,
          }}
        >
          <Search
            setOpenSearch={setOpenSearch}
            setStyleClass={setStyleClassSearch}
          />
        </MenuComponent>
      </div>

      <Announce desc="COLLAPSE DROP 001" top={false} />

      <div className={style.nav}>
        <nav className={style.container}>
          <div className={style.navigation}>
            <div className={style.left_section}>
              <MenuButton setOnMenuOpen={setOnMenuOpen} />
            </div>
            <div className={style.logo}>
              <Link href="/">
                <DebanzLogo width={88.89} heigth={20} bg="#000" />
              </Link>
            </div>
            <div className={style.rigth_section}>
              {routes.map((item) => {
                if (item.isLink) {
                  return (
                    <Link
                      key={item.title}
                      className={style.link}
                      href={item.path}
                    >
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
                      else if (item.type == "search") {
                        setStyleClassSearch(true);
                        setTimeout(() => {
                          setStyleClassSearch(false);
                          setOpenSearch((openSearch) => !openSearch);
                        }, 400);
                      }
                    }}
                  >
                    {item.icon}
                    {item.type == "bag" && item.totalQuantity != 0 && (
                      <div className={style.totalQuantity}>{totalQuantity}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}