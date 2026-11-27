"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppTheme } from "@/components/ThemeRegistry";

const BINARY_PARTICLES = [
  { char: "0", left: "3%", duration: "9s", delay: "0s", size: "1.15rem" },
  { char: "1", left: "8%", duration: "11s", delay: "-3s", size: "0.95rem" },
  { char: "1", left: "13%", duration: "8.5s", delay: "-6s", size: "1.25rem" },
  { char: "0", left: "18%", duration: "10s", delay: "-1.5s", size: "1.05rem" },
  { char: "0", left: "23%", duration: "12s", delay: "-8s", size: "1.2rem" },
  { char: "1", left: "28%", duration: "9.5s", delay: "-4s", size: "0.9rem" },
  { char: "0", left: "34%", duration: "11.5s", delay: "-9.5s", size: "1.3rem" },
  { char: "1", left: "39%", duration: "8.8s", delay: "-2.5s", size: "1rem" },
  { char: "0", left: "44%", duration: "10.5s", delay: "-7s", size: "1.15rem" },
  { char: "1", left: "49%", duration: "9.2s", delay: "-5s", size: "1.1rem" },
  { char: "0", left: "54%", duration: "12.5s", delay: "-1s", size: "1.25rem" },
  { char: "1", left: "59%", duration: "8.2s", delay: "-6.5s", size: "0.95rem" },
  { char: "0", left: "64%", duration: "10.8s", delay: "-3.5s", size: "1.2rem" },
  { char: "1", left: "69%", duration: "9.6s", delay: "-8.5s", size: "1rem" },
  { char: "0", left: "74%", duration: "11.2s", delay: "-2s", size: "1.15rem" },
  { char: "1", left: "79%", duration: "8.6s", delay: "-5.5s", size: "1.3rem" },
  { char: "0", left: "84%", duration: "10.2s", delay: "-9s", size: "0.95rem" },
  { char: "1", left: "89%", duration: "9.4s", delay: "-4.5s", size: "1.1rem" },
  { char: "0", left: "93%", duration: "11.8s", delay: "-7.5s", size: "1.2rem" },
  { char: "1", left: "97%", duration: "8.9s", delay: "-1.2s", size: "1rem" },
];

const PIXEL_BLOCKS = [
  { left: "5%", top: "14%", size: 10, duration: "4.5s", delay: "0s" },
  { left: "11%", top: "52%", size: 26, duration: "6.5s", delay: "-2s" },
  { left: "17%", top: "82%", size: 14, duration: "5s", delay: "-3.5s" },
  { left: "22%", top: "28%", size: 32, duration: "7.5s", delay: "-1s" },
  { left: "29%", top: "66%", size: 12, duration: "4.8s", delay: "-4s" },
  { left: "35%", top: "16%", size: 20, duration: "6s", delay: "-2.5s" },
  { left: "41%", top: "76%", size: 28, duration: "7s", delay: "-5s" },
  { left: "47%", top: "40%", size: 8, duration: "4.2s", delay: "-1.5s" },
  { left: "53%", top: "18%", size: 24, duration: "6.2s", delay: "-3s" },
  { left: "58%", top: "62%", size: 34, duration: "8s", delay: "-4.5s" },
  { left: "64%", top: "32%", size: 12, duration: "5.2s", delay: "-0.8s" },
  { left: "70%", top: "84%", size: 18, duration: "6.8s", delay: "-2.8s" },
  { left: "75%", top: "22%", size: 28, duration: "7.2s", delay: "-5.5s" },
  { left: "81%", top: "56%", size: 10, duration: "4.6s", delay: "-1.8s" },
  { left: "86%", top: "74%", size: 22, duration: "6.4s", delay: "-3.2s" },
  { left: "91%", top: "16%", size: 16, duration: "5.4s", delay: "-4.2s" },
  { left: "95%", top: "44%", size: 30, duration: "7.6s", delay: "-2.2s" },
];

const VAPORWAVE_STARS = [
  {
    left: "6%",
    top: "10%",
    size: 3,
    color: "#ffffff",
    duration: "2.4s",
    delay: "0s",
  },
  {
    left: "12%",
    top: "24%",
    size: 4,
    color: "#05d9e8",
    duration: "3.2s",
    delay: "-1.1s",
  },
  {
    left: "18%",
    top: "14%",
    size: 2,
    color: "#ff2a85",
    duration: "2.1s",
    delay: "-0.5s",
  },
  {
    left: "24%",
    top: "34%",
    size: 3,
    color: "#ffffff",
    duration: "3.8s",
    delay: "-2.2s",
  },
  {
    left: "30%",
    top: "12%",
    size: 4,
    color: "#05d9e8",
    duration: "2.9s",
    delay: "-1.7s",
  },
  {
    left: "35%",
    top: "26%",
    size: 2,
    color: "#ffffff",
    duration: "2.5s",
    delay: "-0.8s",
  },
  {
    left: "41%",
    top: "8%",
    size: 3,
    color: "#ff2a85",
    duration: "3.5s",
    delay: "-2.6s",
  },
  {
    left: "58%",
    top: "9%",
    size: 3,
    color: "#05d9e8",
    duration: "2.7s",
    delay: "-1.3s",
  },
  {
    left: "64%",
    top: "22%",
    size: 4,
    color: "#ffffff",
    duration: "3.4s",
    delay: "-0.4s",
  },
  {
    left: "69%",
    top: "13%",
    size: 2,
    color: "#ff2a85",
    duration: "2.2s",
    delay: "-1.9s",
  },
  {
    left: "75%",
    top: "30%",
    size: 3,
    color: "#05d9e8",
    duration: "3.9s",
    delay: "-2.8s",
  },
  {
    left: "81%",
    top: "11%",
    size: 4,
    color: "#ffffff",
    duration: "2.6s",
    delay: "-0.9s",
  },
  {
    left: "87%",
    top: "25%",
    size: 3,
    color: "#ff2a85",
    duration: "3.1s",
    delay: "-1.5s",
  },
  {
    left: "92%",
    top: "15%",
    size: 2,
    color: "#05d9e8",
    duration: "2.3s",
    delay: "-2.1s",
  },
  {
    left: "15%",
    top: "44%",
    size: 3,
    color: "#05d9e8",
    duration: "3.6s",
    delay: "-1.4s",
  },
  {
    left: "84%",
    top: "42%",
    size: 3,
    color: "#ff2a85",
    duration: "3.3s",
    delay: "-0.7s",
  },
];

function PalmTreeSVG({ flip = false }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 200 260"
      sx={{
        height: { xs: "48vh", sm: "58vh", md: "66vh" },
        width: "auto",
        display: "block",
        transform: flip ? "scaleX(-1)" : "none",
        transformOrigin: "bottom center",
        animation: "palmSway 6s ease-in-out infinite",
        "@keyframes palmSway": {
          "0%, 100%": { transform: `${flip ? "scaleX(-1)" : ""} rotate(0deg)` },
          "50%": { transform: `${flip ? "scaleX(-1)" : ""} rotate(2.5deg)` },
        },
      }}
    >
      <path
        d="M92 260 Q98 170 112 95 L122 97 Q110 170 108 260 Z"
        fill="currentColor"
      />
      <path
        d="M116 96 C85 68, 45 75, 22 98 C50 86, 82 88, 112 102 Z"
        fill="currentColor"
      />
      <path
        d="M116 95 C95 52, 60 40, 32 52 C62 52, 90 66, 114 98 Z"
        fill="currentColor"
      />
      <path
        d="M118 94 C115 48, 95 24, 72 20 C94 34, 108 58, 116 96 Z"
        fill="currentColor"
      />
      <path
        d="M119 95 C140 52, 172 42, 195 56 C168 54, 142 68, 120 98 Z"
        fill="currentColor"
      />
      <path
        d="M120 97 C152 72, 182 82, 198 106 C174 92, 146 90, 121 103 Z"
        fill="currentColor"
      />
    </Box>
  );
}

export default function ThemeBackground() {
  const { themeName } = useAppTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isStandard = themeName === "light" || themeName === "dark";
  const isGameBoy = themeName === "gameboy" || themeName === "gameboyDark";
  const isNeon = themeName === "neon";

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        "@media (prefers-reduced-motion: reduce)": {
          "& *": {
            animation: "none !important",
          },
        },
      }}
    >
      {isStandard &&
        BINARY_PARTICLES.map((bit, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: bit.left,
              bottom: "-10%",
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: bit.size,
              color: "primary.main",
              opacity: 0,
              userSelect: "none",
              animation: `floatBits ${bit.duration} linear ${bit.delay} infinite`,
              "@keyframes floatBits": {
                "0%": {
                  transform: "translateY(0vh)",
                  opacity: 0,
                },
                "12%": {
                  opacity: themeName === "dark" ? 0.34 : 0.25,
                },
                "88%": {
                  opacity: themeName === "dark" ? 0.34 : 0.25,
                },
                "100%": {
                  transform: "translateY(-115vh)",
                  opacity: 0,
                },
              },
            }}
          >
            {bit.char}
          </Box>
        ))}

      {isGameBoy &&
        PIXEL_BLOCKS.map((px, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: px.left,
              top: px.top,
              width: px.size,
              height: px.size,
              bgcolor: "primary.main",
              opacity: 0.16,
              boxShadow: (theme) =>
                `${Math.max(2, Math.round(px.size / 4))}px ${Math.max(
                  2,
                  Math.round(px.size / 4),
                )}px 0px ${theme.palette.primary.dark}`,
              animation: `pixelFloat ${px.duration} steps(4) ${px.delay} infinite`,
              "@keyframes pixelFloat": {
                "0%, 100%": {
                  transform: "translateY(0px)",
                  opacity: 0.12,
                },
                "50%": {
                  transform: "translateY(-20px)",
                  opacity: 0.28,
                },
              },
            }}
          />
        ))}

      {isNeon && (
        <>
          {VAPORWAVE_STARS.map((star, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                borderRadius: "50%",
                bgcolor: star.color,
                boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
                animation: `starTwinkle ${star.duration} ease-in-out ${star.delay} infinite`,
                "@keyframes starTwinkle": {
                  "0%, 100%": {
                    opacity: 0.05,
                    transform: "scale(0.8)",
                  },
                  "50%": {
                    opacity: 0.9,
                    transform: "scale(1.25)",
                  },
                },
              }}
            />
          ))}

          <Box
            sx={{
              position: "absolute",
              top: { xs: "14%", md: "11%" },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: 250, sm: 340, md: 420 },
              height: { xs: 250, sm: 340, md: 420 },
              borderRadius: "50%",
              opacity: 0.34,
              background:
                "linear-gradient(180deg, #ff2a85 0%, #ff7b00 55%, #ffe600 100%)",
              boxShadow: "0 0 70px rgba(255, 42, 133, 0.5)",
              WebkitMaskImage:
                "repeating-linear-gradient(to bottom, #000 0px, #000 14px, transparent 14px, transparent 20px)",
              maskImage:
                "repeating-linear-gradient(to bottom, #000 0px, #000 14px, transparent 14px, transparent 20px)",
              WebkitMaskSize: "100% 20px",
              maskSize: "100% 20px",
              animation: "sunStripesDown 1.4s linear infinite",
              "@keyframes sunStripesDown": {
                "0%": {
                  WebkitMaskPosition: "0px 0px",
                  maskPosition: "0px 0px",
                },
                "100%": {
                  WebkitMaskPosition: "0px 20px",
                  maskPosition: "0px 20px",
                },
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: -14,
              left: { xs: -45, sm: -20, md: 0 },
              color: "#05d9e8",
              opacity: 0.34,
            }}
          >
            <PalmTreeSVG />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: -14,
              right: { xs: -45, sm: -20, md: 0 },
              color: "#ff2a85",
              opacity: 0.34,
            }}
          >
            <PalmTreeSVG flip />
          </Box>

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0) 2px, rgba(5, 217, 232, 0.06) 3px, rgba(0, 0, 0, 0.28) 4px)",
            }}
          />
        </>
      )}
    </Box>
  );
}
