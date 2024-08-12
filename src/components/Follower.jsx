/* eslint-disable react/prop-types */
import {} from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";

const Follower = ({ follower, onRemove }) => {
  const joinDate = format(new Date(follower.join_date * 1000), "MMM dd, yyyy");
  const handleRemove = () => {
    onRemove(follower.uid);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Avatar
            src={follower.image}
            alt={follower.fullname}
            sx={{
              width: "80px",
              height: "80px",
              marginBottom: "16px",
              border: "3px solid #f0f0f0",
            }}
          />
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {follower.fullname}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            @{follower.username}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body2" gutterBottom>
            <strong>Total Twubric:</strong> {follower.twubric.total}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Friends:</strong> {follower.twubric.friends}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Influence:</strong> {follower.twubric.influence}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Chirpiness:</strong> {follower.twubric.chirpiness}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Joined:</strong> {joinDate}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={handleRemove}
          fullWidth
          sx={{
            marginTop: "16px",
          }}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default Follower;
