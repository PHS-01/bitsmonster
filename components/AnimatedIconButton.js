"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { IconButton, Tooltip } from "@mui/material";

const AnimatedIconButton = forwardRef(function AnimatedIconButton(
  {
    children,
    tooltip,
    href,
    rotate = true,
    bordered = true,
    sx = {},
    ...props
  },
  ref,
) {
  const button = (
    <IconButton
      ref={ref}
      color="inherit"
      {...(href ? { component: Link, href } : {})}
      sx={{
        ...(bordered && {
          border: "1px solid",
          borderColor: "divider",
        }),
        transition:
          "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s",
        "&:hover": {
          transform: rotate ? "scale(1.12) rotate(12deg)" : "scale(1.12)",
          backgroundColor: "action.hover",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </IconButton>
  );

  if (!tooltip) return button;

  return (
    <Tooltip title={tooltip} arrow>
      {button}
    </Tooltip>
  );
});

export default AnimatedIconButton;
