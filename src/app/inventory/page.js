"use client";

import { useEffect, useState } from "react";
import Inv from "@/components/Inventory";

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

      setInv(inventory);
    })();
  }, []);

  return (
    <>
      <h1 className="text-center mb-5">Our Inventory</h1>
      <Inv inventory={inv} />
    </>
  );
}
