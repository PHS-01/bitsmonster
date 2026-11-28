import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/gerenciar"];

function isProtectedRoute(pathname) {
    return PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    const { pathname, search } = request.nextUrl;

    if (!user && isProtectedRoute(pathname)) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        loginUrl.search = `?next=${encodeURIComponent(pathname + search)}`;

        const redirectResponse = NextResponse.redirect(loginUrl);
        supabaseResponse.cookies.getAll().forEach(cookie => redirectResponse.cookies.set(cookie));
        return redirectResponse;
    }

    return supabaseResponse;
}
