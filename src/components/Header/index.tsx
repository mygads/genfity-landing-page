"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { ScrollProgress } from "../ui/scroll-progress";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/components/Cart/CartContext";
import CartSidebar from "../Cart/CartSidebar";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();
  const params = useParams();
  const router = useRouter();
  const currentLocale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale || "en";
  const otherLocale = currentLocale === "en" ? "id" : "en";

  // Fungsi untuk switch bahasa
  const handleLocaleSwitch = (targetLocale) => {
    const segments = usePathName.split("/").filter(Boolean);
    if (segments[0] === "en" || segments[0] === "id") {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik di luar
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }, []);
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, handleClickOutside]);

  const flagSVG = {
    en: (
      // UK flag (Union Jack) - improved and more accurate
      <svg width="20" height="14" viewBox="0 0 60 42" className="inline-block mr-2 align-middle">
        <rect width="60" height="42" fill="#012169"/>
        <g>
          <polygon points="0,0 60,42 60,38 8,0" fill="#FFF"/>
          <polygon points="60,0 0,42 0,38 52,0" fill="#FFF"/>
          <polygon points="0,0 24,16 20,16 0,2" fill="#C8102E"/>
          <polygon points="60,0 36,16 40,16 60,2" fill="#C8102E"/>
          <polygon points="0,42 24,26 20,26 0,40" fill="#C8102E"/>
          <polygon points="60,42 36,26 40,26 60,40" fill="#C8102E"/>
        </g>
        <rect x="25" width="10" height="42" fill="#FFF"/>
        <rect y="16" width="60" height="10" fill="#FFF"/>
        <rect x="27" width="6" height="42" fill="#C8102E"/>
        <rect y="18" width="60" height="6" fill="#C8102E"/>
      </svg>
    ),
    id: (
      <svg width="20" height="14" viewBox="0 0 20 14" className="inline-block mr-2 align-middle"><rect width="20" height="7" fill="#e70011"/><rect y="7" width="20" height="7" fill="#fff"/></svg>
    )
  };

  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <header
        className={`header left-0 top-0 z-30 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-5"
                } `}
              >
                <Image
                  src="/aahrbitx_dark.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
                <Image
                  src="/aahrbitx_light.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.slice(0, 5).map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-primary dark:text-white"
                                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                  href={submenuItem.path}
                                  key={index}
                                  className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* Add Sign In and Sign Up Buttons */}
                  <div className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-700 lg:hidden">
                    <div className="mb-2">
                      <button
                        onClick={() => handleLocaleSwitch(otherLocale)}
                        className="flex items-center w-full px-3 py-2 rounded border text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition"
                      >
                        {flagSVG[otherLocale]}
                        <span className="ml-1 uppercase">{otherLocale}</span>
                      </button>
                    </div>
                    <InteractiveHoverButton
                      className="block w-full px-4 py-2 text-center mt-2"
                      link="/signin"
                      text="Sign In"
                    />
                  </div>
                </nav>
              </div>

              <div className="flex items-center justify-end pr-16 lg:pr-0 gap-2">
                <button
                  className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  aria-label="Cart"
                  onClick={() => setCartOpen(true)}
                >
                  <IoCartOutline    className="w-6 h-6" />
                  {totalQty > 0 && (
                    <span className="absolute -top-1 -right-1 bg-dark text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {totalQty}
                    </span>
                  )}
                </button>
                <InteractiveHoverButton
                  className="hidden md:block"
                  link="/signin"
                  text="Sign In"
                />
                {/* Language Switcher: Desktop only */}
                <div className="relative hidden lg:block" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center px-2 py-2 rounded-xl border border-transparent text-sm font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-stroke-dark dark:hover:text-white transition min-w-[70px]"
                  >
                    {flagSVG[currentLocale]}
                    <span className="ml-1 uppercase">{currentLocale}</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-22 bg-white dark:bg-gray-900 rounded shadow-lg z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
                      {["en", "id"].map((locale) => (
                        <button
                          key={locale}
                          onClick={() => {
                            setDropdownOpen(false);
                            if (locale !== currentLocale) handleLocaleSwitch(locale);
                          }}
                          className={`flex items-center w-full px-3 py-2 text-left hover:bg-primary/10 dark:hover:bg-primary/20 transition ${locale === currentLocale ? "font-bold bg-gray-100 dark:bg-gray-800" : ""}`}
                        >
                          {flagSVG[locale]}
                          <span className="ml-1 uppercase">{locale}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
          <ScrollProgress className="absolute bottom-0" />
        </div>
        <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      </header>
    </>
  );
};

export default Header;
