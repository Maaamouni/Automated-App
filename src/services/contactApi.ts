import type { ContactFormData } from "@/types";
import { hasErrors, validateContactForm } from "./contactService";

/**
 * Submit the contact form to Web3Forms.
 *
 * Web3Forms is a no-backend form endpoint: we POST JSON to their API with
 * an access key, and they forward the message to the email address tied
 * to that key. Sign up at https://web3forms.com to get a key.
 *
 * Required env var (set in `.env.local` for dev and in Netlify
 * "Site settings → Environment variables" for production):
 *   VITE_WEB3FORMS_ACCESS_KEY=your-key-here
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
  | string
  | undefined;

// Client-side rate limit: at most one successful submission per this many ms.
// Prevents button-mashing and reduces the blast radius of a stolen key.
const RATE_LIMIT_MS = 30_000;
let lastSuccessAt = 0;

export async function submitContactForm(
  data: ContactFormData,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const errors = validateContactForm(data);
  if (hasErrors(errors)) {
    const firstError = Object.values(errors)[0];
    return { ok: false, error: firstError ?? "Invalid form data." };
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    // Surface a clear error rather than silently failing in production.
    return {
      ok: false,
      error:
        "Contact form is not configured. Set VITE_WEB3FORMS_ACCESS_KEY in your environment.",
    };
  }

  if (Date.now() - lastSuccessAt < RATE_LIMIT_MS) {
    const wait = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSuccessAt)) / 1000);
    return {
      ok: false,
      error: `Please wait ${wait}s before sending another message.`,
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New portfolio message from ${data.name}`,
        from_name: data.name,
        replyto: data.email,
        name: data.name,
        email: data.email,
        message: data.message,
        // Honeypot: real users never fill this. Web3Forms rejects submissions
        // where the `botcheck` field is non-empty.
        botcheck: "",
      }),
    });

    const result = (await response.json()) as {
      success: boolean;
      message?: string;
    };

    if (response.ok && result.success) {
      lastSuccessAt = Date.now();
      return { ok: true, id: `msg_${Date.now().toString(36)}` };
    }

    return {
      ok: false,
      error: result.message ?? `Request failed with status ${response.status}.`,
    };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? `Network error: ${err.message}`
          : "Network error. Please check your connection and try again.",
    };
  }
}
