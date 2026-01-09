// store/guestStore.ts
import type { GuestFormContent } from '@/lib/constants';
import { create } from 'zustand';

type GuestStore = {
  guests: GuestFormContent[];
  setGuests: (guests: GuestFormContent[]) => void;
  addGuest: (guest: GuestFormContent) => void;
  removeGuest: (index: number) => void;
  updateGuest: (index: number, guest: GuestFormContent) => void;
  clearGuests: () => void;
};

export const useGuestStore = create<GuestStore>(set => ({
  guests: [],
  setGuests: guests => set({ guests }),
  addGuest: guest =>
    set(state => ({
      guests: [...state.guests, guest],
    })),
  removeGuest: index =>
    set(state => ({
      guests: state.guests.filter((_, i) => i !== index),
    })),
  updateGuest: (index, guest) =>
    set(state => ({
      guests: state.guests.map((g, i) => (i === index ? guest : g)),
    })),
  clearGuests: () => set({ guests: [] }),
}));
