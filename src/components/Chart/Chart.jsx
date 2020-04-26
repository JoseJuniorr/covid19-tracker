import React, { useState, useEffect } from "react";

import { fecthDailyData } from "../../services/api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailyData = await fecthDailyData();
      setDailyData(initialDailyData);
    };
    fetchAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Confirmados", "Recuperados", "Casos fatais"],
        datasets: [
          {
            label: "Pessoas",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255,0, 0.5)",
              "black",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `
          Estado atual em ${country}`,
        },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Confirmados",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Mortes",
            backgroundColor: "red",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  console.log(confirmed, recovered, deaths);

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
