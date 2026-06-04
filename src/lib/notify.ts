// Client-side waitlist signup via Buttondown's embed-subscribe endpoint.
// Only the public username is needed (no secret key), so this is safe to call
// directly from the browser on a static site. The response is opaque (no-cors),
// so we cannot read Buttondown's status — we assume success if the POST sends.

const USERNAME =
  (import.meta.env.VITE_BUTTONDOWN_USERNAME as string | undefined) ||
  'technicalassemblage';

export type SubscribeResult = 'ok' | 'error';

/** Lightweight email sanity check — good enough for a launch list. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function subscribeEmail(
  email: string,
  product: string,
): Promise<SubscribeResult> {
  try {
    const body = new URLSearchParams({ email: email.trim() });
    // tag subscribers by product so each launch can be broadcast separately
    body.append('tag', slugify(product));

    await fetch(
      `https://buttondown.com/api/emails/embed-subscribe/${USERNAME}`,
      {
        method: 'POST',
        mode: 'no-cors',
        body,
      },
    );

    return 'ok';
  } catch {
    return 'error';
  }
}
