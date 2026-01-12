import { useEffect, useRef } from 'react';
import useSendRequest from './useSendRequest';
import { MUTATIONS } from '../queries';
import { parseExpiryToMs } from '../utils';

const useGetShareEventsFormCode = (eventId: string) => {
  const passcodeInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useSendRequest<
    { eventId: string },
    { data: { passcode: string; passcodeExpires: string } }
  >({
    mutationFn: (data: { eventId: string }) =>
      MUTATIONS.getEventShareFormGeneratePasscode(data.eventId),
    successToast: {
      title: 'Success!',
      description: 'Passcode generated successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
  });

  useEffect(() => {
    if (!passcodeInputRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isRunning = false;

    const fetchPasscode = () => {
      if (isRunning) return;
      isRunning = true;

      mutate(
        { eventId },
        {
          onSuccess: (data?: {
            data: { passcode: string; passcodeExpires: string };
          }) => {
            if (!data?.data) return;

            const { passcode, passcodeExpires } = data.data;

            // Update input
            if (passcodeInputRef.current) {
              passcodeInputRef.current.value = passcode;
            }

            // Parse expiry string
            const expiresInMs = parseExpiryToMs(passcodeExpires);

            // Refresh 5 seconds before expiry
            const delay = Math.max(expiresInMs - 5000, 1000);

            timeoutId = setTimeout(fetchPasscode, delay);
          },
          onSettled: () => {
            isRunning = false;
          },
        },
      );
    };

    fetchPasscode();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [eventId, mutate]);

  return { isPending, passcodeInputRef, mutate };
};

export default useGetShareEventsFormCode;
