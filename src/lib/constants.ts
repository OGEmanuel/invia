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

export interface GuestData {
  guests: Guests[];
  guestParties: string[];
  totalPages: number;
  hasNextPage: boolean;
}
export interface Guests {
  id: string;
  name: string;
  party: string;
  email: string;
  phone: string;
  isInviteSent: boolean;
  isInviteDelivered: boolean;
  isInviteRSVP: boolean;
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
export interface Events {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  hash: string;
  totalGuests: number;
  totalInvites: number;
  sentInvites: number;
  acceptedInvites: number;
  pendingInvites: number;
  failedInvites: number;
}
export interface EventData {
  events: Events[];
  hasNext: boolean;
  totalPages: number;
  totalInvites: number;
}
