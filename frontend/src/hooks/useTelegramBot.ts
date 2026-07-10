import { useCallback } from "react";
import { submitContact, type ContactPayload, type ContactResponse } from "../api";

export function useContactSubmit() {
  const submit = useCallback(async (payload: ContactPayload): Promise<ContactResponse> => {
    return submitContact(payload);
  }, []);

  return { submit };
}
