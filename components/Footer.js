"use client";

import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3.5,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <CatchingPokemonIcon color="primary" fontSize="small" />
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.main"
                sx={{ lineHeight: 1.2 }}
              >
                BitsMonster
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Crie monstros personalizados e batalhe na arena.
            </Typography>
          </Box>

          <Tooltip title="Repositório do Projeto">
            <IconButton
              component="a"
              href="https://github.com/PHS-01/bitsmonster"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="inherit"
              aria-label="Repositório no GitHub"
              sx={{
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: { xs: "left", sm: "center" } }}
        >
          © {new Date().getFullYear()} BitsMonster — Projeto Acadêmico
          Full-Stack.
        </Typography>
      </Container>
    </Box>
  );
}
