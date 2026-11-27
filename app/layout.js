import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline, Container } from "@mui/material";

export const metadata = {
  title: "BitsMonster",
  description: "Automated monster battle and management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
