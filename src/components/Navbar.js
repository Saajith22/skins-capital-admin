"use client";

import {
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { useContext } from "react";
import { MainProviderContext } from "./MainProvider";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const { getUser } = useContext(MainProviderContext);
  const user = getUser();

  return (
    <CNav
      data-coreui-theme="dark"
      className="p-3 border-b border-gray-600 h-[4.5rem]"
    >
      <CNavItem>
        <CNavLink href="/users" className="text-gray-500">
          Users
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">Settings</CNavLink>
      </CNavItem>
      <CNavItem className="ms-auto">
        <div className="flex items-center gap-2 rounded bg-mid p-2 hover:cursor-pointer">
          <FaUser className="text-xl" />
          {user.name}
        </div>
      </CNavItem>
    </CNav>
  );
}
