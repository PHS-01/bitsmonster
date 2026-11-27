"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import NavLink from "@/components/NavLink";
import StatusIndicator from "@/components/StatusIndicator";
import ThemeSelector from "@/components/ThemeSelector";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Monstros", href: "/monsters" },
];

const STATUS_CONFIG = {
  checking: {
    color: "warning",
    label: "API e Banco: Verificando...",
    pulse: true,
  },
  online: {
    color: "success",
    label: "API e Banco: Online",
    pulse: true,
  },
  offline: {
    color: "error",
    label: "API e Banco: Offline (clique para testar novamente)",
    pulse: false,
  },
};

export default function Navbar() {
  const [dbStatus, setDbStatus] = useState("checking");

  const checkConnection = useCallback(async () => {
    setDbStatus("checking");
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("monsters")
        .select("id", { count: "exact", head: true });

      setDbStatus(error ? "offline" : "online");
    } catch {
      setDbStatus("offline");
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const currentStatus = STATUS_CONFIG[dbStatus];

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
          <Box
            onClick={checkConnection}
            sx={{ display: "inline-flex", cursor: "pointer" }}
          >
            <StatusIndicator
              color={currentStatus.color}
              label={currentStatus.label}
              pulse={currentStatus.pulse}
            />
          </Box>
          <ThemeSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
