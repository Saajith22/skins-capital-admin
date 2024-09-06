"use client";

import { MainProviderContext } from "@/components/MainProvider";
import { CButton, CFormInput } from "@coreui/react";
import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Users() {
  const { usersData, showAlert } = useContext(MainProviderContext);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [filtered, setFiltered] = useState(usersData);

  useEffect(() => {
    const filter = usersData.filter((e) =>
      e.name.toLowerCase().startsWith(search)
    );

    if (filter.length < 1)
      showAlert({
        message: "No Users Found!",
        color: "danger",
      });

    setFiltered(filter);
  }, [search]);

  return (
    <>
      <h1 className="text-center font-bold">Manage Users</h1>
      <div className="flex w-full justify-end">
        <div className="flex items-center gap-2 py-2 ps-2 pe-3 bg-mid rounded">
          <CFormInput
            onChange={(e) => setName(e.target.value)}
            data-coreui-theme="dark"
            placeholder="Enter username.."
          />
          <FaSearch
            onClick={(e) => setSearch(name)}
            className="hover:cursor-pointer text-xl"
          />
        </div>
      </div>

      <span className="text-end">{filtered.length} users found</span>

      <div className="flex flex-col gap-2 mt-3">
        {filtered.map(
          (user) =>
            user.name.length > 0 && (
              <div
                key={user.steam_id}
                className="flex justify-between items-center bg-mid p-3 rounded"
              >
                <div className="flex items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    className="rounded-full"
                    src={`https://avatars.akamai.steamstatic.com/${user.avatar}_full.jpg`}
                  />
                  <h6>{user.name}</h6>
                </div>
                <div className="flex gap-2 mt-1">
                  <CButton href={`/users/${user.steam_id}`} className="bg-dark">
                    Edit
                  </CButton>
                  <CButton color="danger">Ban</CButton>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
