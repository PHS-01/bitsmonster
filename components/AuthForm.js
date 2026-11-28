"use client";

import { createClient } from "@/lib/supabase/client";
import { Alert, Box, Button, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ERROR_MESSAGES = [
    ["invalid login credentials", "E-mail ou senha incorretos."],
    ["email not confirmed", "Confirme seu e-mail antes de entrar (veja sua caixa de entrada)."],
    ["user already registered", "Este e-mail já está cadastrado."],
    ["password should be at least", "A senha precisa ter pelo menos 6 caracteres."],
    ["database error saving new user", "Não foi possível criar o perfil. Tente outro nome de treinador."],
    ["rate limit", "Muitas tentativas. Aguarde um pouco e tente de novo."],
];

function traduzirErro(message = "") {
    const found = ERROR_MESSAGES.find(([en]) => message.toLowerCase().includes(en));
    return found ? found[1] : message || "Algo deu errado. Tente novamente.";
}

export default function AuthForm({ next = "/" }) {
    const router = useRouter();
    const [supabase] = useState(() => createClient());

    const [tab, setTab] = useState("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isSignUp = tab === "signup";

    function handleTabChange(_event, value) {
        setTab(value);
        setError("");
        setSuccess("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (isSignUp) {
                const name = username.trim();

                if (!/^[a-zA-Z0-9_]{3,20}$/.test(name)) {
                    setError("O nome de treinador deve ter de 3 a 20 caracteres (letras, números ou _).");
                    return;
                }

                const { data: existing } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("username", name)
                    .maybeSingle();

                if (existing) {
                    setError("Esse nome de treinador já está em uso.");
                    return;
                }

                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { username: name } },
                });

                if (error) throw error;

                if (data.user && data.user.identities?.length === 0) {
                    setError("Este e-mail já está cadastrado.");
                    return;
                }

                if (!data.session) {
                    setSuccess("Conta criada! Enviamos um link de confirmação para o seu e-mail.");
                    setTab("login");
                    setPassword("");
                    return;
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }

            router.push(next);
            router.refresh();
        } catch (err) {
            setError(traduzirErro(err.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                maxWidth: 420,
                mx: "auto",
                mt: { xs: 2, sm: 6 },
                p: { xs: 3, sm: 4 },
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}>
                {isSignUp ? "Crie sua conta de treinador" : "Bem-vindo de volta, treinador"}
            </Typography>

            <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
                <Tab label="Entrar" value="login" disabled={loading} />
                <Tab label="Criar conta" value="signup" disabled={loading} />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                {isSignUp && (
                    <TextField
                        label="Nome de treinador"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        disabled={loading}
                        helperText="3 a 20 caracteres: letras, números ou _"
                    />
                )}

                <TextField
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="email"
                />

                <TextField
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    helperText={isSignUp ? "Mínimo de 6 caracteres" : undefined}
                />

                <Button type="submit" variant="contained" size="large" loading={loading}>
                    {isSignUp ? "Criar conta" : "Entrar"}
                </Button>
            </Box>
        </Paper>
    );
}
