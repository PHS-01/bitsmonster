"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Typography
      component={Link}
      href={href}
      variant="button"
      sx={{
        display: "inline-block",
        position: "relative",
        textDecoration: "none",
        color: isActive ? "primary.main" : "inherit",
        fontWeight: isActive ? 700 : 500,
        opacity: isActive ? 1 : 0.8,
        px: 1.2,
        py: 0.5,
        transition:
          "color 0.2s ease, opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
          color: "primary.light",
          opacity: 1,
          transform: "scale(1.08)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "2px",
          width: isActive ? "100%" : "0%",
          backgroundColor: "primary.main",
          transition: "width 0.25s ease-in-out, background-color 0.2s ease",
        },
        "&:hover::after": {
          width: "100%",
          backgroundColor: "primary.light",
        },
      }}
    >
      {children}
    </Typography>
  );
}
