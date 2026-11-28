"use client";

import { createClient } from "@/lib/supabase/client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import { Button, CircularProgress, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserMenu() {
    const router = useRouter();
    const [supabase] = useState(() => createClient());

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user ?? null);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const userId = user?.id;
    useEffect(() => {
        if (!userId) return;
        let active = true;

        supabase
            .from("profiles")
            .select("id, username")
            .eq("id", userId)
            .single()
            .then(({ data }) => {
                if (active && data) setProfile(data);
            });

        return () => {
            active = false;
        };
    }, [userId, supabase]);

    const displayName =
        (profile?.id === userId && profile?.username) || user?.user_metadata?.username || user?.email?.split("@")[0];

    async function handleLogout() {
        setAnchorEl(null);
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }

    if (loading) {
        return <CircularProgress size={20} />;
    }

    if (!user) {
        return (
            <Button component={Link} href="/auth" variant="contained" size="small" startIcon={<LoginIcon />}>
                Entrar
            </Button>
        );
    }

    return (
        <>
            <Button
                onClick={e => setAnchorEl(e.currentTarget)}
                color="inherit"
                startIcon={<PersonIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ textTransform: "none", fontWeight: 600 }}
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                {displayName}
            </Button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{ paper: { sx: { minWidth: 200, mt: 1 } } }}
            >
                <MenuItem component={Link} href="/gerenciar" onClick={() => setAnchorEl(null)}>
                    <ListItemIcon>
                        <PetsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Meus monstros" />
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                </MenuItem>
            </Menu>
        </>
    );
}
