"use client";

import { Box, Tooltip } from "@mui/material";
import { keyframes } from "@mui/system";

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.75;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

const COLOR_MAP = {
  success: "success.main",
  warning: "warning.main",
  error: "error.main",
  info: "info.main",
  disabled: "text.disabled",
};

export default function StatusIndicator({
  color = "success",
  label,
  pulse = false,
  size = 10,
}) {
  const resolvedColor = COLOR_MAP[color] || color;

  const indicator = (
    <Box
      role="status"
      aria-label={label || `Status: ${color}`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        cursor: "default",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: resolvedColor,
          transition: "background-color 0.3s ease",
          ...(pulse && {
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "inherit",
              animation: `${ripple} 1.8s infinite ease-out`,
            },
          }),
        }}
      />
    </Box>
  );

  if (!label) return indicator;

  return (
    <Tooltip title={label} arrow>
      {indicator}
    </Tooltip>
  );
}
