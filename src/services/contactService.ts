import type { ContactFormData, ContactFormErrors } from "@/types";

/**
 * Validate the contact form data.
 * Returns an empty object when valid, otherwise a map of field -> error message.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (data.name.trim().length > 80) {
    errors.name = "Name must be 80 characters or fewer.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Message must be 2000 characters or fewer.";
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
