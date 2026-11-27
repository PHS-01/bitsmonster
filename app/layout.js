import { Container } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata = {
  title: "BitsMonster",
  description: "Automated monster battle and management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
