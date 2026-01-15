import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function ReferralPage({ params }: { params: { code: string } }) {
    const code = params.code;

    // Set cookie valid for 30 days
    // Note: In Next.js App Router server components, cookies() is read-only? 
    // No, cookies().set() is available in Server Actions or Route Handlers, but in Page components...
    // Actually, setting cookies in a Server Component directly might be tricky if it's not a Route Handler.
    // However, Middleware is the best place, but a Page with a client-side redirect or a Route Handler is easier for MVP.
    // Let's make this a Server Component that renders nothing but uses a Server Action or just redirects?
    // Wait, we can use a Middleware or just a simple Client Component that sets document.cookie?
    // OR: Use a Route Handler (API) for /r/[code] instead of a Page?
    // But user wants a page like dwom.com/r/code.
    // Let's try Route Handler approach: app/r/[code]/route.ts

    // Re-thinking: The plan said page.tsx. Let's use a Client Component for simplicity to set cookie and redirect?
    // "Sets a `ref` cookie... Redirects user"

    // Server-side approach with cookies().set() is only allowed in Server Actions or Route Handlers.
    // So let's make this file a client component to handle the cookie setting easily?
    // No, better to use a Route Handler for clean server-side redirect + cookie.
    // But the file path requested was app/r/[code]/page.tsx.

    // If I use page.tsx, I can return a client component that sets cookie on mount.
    return (
        <ClientReferralHandler code={code} />
    );
}

// Inline Client Component
import ClientReferralHandler from './ClientReferralHandler';
