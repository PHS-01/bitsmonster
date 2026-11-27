import { Box, Typography, Paper, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Home
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Pagina inicial em desenvolvimento
        </Typography>
      </Paper>
    </Box>
  );
}
