import type { ContactFormData } from "@/types";
import { hasErrors, validateContactForm } from "./contactService";

/**
 * Mock contact form submission. Simulates network latency and
 * rejects messages that fail validation.
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const errors = validateContactForm(data);
  if (hasErrors(errors)) {
    const firstError = Object.values(errors)[0];
    return { ok: false, error: firstError ?? "Invalid form data." };
  }

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Simulated success
  return { ok: true, id: `msg_${Date.now().toString(36)}` };
}
