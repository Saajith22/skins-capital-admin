"use client";

import { CAlert, CButton, CFormInput, CProgress } from "@coreui/react";
import { createContext, useEffect, useState } from "react";
import { GoAlertFill, GoCheckCircleFill } from "react-icons/go";

export const MainProviderContext = createContext({
  usersData: [],
  showAlert: () => null,
  getUser: () => null,
});

export default function MainProvider({ children }) {
  const [usersData, setData] = useState([]);
  const [alert, setAlert] = useState({});
  const [visible, setVisible] = useState(false);
  const [logged, setLogged] = useState(null);
  const [load, setLoad] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const refreshData = async () => {
    const fetchedData = await (await fetch(`/api/users`)).json();
    console.log("FETCHED", fetchedData);
    setData(fetchedData);
  };

  const showAlert = (data) => {
    console.log("I RAN BUD?", data);

    setAlert({
      ...alert,
      ...data,
    });

    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  const getUser = () => logged;

  useEffect(() => {
    (async () => {
      const res = await fetch("/");
      if (!res.redirected) return (window.location.href = "/");

      setLoad(20);

      const loggedIn = document.cookie
        .split(";")
        .find((c) => c.startsWith("user"));

      if (loggedIn) {
        setLoad(70);
        setLogged(JSON.parse(decodeURIComponent(loggedIn.split("=")[1])));

        await refreshData();
        setLoad(100);
      } else setLoad(null);
    })();
  }, []);

  return (
    <MainProviderContext.Provider value={{ usersData, showAlert, getUser }}>
      {load !== null && load < 100 ? (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(2,24,47,1) 26%, rgba(29,34,43,1) 87%)",
          }}
        >
          <div>
            <h1 className="text-2xl">Loading...</h1>
            <CProgress value={load} height={5} />
          </div>
        </div>
      ) : load === null ? (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(2,24,47,1) 26%, rgba(29,34,43,1) 87%)",
          }}
        >
          <div className="flex flex-col gap-3 py-2 px-5 w-[40%]">
            <h1>Login</h1>
            <div className="mt-3">
              <h5>Email</h5>
              <CFormInput
                type="email"
                placeholder="Enter your email"
                className="text-black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <h5>Password</h5>
              <CFormInput
                type="password"
                placeholder="Enter your password"
                className="text-black"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CButton
              className="px-5 mt-5"
              color="primary mx-auto"
              onClick={async () => {
                if (password.length < 8)
                  showAlert({
                    message: "Password must be 8 characters long!",
                    color: "danger",
                  });

                const res = await fetch(
                  `/api/login?email=${encodeURIComponent(
                    email
                  )}&password=${encodeURIComponent(password)}`
                );

                const json = await res.json();
                if (json === "OK") {
                  showAlert({
                    message: "Login Successful",
                    color: "success",
                  });

                  setTimeout(() => window.location.reload(), 2000);
                } else
                  showAlert({
                    message: json,
                    color: "danger",
                  });
              }}
            >
              Login
            </CButton>
          </div>
        </div>
      ) : (
        <>
          <>{children}</>
          <CAlert
            className="fixed bottom-20 right-10 flex gap-2 items-center text-normal w-max ms-auto"
            color={alert.color}
            dismissible
            visible={visible}
            onClose={() => setVisible(false)}
            style={{
              paddingInlineEnd: "10% !important",
              zIndex: "10000",
            }}
          >
            {alert.color === "danger" ? (
              <GoAlertFill className="text-lg" />
            ) : (
              <GoCheckCircleFill className="text-lg" />
            )}
            {alert.message}
          </CAlert>
        </>
      )}
    </MainProviderContext.Provider>
  );
}
