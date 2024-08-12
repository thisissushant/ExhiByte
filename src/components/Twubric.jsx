import { useState, useCallback, useMemo } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Follower from "./Follower";
import useFollowerData from "../hooks/useFollowerData";

const Twubric = () => {
  const { followers, loading, error, setFollowers } = useFollowerData();
  const [sortBy, setSortBy] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSort = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const handleRemove = useCallback(
    (id) => {
      setFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.uid !== id)
      );
    },
    [setFollowers]
  );

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const filteredFollowers = useMemo(() => {
    return followers.filter((follower) => {
      const joinDate = new Date(follower.join_date * 1000);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;

      return (
        (!fromDate || joinDate >= fromDate) && (!toDate || joinDate <= toDate)
      );
    });
  }, [followers, dateRange]);

  const sortedFollowers = useMemo(() => {
    return [...filteredFollowers].sort((a, b) => {
      switch (sortBy) {
        case "friends":
          return b.twubric.friends - a.twubric.friends;
        case "influence":
          return b.twubric.influence - a.twubric.influence;
        case "chirpiness":
          return b.twubric.chirpiness - a.twubric.chirpiness;
        default:
          return 0;
      }
    });
  }, [filteredFollowers, sortBy]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  return (
    <Box
      sx={{ backgroundColor: "#f0f0f0", padding: "24px", minHeight: "100vh" }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Twubric
      </Typography>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <FormControl
            variant="outlined"
            sx={{
              minWidth: 200,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortBy}
              label="Sort by"
              onChange={handleSort}
              sx={{
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.light,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.dark,
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="influence">Influence</MenuItem>
              <MenuItem value="chirpiness">Chirpiness</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <TextField
              label="From Date"
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateRangeChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                width: isMobile ? "100%" : "220px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 0 0 2px rgba(63, 81, 181, 0.2)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(63, 81, 181, 0.4)",
                  },
                },
              }}
            />
            <TextField
              label="To Date"
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateRangeChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                width: isMobile ? "100%" : "220px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 0 0 2px rgba(63, 81, 181, 0.2)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(63, 81, 181, 0.4)",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      {sortedFollowers.length > 0 ? (
        <Grid container spacing={3}>
          {sortedFollowers.map((follower) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={follower.uid}>
              <Follower follower={follower} onRemove={handleRemove} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          No followers found for the selected date range. Try adjusting your
          filters.
        </Alert>
      )}
    </Box>
  );
};

export default Twubric;
