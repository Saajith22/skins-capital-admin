"use client";

import { CNav, CNavItem, CNavLink } from "@coreui/react";

export default function Navbar() {
  return (
    <CNav className="p-3 border-b border-gray-500 h-[4.5rem]">
      <CNavItem>
        <CNavLink href="#" active>
          Dashboard
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#" className="text-gray-500">Users</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">Settings</CNavLink>
      </CNavItem>
    </CNav>
  );
}
