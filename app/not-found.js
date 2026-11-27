"use client";

import Link from "next/link";
import { Box, Typography, Paper, Button } from "@mui/material";
import ExploreOffIcon from "@mui/icons-material/ExploreOff";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ExploreOffIcon sx={{ fontSize: 56, color: "primary.main" }} />

        <Typography variant="h2" fontWeight="bold" color="primary.main">
          404
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          Página Não Encontrada
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Voltar para o Início
        </Button>
      </Paper>
    </Box>
  );
}
