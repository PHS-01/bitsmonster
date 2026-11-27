"use client";

import { Box, Typography, Paper, Button, Chip, Avatar } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import PaletteIcon from "@mui/icons-material/Palette";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import SchoolIcon from "@mui/icons-material/School";
import GitHubIcon from "@mui/icons-material/GitHub";

const TECH_STACK = [
  {
    name: "Next.js",
    role: "Framework Full-Stack",
    description:
      "Arquitetura App Router com Server e Client Components, rotas dinâmicas e estados automáticos de carregamento.",
    icon: CodeIcon,
  },
  {
    name: "Material UI",
    role: "Design System",
    description:
      "Biblioteca de componentes responsivos integrada a um motor próprio de múltiplos temas com tipografia dinâmica.",
    icon: PaletteIcon,
  },
  {
    name: "Supabase",
    role: "Backend e Autenticação",
    description:
      "Autenticação de usuários, endpoints REST gerados automaticamente e políticas de segurança Row Level Security (RLS).",
    icon: SecurityIcon,
  },
  {
    name: "PostgreSQL",
    role: "Banco de Dados Relacional",
    description:
      "Armazenamento estruturado para perfis de treinadores, tipos elementais e atributos de combate RPG.",
    icon: StorageIcon,
  },
];

const DEVELOPERS = [
  {
    name: "Pedro Henrique da Silva",
    initials: "PH",
    bio: "Depois colocar uma bio aqui",
    github: "https://github.com/PHS-01",
  },
  {
    name: "Jezreel Asaias",
    initials: "JA",
    bio: "Depois colocar uma bio aqui",
    github: "https://github.com/Jezreel-Asaias",
  },
];

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5, md: 6 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Chip
          label="BATALHA DE MONSTROS"
          color="primary"
          variant="outlined"
          size="small"
          sx={{ fontWeight: 700, letterSpacing: "0.8px" }}
        />

        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary.main"
          sx={{ fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem" } }}
        >
          Bem-vindo ao BitsMonster
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 640, fontSize: "1.05rem", lineHeight: 1.7 }}
        >
          Crie suas próprias criaturas, e teste em batalhas na arena.
        </Typography>
      </Paper>

      <Box component="section">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ferramentas e Tecnologias
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stack utilizada para construir a aplicação da interface ao
            banco de dados/API.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {TECH_STACK.map((tech) => {
            const IconComponent = tech.icon;
            return (
              <Paper
                key={tech.name}
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "action.hover",
                    color: "primary.main",
                  }}
                >
                  <IconComponent />
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {tech.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary.main"
                    fontWeight={600}
                  >
                    {tech.role}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {tech.description}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>

      <Box component="section">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Desenvolvedores
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Conheça a equipe por trás do BitsMonster.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {DEVELOPERS.map((dev) => (
            <Paper
              key={dev.name}
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2.5,
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                {dev.initials}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {dev.name}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  {dev.bio}
                </Typography>

                <Button
                  component="a"
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="outlined"
                  startIcon={<GitHubIcon fontSize="small" />}
                >
                  Perfil no GitHub
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "action.hover",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SchoolIcon sx={{ fontSize: 40 }} />
        </Box>

        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Projeto Acadêmico
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            O BitsMonster foi desenvolvido com fins acadêmicos para aplicar
            conceitos de programação web full-stack na prática — incluindo
            modelagem de banco de dados relacional, fluxos de autenticação,
            operações CRUD completas com regras de propriedade por usuário,
            design responsivo e lógica de combate por turnos.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
