"use client";

import { MainProviderContext } from "@/components/MainProvider";
import { notFound } from "next/navigation";
import { useContext, useRef, useState } from "react";

import { JetBrains_Mono } from "next/font/google";
import { FaPencilAlt } from "react-icons/fa";
const jb = JetBrains_Mono({
  weight: "400",
  subsets: ["cyrillic"],
});

export default function User({ params }) {
  const { id } = params;

  const { usersData } = useContext(MainProviderContext);
  const user = usersData.find((u) => u.steam_id === id);
  console.log(user);

  const balanceRef = useRef();
  const [balance, setBalance] = useState(user.balance.toFixed(2));

  if (!user) return notFound();
  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="flex gap-3 items-center w-full bg-mid rounded py-3 px-10 shadow-lg">
        <img
          width={125}
          height={125}
          className="rounded-full border-[3.5px] border-dark shadow-xl shadow-mid"
          src={`https://avatars.akamai.steamstatic.com/${user.avatar}_full.jpg`}
        />
        <div className="flex flex-col gap-1">
          <h6>
            Name: <code className={jb.className}>{user.name}</code>
          </h6>
          <h6>
            Steam ID: <code className={jb.className}>{user.steam_id}</code>
          </h6>
          <h6>
            Join Date: <code className={jb.className}>{user.date}</code>
          </h6>
          <h6 className="flex gap-2 items-center">
            Balance:{" "}
            <code className={jb.className}>
              ${" "}
              <input
                ref={balanceRef}
                value={balance}
                onChange={(e) =>
                  setBalance(parseFloat(e.target.value).toFixed(2))
                }
                className="bg-inherit outline-none w-max"
                readOnly={true}
              />
            </code>
            <FaPencilAlt
              className="hover:cursor-pointer"
              onClick={(e) => {
                balanceRef.current.attributes.removeNamedItem("readonly");
                balanceRef.current.focus();
                setBalance("");
              }}
            />
          </h6>
        </div>
      </div>
      <div className="flex gap-3 items-center w-full bg-mid rounded py-3 px-10 shadow-lg"></div>
    </div>
  );
}
