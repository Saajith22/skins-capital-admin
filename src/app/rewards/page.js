"use client";

import Inventory from "@/components/Inventory";
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const bots = ["76561199677807205", "76561199678309215"];
const positions = ["2ⁿᵈ", "1ˢᵗ", "3ʳᵈ"];

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [inv, setInv] = useState([]);

  const [visible, setVisible] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/personal");
      const data = await res.json();

      setRewards(Object.values(data.rewards));

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

      console.log(inventory);

      setInv(inventory);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h1>Rewards</h1>
      <div className="grid grid-cols-2 gap-3 w-full mt-10">
        {rewards.length > 0 ? (
          ["Weekly", "Monthly"].map((v, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-3 justify-center items-center text-black py-6 rounded"
                style={{
                  background:
                    i === 0
                      ? `linear-gradient(90deg, hsla(260, 28%, 53%, 1) 0%, hsla(170, 42%, 71%, 1) 100%)`
                      : `linear-gradient(90deg, hsla(302, 82%, 76%, 1) 0%, hsla(258, 40%, 68%, 1) 100%)`,
                }}
              >
                <h2 className="text-2xl font-bold">{v} Rewards</h2>
                <div className="flex gap-2 mb-2">
                  {rewards[i].map((r, j) => (
                    <div key={j} className={`${j !== 1 && "mt-3"} text-center`}>
                      <span className="text-lg">{positions[j]}</span>
                      <div
                        key={j}
                        className="w-[100px] h-[100px] flex items-center rounded bg-[#1d1d1d45] shadow-lg hover:bg-[#1d1d1d55] hover:cursor-pointer transition-all"
                        onClick={async (e) => {
                          setVisible(`${i}-${j}`);
                        }}
                      >
                        <img
                          className="p-1"
                          src={
                            r.startsWith("https")
                              ? r
                              : "https://www.svgrepo.com/show/505250/plus.svg"
                          }
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <>Loading...</>
        )}
      </div>
      <CModal
        visible={visible !== 0}
        onClose={() => setVisible(0)}
        data-coreui-theme="dark"
        size="xl"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Set Reward</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="flex w-full justify-end mb-3">
            <div className="flex items-center gap-2 py-2 ps-2 pe-3 bg-mid rounded">
              <CFormInput
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                data-coreui-theme="dark"
                placeholder="Enter name of a skin.."
              />
              <FaSearch className="text-xl" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 bg-mid rounded p-2 overflow-y-scroll">
            {inv.length > 0 ? (
              inv.map((items) =>
                items
                  .filter(
                    (e) =>
                      e.name.toLowerCase().startsWith(search) ||
                      e.name.toLowerCase().includes(search)
                  )
                  .map((item, i) => {
                    const size = item.appid === 730 ? 90 : 70;
                    const url = `https://community.cloudflare.steamstatic.com/economy/image/${item.image}`;

                    return (
                      <div
                        key={i}
                        onClick={async () => {
                          const [type, pos] = visible.split("-");
                          rewards[type][pos] = url;
                          setVisible(0);
                        }}
                        className="flex flex-col gap-2 items-center justify-center p-2 bg-[#1d1d1d52] rounded text-center hover:cursor-pointer hover:bg-[#1d1d1d72] transition-all shadow"
                      >
                        <img width={size} height={size} src={url} />
                        <p className="text-normal">
                          {item.name.slice(0, 18)}
                          {item.name.length > 18 && "..."}
                        </p>
                      </div>
                    );
                  })
              )
            ) : (
              <>Loading...</>
            )}
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
}
