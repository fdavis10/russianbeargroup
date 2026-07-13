import { useCallback } from "react";
import { submitContact, submitConsultation, type ContactPayload, type ConsultationPayload, type ContactResponse } from "../api";

export function useContactSubmit() {
  const submit = useCallback(async (payload: ContactPayload): Promise<ContactResponse> => {
    return submitContact(payload);
  }, []);

  return { submit };
}

export function useConsultationSubmit() {
  const submit = useCallback(async (payload: ConsultationPayload): Promise<ContactResponse> => {
    return submitConsultation(payload);
  }, []);

  return { submit };
}
