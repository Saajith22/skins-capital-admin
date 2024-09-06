import { CButton } from "@coreui/react";
import { GoStack } from "react-icons/go";
import Loading from "@/components/Loading";
import { JetBrains_Mono } from "next/font/google";

const jb = JetBrains_Mono({
  weight: "400",
  subsets: ["cyrillic"],
});

export default function Inventory({ inventory }) {
  return (
    <div className="flex flex-col gap-5 w-full bg-mid rounded py-3 px-10 shadow-lg">
      {inventory.length > 0 ? (
        ["csgo", "rust"].map((game, i) => (
          <div key={i} className="flex flex-col gap-2">
            <code className={`${jb.className} text-lg w-max`}>
              {game.toUpperCase()} Items
            </code>
            <div className="grid grid-cols-5 gap-2">
              {inventory[i] ? (
                inventory[i].map((item) => {
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
        <Loading />
      )}
    </div>
  );
}
