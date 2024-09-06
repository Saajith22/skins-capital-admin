"use client";

import { MainProviderContext } from "@/components/MainProvider";
import Widgets from "@/components/Widgets";
import { useContext } from "react";

export default function Home() {
  const { usersData } = useContext(MainProviderContext);

  return (
    <>
      <h1 className="text-center font-bold mb-5">Welcome to Dashboard</h1>
      <Widgets />
    </>
  );
}
