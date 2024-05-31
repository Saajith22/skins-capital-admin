"use client";

import {
  CBadge,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { FaMeteor, FaProductHunt, FaPuzzlePiece } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

export default function Sidebar() {
  return (
    <CSidebar className="border-e border-gray-500">
      <CSidebarHeader className="border-b border-gray-500 h-[4.5rem]">
        <CSidebarBrand>
          <img src="https://skinscapital.vercel.app/logo.png" width={150} />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavItem href="#" className="gap-2">
          <RxDashboard /> Dashboard
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}
