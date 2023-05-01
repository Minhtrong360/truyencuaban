import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AdminStories from "../story/AdminStories";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CommentIcon from "@mui/icons-material/Comment";
import AdminUser from "./AdminUser";
import AdminComment from "./AdminComment";
function Manage() {
  const [currentTab, setCurrentTab] = useState("truyện");
  const ACCOUNT_TABS = [
    {
      value: "truyện",
      icon: <MenuBookIcon sx={{ fontSize: 30, marginTop: 1 }} />,
      component: <AdminStories />,
    },
    {
      value: "người dùng",
      icon: <PersonIcon sx={{ fontSize: 30, marginTop: 1 }} />,
      component: <AdminUser />,
    },
  ];

  return (
    <Container>
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

      <Box sx={{ mb: 5 }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default Manage;
