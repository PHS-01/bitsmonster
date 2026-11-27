import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        gap: 3,
      }}
    >
      <CircularProgress color="primary" size={76} thickness={4.5} />
      <Typography variant="h5" color="text.secondary" fontWeight={700}>
        Loading...
      </Typography>
    </Box>
  );
}
