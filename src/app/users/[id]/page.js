"use client";

import { MainProviderContext } from "@/components/MainProvider";
import { useContext, useEffect, useRef, useState } from "react";

import { JetBrains_Mono } from "next/font/google";
import { FaPencilAlt } from "react-icons/fa";
import {
  MdCalendarMonth,
  MdFreeBreakfast,
  MdKey,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { IoMdCard } from "react-icons/io";

import { CButton } from "@coreui/react";
import { GoStack } from "react-icons/go";
const jb = JetBrains_Mono({
  weight: "400",
  subsets: ["cyrillic"],
});

export default function User({ params }) {
  const { id } = params;

  const { usersData } = useContext(MainProviderContext);
  const user = usersData.find((u) => u.steam_id === id);

  const balanceRef = useRef();
  const [balance, setBalance] = useState(user?.balance?.toFixed(2));

  const affiliateRef = useRef();
  const [affiliate, setAffiliate] = useState(user?.code);

  const [inv, setInv] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user || inv.length > 0) return;

      const inventory = [];
      const games = [730, 252490];
      for (const game of games) {
        const invRes = await fetch(
          `/api/inventory?steamID=${user.steam_id}&gameID=${game}`
        );

        const items = await invRes.json();
        const parsed = JSON.parse(items);
        if (!parsed) inventory.push(null);
        else {
          const grouped = [];
          for (const parse of parsed) {
            if (grouped.find((e) => e.name === parse.name)) continue;

            const fil = parsed.filter((e) => e?.name === parse?.name).length;
            grouped.push({
              ...parse,
              count: fil,
            });
          }

          inventory.push(grouped);
        }
      }

      setInv(inventory);
    })();
  }, []);

  return user ? (
    <div className="flex flex-col gap-4 px-10">
      <div className="flex gap-4 items-center w-full bg-mid rounded py-3 px-10 shadow-lg">
        <img
          width={125}
          height={125}
          className="rounded-full border-[3.5px] border-dark shadow-xl shadow-mid"
          src={`https://avatars.akamai.steamstatic.com/${user.avatar}_full.jpg`}
        />
        <div className="flex flex-col gap-1">
          <h6 className="flex gap-2 items-center">
            <MdOutlineDriveFileRenameOutline className="text-xl" />
            Name: <code className={jb.className}>{user.name}</code>
          </h6>
          <h6 className="flex gap-2 items-center">
            <MdKey className="text-xl" />
            Steam ID: <code className={jb.className}>{user.steam_id}</code>
          </h6>
          <h6 className="flex gap-2 items-center">
            <MdCalendarMonth className="text-xl" />
            Join Date: <code className={jb.className}>{user.date}</code>
          </h6>
          <h6 className="flex gap-2 items-center">
            <MdFreeBreakfast className="text-xl" />
            Affiliate Code:{" "}
            <code className={jb.className}>
              <input
                ref={affiliateRef}
                value={affiliate}
                onChange={(e) => setAffiliate(e.target.value)}
                className="bg-inherit outline-none w-max"
                readOnly={true}
              />
            </code>
            <FaPencilAlt
              className="hover:cursor-pointer"
              onClick={(e) => {
                affiliateRef.current.attributes.removeNamedItem("readonly");
                affiliateRef.current.focus();
                setAffiliate("");
              }}
            />
          </h6>
          <h6 className="flex gap-2 items-center">
            <IoMdCard className="text-xl" />
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
        <div className="ms-auto mb-auto flex">
          <CButton href={`/users/${id}/transactions`} color="dark">
            Transactions
          </CButton>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full bg-mid rounded py-3 px-10 shadow-lg">
        {inv.length > 0 ? (
          ["csgo", "rust"].map((game, i) => (
            <div key={i} className="flex flex-col gap-2">
              <code className={`${jb.className} text-lg w-max`}>
                {game.toUpperCase()} Items
              </code>
              <div className="grid grid-cols-5 gap-2">
                {inv[i] ? (
                  inv[i].map((item) => {
                    return (
                      <div
                        key={item.assetid}
                        className="relative flex flex-col items-center bg-dark p-3 gap-1 rounded shadow"
                      >
                        <h6
                          className={`${jb.className} flex gap-1 items-center text-xs absolute top-2 right-3`}
                        >
                          <GoStack className="text-[16px]" />
                          {item?.count}
                        </h6>
                        <img
                          width={90}
                          height={90}
                          src={`https://community.cloudflare.steamstatic.com/economy/image/${item.image}`}
                        />
                        {item?.name?.slice(0, 20)}
                        {item?.name?.length > 20 && "..."}
                        <CButton className="mt-2" size="sm" color="danger">
                          Remove
                        </CButton>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <h5>No items found.</h5>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <h6 className="text-center">Loading...</h6>
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1>Unknown User</h1>
  );
}
