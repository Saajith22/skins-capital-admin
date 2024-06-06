"use client";

import { MainProviderContext } from "@/components/MainProvider";
import { CButton } from "@coreui/react";
import { useContext } from "react";

export default function Transactions({ params }) {
  const { id } = params;

  const { usersData } = useContext(MainProviderContext);
  const user = usersData.find((u) => u.steam_id === id);

  return (
    <>
      <h3 className="text-center">
        {user?.name}
        {"'"}s Transactions
      </h3>
      <div className="flex flex-col gap-2 bg-mid py-3 px-2 mt-5 rounded">
        <div className="grid grid-cols-3 gap-5 text-lg mb-2">
          <span className="bg-dark py-2 px-3 rounded shadow">Amount</span>
          <span className="bg-dark py-2 px-3 rounded shadow">Status</span>
        </div>
        {user?.transactions.map((t, i) => (
          <div
            key={i}
            className="grid grid-cols-3 gap-5 bg-dark p-3 rounded items-center"
          >
            <span>$ {t.amount}</span>
            <span
              className={`${
                t.status === "pending" ? "text-red-400" : "text-green-400"
              } font-bold`}
            >
              {t.status.toUpperCase()}
            </span>
            {t.status === "pending" && (
              <CButton color="success" className="w-max ms-auto" size="sm">
                Accept
              </CButton>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
