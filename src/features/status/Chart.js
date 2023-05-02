import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import apiService2 from "../../app/apiService2";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingScreen";

function ChartGeneral() {
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchChartData = async () => {
      if (user) {
        setIsLoading(true);
        const result = await apiService2.get("/status/admin");

        const data = result.data.data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });

        const chartData = {
          labels: data.map((item) => moment(item.date).format("YYYY-MM-DD")),
          datasets: [
            {
              label: "Number of logins",
              data: data.map((item) => item.login),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              pointRadius: 7,
              tension: 0.1,
            },
            {
              label: "Number of views",
              data: data.map((item) => item.view),
              fill: false,
              borderColor: "rgb(192, 75, 192)",
              pointRadius: 7,
              tension: 0.1,
            },
            {
              label: "Number of new users",
              data: data.map((item) => item.new_users.length),
              fill: false,
              borderColor: "rgb(192, 192, 75)",
              pointRadius: 5, // set point radius to 5
              tension: 0.1,
            },
          ],
        };
        setIsLoading(false);
        setChartData(chartData);
        console.log("data", data);
      }
    };

    fetchChartData();
  }, [user]);

  useEffect(() => {
    if (chartData.datasets) {
      const chart = new Chart("myChart", {
        type: "line",
        data: chartData,
      });
    }
  }, [chartData]);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <canvas id="myChart" width="300" height="250"></canvas>
      )}
    </Container>
  );
}

export default ChartGeneral;
