import { useCallback, useState } from "react";
import type { ContactFormData, ContactFormErrors } from "@/types";
import { hasErrors, validateContactForm } from "@/services/contactService";
import { submitContactForm } from "@/services/contactApi";

type Status = "idle" | "submitting" | "success" | "error";

interface UseContactFormResult {
  values: ContactFormData;
  errors: ContactFormErrors;
  status: Status;
  serverError: string | null;
  touched: Record<keyof ContactFormData, boolean>;
  isValid: boolean;
  handleChange: (field: keyof ContactFormData, value: string) => void;
  handleBlur: (field: keyof ContactFormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

const initialValues: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function useContactForm(): UseContactFormResult {
  const [values, setValues] = useState<ContactFormData>(initialValues);
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = validateContactForm(values);
  const isValid = !hasErrors(errors);

  const handleChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (status === "error" || status === "success") {
        setStatus("idle");
        setServerError(null);
      }
    },
    [status],
  );

  const handleBlur = useCallback((field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTouched({ name: true, email: true, message: true });

      const validationErrors = validateContactForm(values);
      if (hasErrors(validationErrors)) {
        setStatus("error");
        setServerError("Please fix the errors above and try again.");
        return;
      }

      setStatus("submitting");
      setServerError(null);

      const result = await submitContactForm(values);
      if (result.ok) {
        setStatus("success");
        setValues(initialValues);
        setTouched({ name: false, email: false, message: false });
      } else {
        setStatus("error");
        setServerError(result.error);
      }
    },
    [values],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({ name: false, email: false, message: false });
    setStatus("idle");
    setServerError(null);
  }, []);

  return {
    values,
    errors,
    status,
    serverError,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
