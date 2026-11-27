"use client";

import { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckIcon from "@mui/icons-material/Check";
import { useAppTheme } from "@/components/ThemeRegistry";
import AnimatedIconButton from "@/components/AnimatedIconButton";

const THEME_GROUPS = [
  {
    category: "Standard",
    items: [
      { id: "light", label: "Classic Light", icon: LightModeIcon },
      { id: "dark", label: "Classic Dark", icon: DarkModeIcon },
    ],
  },
  {
    category: "Game Boy",
    items: [
      { id: "gameboy", label: "Game Boy Classic", icon: VideogameAssetIcon },
      { id: "gameboyDark", label: "Game Boy Dark", icon: VideogameAssetIcon },
    ],
  },
  {
    category: "Vaporwave",
    items: [{ id: "neon", label: "Vice City Neon", icon: BoltIcon }],
  },
];

const ALL_THEMES = THEME_GROUPS.flatMap((group) => group.items);

export default function ThemeSelector() {
  const { themeName, setThemeName } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const currentTheme =
    ALL_THEMES.find((t) => t.id === themeName) || ALL_THEMES[1];
  const ActiveIcon = currentTheme.icon;

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (id) => {
    setThemeName(id);
    handleClose();
  };

  return (
    <>
      <AnimatedIconButton
        tooltip={`${currentTheme.label}`}
        onClick={handleOpen}
        aria-label="Select theme"
        aria-controls={open ? "theme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <ActiveIcon fontSize="small" />
      </AnimatedIconButton>

      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { minWidth: 220, mt: 1 },
          },
        }}
      >
        {THEME_GROUPS.flatMap((group, index) => {
          const elements = [];

          if (index > 0) {
            elements.push(<Divider key={`div-${group.category}`} />);
          }

          elements.push(
            <ListSubheader
              key={`sub-${group.category}`}
              sx={{
                lineHeight: "32px",
                fontWeight: "bold",
                bgcolor: "transparent",
              }}
            >
              {group.category}
            </ListSubheader>,
          );

          group.items.forEach((item) => {
            const ItemIcon = item.icon;
            const isSelected = themeName === item.id;

            elements.push(
              <MenuItem
                key={item.id}
                selected={isSelected}
                onClick={() => handleSelect(item.id)}
              >
                <ListItemIcon>
                  <ItemIcon
                    fontSize="small"
                    color={isSelected ? "primary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {isSelected && (
                  <CheckIcon fontSize="small" color="primary" sx={{ ml: 1 }} />
                )}
              </MenuItem>,
            );
          });

          return elements;
        })}
      </Menu>
    </>
  );
}
