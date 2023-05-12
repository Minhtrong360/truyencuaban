import React, { useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import Manage from "../features/status/Manage";
import ChartGeneral from "../features/status/AdminPage";

function AccountPage() {
  const [currentTab, setCurrentTab] = useState("Tăng trưởng");

  const ACCOUNT_TABS = [
    {
      value: "Tăng trưởng",
      icon: <ShowChartIcon sx={{ fontSize: 30, marginTop: 4 }} />,
      component: <ChartGeneral />,
    },
    {
      value: "quản lý",
      icon: <ManageSearchIcon sx={{ fontSize: 30, marginTop: 4 }} />,
      component: <Manage />,
    },
  ];

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ my: 3, fontSize: 30, fontWeight: 800 }}
      >
        ADMIN DASHBOARD
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={tab.value.toUpperCase()}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      <Box sx={{ mb: 3 }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default AccountPage;
