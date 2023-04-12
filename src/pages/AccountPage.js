import React, { useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShareIcon from "@mui/icons-material/Share";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AccountGeneral from "../features/user/AccountGeneral";
import AccountSocialLinks from "../features/user/AccountSocialLinks";
import StoriesListOfUser from "../features/story/StoriesListOfUser";

import LovedStoriesListOfUser from "../features/story/LovedStoriesListOfUser";

function AccountPage() {
  const [currentTab, setCurrentTab] = useState("giới thiệu");

  const ACCOUNT_TABS = [
    {
      value: "giới thiệu",
      icon: <AccountBoxIcon sx={{ fontSize: 30, marginTop: 4 }} />,
      component: <AccountGeneral />,
    },
    {
      value: "liên kết",
      icon: <ShareIcon sx={{ fontSize: 30, marginTop: 4 }} />,
      component: <AccountSocialLinks profile={{}} />,
    },
    {
      value: "truyện của bạn",
      icon: <MenuBookIcon sx={{ fontSize: 30, marginTop: 4 }} />,
      component: <StoriesListOfUser />,
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ my: 3 }}>
        Tài Khoản
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

      <Box sx={{ mb: 5 }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default AccountPage;
