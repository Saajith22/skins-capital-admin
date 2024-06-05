"use client";

import { useEffect, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { CButton } from "@coreui/react";
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
          console.log(items);
          if (items) inventory[game === 730 ? 0 : 1].push(JSON.parse(items));
        }
      }

      inventory[0] = inventory[0].flat();
      inventory[1] = inventory[1].flat();

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
    </>
  );
}
