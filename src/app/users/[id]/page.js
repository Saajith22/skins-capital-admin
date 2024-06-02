"use client";

import { MainProviderContext } from "@/components/MainProvider";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function User({ params }) {
  const { id } = params;

  const { usersData } = useContext(MainProviderContext);
  const user = usersData.find((u) => u.steam_id === id);

  if (!user) return notFound();

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img
        width={100}
        height={100}
        className="rounded-full border-4 shadow-xl shadow-mid"
        src={`https://avatars.akamai.steamstatic.com/${user.avatar}_full.jpg`}
      />
      <h1>{user.name}</h1>
    </div>
  );
}
