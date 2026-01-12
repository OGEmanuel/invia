import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PasscodeData = {
  passcode: string;
  expiresAt: number;
};

type PasscodeStore = {
  codes: Record<string, PasscodeData>;
  timers: Record<string, ReturnType<typeof setTimeout>>;
  isFetching: Record<string, boolean>;

  setCode: (eventId: string, data: PasscodeData) => void;
  getValidCode: (eventId: string) => PasscodeData | undefined;
  clearTimer: (eventId: string) => void;
  markFetching: (eventId: string, val: boolean) => void;
  cleanupExpired: () => void;
};

export const usePasscodeStore = create<PasscodeStore>()(
  persist(
    (set, get) => ({
      codes: {},
      timers: {},
      isFetching: {},

      setCode: (eventId, data) =>
        set(s => ({
          codes: { ...s.codes, [eventId]: data },
        })),

      getValidCode: eventId => {
        const data = get().codes[eventId];
        if (!data) return undefined;

        if (data.expiresAt <= Date.now()) {
          // expired → delete
          set(s => {
            const { [eventId]: _, ...rest } = s.codes;
            return { codes: rest };
          });
          return undefined;
        }

        return data;
      },

      clearTimer: eventId => {
        const timer = get().timers[eventId];
        if (timer) clearTimeout(timer);

        set(s => {
          const { [eventId]: _, ...rest } = s.timers;
          return { timers: rest };
        });
      },

      markFetching: (eventId, val) =>
        set(s => ({
          isFetching: { ...s.isFetching, [eventId]: val },
        })),

      cleanupExpired: () => {
        const now = Date.now();
        set(s => ({
          codes: Object.fromEntries(
            Object.entries(s.codes).filter(([, v]) => v.expiresAt > now),
          ),
        }));
      },
    }),
    {
      name: 'passcode-storage',
      partialize: state => ({ codes: state.codes }), // persist ONLY codes
    },
  ),
);
