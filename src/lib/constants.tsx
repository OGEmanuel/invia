export type FormFieldApi<TValue> = {
  name: string;
  state: {
    value: TValue;
    meta: {
      isTouched: boolean;
      isValid: boolean;
      errors: ({ message?: string | undefined } | undefined)[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: TValue) => void;
};

export interface Guests {
  id: string;
  guest: string;
  party: string;
  contact: {
    phone: string;
    email: string;
  };
  status: string;
  rsvp: string;
}
