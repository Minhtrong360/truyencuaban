import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../user/userSlice";
import { Box, Button, Typography } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import ClickableLinkChips from "../../components/form/ClickableLinkChips";
import apiService2 from "../../app/apiService2";

function AdminUser() {
  const { users, isLoading } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ page }));
  }, [dispatch, page, users?.totalPages]);

  const handleDeleteUser = async (userId) => {
    await apiService2.delete(`/users/${userId}`).then(() => {
      dispatch(getAllUsers({ page }));
    });
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatDaysAgo = (date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(
      Math.abs((new Date() - new Date(date)) / oneDay)
    );
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <Box sx={{ position: "relative", height: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {users?.users?.length > 0 ? (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                {users?.users?.map((user) => (
                  <Box
                    key={user.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Name: {user.name}
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      Email: {user.email}
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      Subscription:{" "}
                      {user?.subscription?.isSubscription ? "true" : "false"}
                    </Typography>
                    <Typography variant="subtitle1">
                      Registered on: {formatDate(user.createdAt)} (
                      {formatDaysAgo(user.createdAt)})
                    </Typography>
                    <Button
                      sx={{ marginLeft: "auto" }}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ClickableLinkChips
                  page={page}
                  setPage={setPage}
                  totalPages={users?.totalPages}
                />
              </Box>
            </>
          ) : (
            <Typography variant="h6">No Users</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default AdminUser;
