"use client";

import {
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from "@coreui/react";
import { RxDashboard } from "react-icons/rx";

export default function Sidebar() {
  return (
    <CSidebar className="border-e border-gray-700 h-full">
      <CSidebarHeader className="border-b border-gray-700 h-[4.5rem]">
        <CSidebarBrand>
          <img src="https://skinscapital.vercel.app/logo.png" width={150} />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavItem href="/dashboard" className="gap-2">
          <RxDashboard /> Dashboard
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}
