"use client";

import { useEffect, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { CButton } from "@coreui/react";
import { GoStack } from "react-icons/go";
const jb = JetBrains_Mono({
  weight: "400",
  subsets: ["cyrillic"],
});

const bots = ["76561199677807205", "76561199678309215"];

export default function Inventory() {
  const [inv, setInv] = useState([]);

  useEffect(() => {
    (async () => {
      if (inv.length > 0) return;

      const inventory = [[], []];
      const games = [730, 252490];
      for (const bot of bots) {
        for (const game of games) {
          const invRes = await fetch(
            `/api/inventory?steamID=${bot}&gameID=${game}`
          );

          const items = await invRes.json();
          const parsed = JSON.parse(items);
          const invv = inventory[game === 730 ? 0 : 1];

          if (!parsed) invv.push(null);
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

            invv.push(grouped.flat());
          }
        }
      }

      inventory[0] = inventory[0].flat().filter((e) => e !== null);
      inventory[1] = inventory[1].flat().filter((e) => e !== null);

      console.log("INVENTORY", inventory);
      setInv(inventory);
    })();
  }, []);

  return (
    <>
      <h1 className="text-center mb-5">Our Inventory</h1>
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
                        key={item?.assetid}
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
                          src={`https://community.cloudflare.steamstatic.com/economy/image/${item?.image}`}
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
    </>
  );
}
