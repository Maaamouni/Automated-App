import { useCallback, useState } from "react";

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (f: File): string | null => {
    if (!f.type.startsWith("image/")) {
      return "Only image files are supported.";
    }
    if (f.size > 5 * 1024 * 1024) {
      return "File must be 5MB or smaller.";
    }
    return null;
  };

  const handleFile = useCallback((f: File | null) => {
    if (!f) {
      setFile(null);
      setPreview(null);
      setError(null);
      return;
    }
    const err = validate(f);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(f);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0] ?? null);
    },
    [handleFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0] ?? null;
      handleFile(dropped);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clear = useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
  }, []);

  return {
    file,
    preview,
    isDragging,
    error,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clear,
  };
}
