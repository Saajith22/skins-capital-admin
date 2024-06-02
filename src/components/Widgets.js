"use client";
import { CCol, CRow, CWidgetStatsA } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { FaArrowUp } from "react-icons/fa";
import { MainProviderContext } from "./MainProvider";
import { useContext } from "react";

function Col({ labels, title, data, amount, color, pointInfo }) {
  return (
    <CCol sm={6}>
      <CWidgetStatsA
        className="mb-4"
        color={color}
        value={
          <div className="flex items-center gap-2">
            {amount}{" "}
            <span className="flex items-center gap-1 fs-6 fw-normal">
              (2% <FaArrowUp />)
            </span>
          </div>
        }
        title={title}
        chart={
          <CChartLine
            className="mt-3 mx-3"
            style={{ height: "100px" }}
            data={{
              labels,
              datasets: [
                {
                  label: pointInfo,
                  borderColor: "rgba(255,255,255,.55)",
                  pointBackgroundColor: "#FFFFFF",
                  data,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  border: {
                    display: false,
                  },
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  min: -20,
                  max: 100,
                  display: false,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 1,
                  tension: 0.4,
                },
                point: {
                  radius: 4,
                  hitRadius: 10,
                  hoverRadius: 4,
                },
              },
            }}
          />
        }
      />
    </CCol>
  );
}

export default function Widgets() {
  const { usersData } = useContext(MainProviderContext);

  const totalMoney = usersData
    .filter((e) =>
      ["76561199678309215", "76561199677807205"].includes(e.steam_id)
    )
    .reduce((prev, curr) => curr.balance + prev, 0);

  return (
    <CRow>
      <Col
        amount={usersData.length}
        color={"primary"}
        title="Total Users"
        pointInfo={"Users Joined"}
        labels={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]}
        data={[...new Array(12)].map(
          (i, n) =>
            usersData?.filter((d) => {
              const month = d.date.split("/")[0];
              return n + 1 === parseInt(month);
            }).length
        )}
      />
      <Col
        amount={`$${totalMoney}`}
        color={"info"}
        title={"Total Money"}
        pointInfo={"Money Earned"}
        labels={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]}
        data={[...new Array(12)].map((i, n) => !i && 0)}
      />
    </CRow>
  );
}
