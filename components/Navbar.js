"use client";

import Link from "next/link";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import NavLink from "@/components/NavLink";
import StatusIndicator from "@/components/StatusIndicator";
import ThemeSelector from "@/components/ThemeSelector";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Monsters", href: "/monsters" },
  { label: "Teams", href: "/teams" },
];

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          px: { xs: 2, sm: 4 },
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          py: { xs: 1, sm: 0 },
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 4 } }}
        >
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "primary.main",
              transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": {
                transform: "scale(1.05)",
                "& .logo-icon": {
                  transform: "rotate(-10deg)",
                },
              },
            }}
          >
            <SmartToyIcon
              className="logo-icon"
              sx={{
                fontSize: 28,
                transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              BitsMonster
            </Typography>
          </Box>

          <Box
            component="nav"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <StatusIndicator color="info" label="API & Database: Offline" pulse />
          <ThemeSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
