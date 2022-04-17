import React, { useState, useContext } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaUserAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { SidebarContext } from "ui/components/helpers/SidebarContext";
import { useTranslation } from "react-i18next";

interface NastedMenu {
  label: string;
  children?: NastedMenu[];
  url: string;
}

interface SidebarProps {
  menu?: NastedMenu[];
}

export const Sidebar: React.FC<SidebarProps> = ({ menu = [] }) => {
  const { t } = useTranslation();
  const sidebar = useContext(SidebarContext);
  let [path, setPath] = useState<number[]>([]);
  let [menuToRender, setMenuToRender] = useState(menu);

  const pushPath = (route: number) => {
    let newPath = path;
    path.push(route);
    setPath(newPath);
    let toRender: any;
    toRender = menu;
    path.forEach((item) => {
      toRender = toRender[item].children;
    });
    setMenuToRender(toRender);
  };

  const resetPath = () => {
    setPath([]);
    setMenuToRender(menu);
  };

  return (
    <>
      <aside
        className={`${
          sidebar?.visible ? "flex" : "hidden"
        } absolute top-0 left-0 z-30 h-full w-72 flex-col overscroll-contain bg-white text-gray-700`}
      >
        <div className="flex w-full items-center justify-between bg-gray-800 p-4 text-white">
          <span className="inline-flex items-center">
            <Link href="/login">
              <a className="flex">
                <FaUserAlt className="mr-2 h-4 w-4" />{" "}
                {t("Hello_Sign_in", "Hello, Sign in")}
              </a>
            </Link>
          </span>
          <div className="flex">
            <button
              id="hideSidebarButton"
              className="px-2 py-1.5"
              onClick={() => sidebar?.toggleVisibility()}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
        {path}
        <ul className="nasted-menu block space-y-6 p-4">
          {path.length > 0 && (
            <li
              className="group flex w-full cursor-pointer items-center justify-between rounded-full p-4 hover:bg-green-100"
              onClick={() => resetPath()}
            >
              <FaChevronLeft className="h-4 w-4" />
              <p className="uppercase group-hover:text-green-400">
                {t("Main_Menu", "Main Menu")}
              </p>
            </li>
          )}

          {menuToRender?.map((item, key: number) => {
            if (item.children) {
              return (
                <li
                  key={key}
                  className="nasted-menu-children group flex w-full cursor-pointer items-center justify-between rounded-full p-4 hover:bg-green-100"
                  onClick={() => pushPath(key)}
                >
                  <p className="group-hover:text-green-400">{item.label}</p>
                  <FaChevronRight className="h-4 w-4" />
                </li>
              );
            } else {
              return (
                <li
                  key={key}
                  className="nasted-menu-children group flex w-full cursor-pointer items-center justify-between rounded-full p-4 hover:bg-green-100"
                >
                  <Link href={item.url}>
                    <p className="group-hover:text-green-400">{item.label}</p>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </aside>
    </>
  );
};
