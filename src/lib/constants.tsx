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
