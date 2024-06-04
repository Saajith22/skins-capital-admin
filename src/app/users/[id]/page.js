"use client";

import { MainProviderContext } from "@/components/MainProvider";
import { useContext, useEffect, useRef, useState } from "react";

import { JetBrains_Mono } from "next/font/google";
import { FaPencilAlt } from "react-icons/fa";
import { CButton } from "@coreui/react";
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
        inventory.push(JSON.parse(items));
      }

      console.log("INVENTORY", inventory);
      setInv(inventory);
    })();
  }, []);

  return user ? (
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
      <div className="flex flex-col gap-5 w-full bg-mid rounded py-3 px-10 shadow-lg">
        {inv.length > 0 ? (
          ["csgo", "rust"].map((game, i) => (
            <div className="flex flex-col gap-2">
              <code className={`${jb.className} text-lg w-max`}>
                {game.toUpperCase()} Items
              </code>
              <div className="grid grid-cols-4 gap-2">
                {inv[i].map((item) => {
                  return (
                    <div
                      key={item.assetid}
                      className="flex flex-col items-center bg-dark p-3 rounded shadow"
                    >
                      <img
                        width={100}
                        height={100}
                        src={`https://community.cloudflare.steamstatic.com/economy/image/${item.image}`}
                      />
                      {item?.name}
                      <CButton className="mt-2" size="sm" color="danger">
                        Remove
                      </CButton>
                    </div>
                  );
                })}
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
