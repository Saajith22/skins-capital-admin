"use client";

import {
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from "@coreui/react";
import { FaBoxes, FaGift, FaSplotch } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";

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
          <RiLayoutGridFill/> Dashboard
        </CNavItem>
        <CNavItem href="/inventory" className="gap-2">
          <FaBoxes /> Inventory
        </CNavItem>
        <CNavItem href="/giveaways" className="gap-2">
          <FaSplotch /> Giveaways
        </CNavItem>
        <CNavItem href="/rewards" className="gap-2">
          <FaGift /> Rewards
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}
