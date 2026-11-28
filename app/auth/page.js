import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Entrar | BitsMonster" };

export default async function AuthPage({ searchParams }) {
    const { next } = await searchParams;

    const safeNext = typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/";

    return <AuthForm next={safeNext} />;
}
