import { parseExpiryToMs } from '@/lib/utils';
import { usePasscodeStore } from '@/store/passcode-store';

export function startPasscodeAutoRefresh(eventId: string, mutate: any) {
  const store = usePasscodeStore.getState();

  const existing = store.getValidCode(eventId);
  if (existing) return;

  if (store.isFetching[eventId]) return;

  store.markFetching(eventId, true);

  const fetchPasscode = () => {
    mutate(
      { eventId },
      {
        onSuccess: (res: any) => {
          const { passcode, passcodeExpires } = res.data;

          const expiresInMs = parseExpiryToMs(passcodeExpires);
          const expiresAt = Date.now() + expiresInMs;

          store.setCode(eventId, { passcode, expiresAt });

          const delay = Math.max(expiresInMs - 5000, 1000);

          store.clearTimer(eventId);

          const timer = setTimeout(fetchPasscode, delay);

          usePasscodeStore.setState(s => ({
            timers: { ...s.timers, [eventId]: timer },
          }));
        },
        onSettled: () => {
          store.markFetching(eventId, false);
        },
      },
    );
  };

  fetchPasscode();
}
