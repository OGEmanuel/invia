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

export interface AccountInfo {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  businessName: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
  isAccountDisabled: boolean;
  businessAvatar: string;
  isPasswordUpdated: boolean;
  isBusinessProfileUpdated: boolean;
}

export interface BusinessInfoType {
  id: string;
  name: string;
  avatar: string;
}
