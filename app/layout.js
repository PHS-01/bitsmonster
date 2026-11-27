import { Box, Container } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry";
import ThemeBackground from "@/components/ThemeBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "BitsMonster",
  description: "Automated monster battle and management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>
          <ThemeBackground />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />
            <Container maxWidth="lg" sx={{ py: 4 }}>
              {children}
            </Container>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
