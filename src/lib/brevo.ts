// Server-only Brevo helpers (contacts + transactional email). Brevo only accepts calls from authorised IPs,
// so these work from the production server, not from a laptop.

const baseUrl = () => process.env.BREVO_API_BASE_URL?.trim() || 'https://api.brevo.com/v3';

export async function brevo(path: string, init: { method?: string; body?: unknown } = {}): Promise<Response> {
  const key = process.env.BREVO_API_KEY?.trim();
  if (!key) throw new Error('BREVO_API_KEY is not configured');
  return fetch(`${baseUrl()}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      accept: 'application/json',
      'api-key': key,
      ...(init.body === undefined ? {} : { 'content-type': 'application/json' }),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(10_000),
    cache: 'no-store',
  });
}

export interface BrevoContact {
  id: number;
  email: string;
  emailBlacklisted: boolean;
  listIds: number[];
  modifiedAt: string;
  attributes: Record<string, string | number | boolean | undefined>;
}

/** Contact by email or numeric id; null when Brevo has no such contact. Throws on any other failure. */
export async function getContact(identifier: string | number): Promise<BrevoContact | null> {
  const res = await brevo(`/contacts/${encodeURIComponent(String(identifier))}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Brevo contact lookup ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()) as BrevoContact;
}

export async function updateContact(id: number, body: Record<string, unknown>): Promise<void> {
  const res = await brevo(`/contacts/${id}`, { method: 'PUT', body });
  if (!res.ok) throw new Error(`Brevo contact update ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

/** Sends one transactional email and returns Brevo's message id. */
export async function sendEmail(opts: { to: string; subject: string; html: string; fromName?: string; replyTo?: string }): Promise<string> {
  const sender = process.env.BREVO_SENDER_EMAIL?.trim();
  if (!sender) throw new Error('BREVO_SENDER_EMAIL is not configured');
  const res = await brevo('/smtp/email', {
    method: 'POST',
    body: {
      sender: { name: opts.fromName ?? 'Sesoris', email: sender },
      to: [{ email: opts.to }],
      ...(opts.replyTo ? { replyTo: { email: opts.replyTo } } : {}),
      subject: opts.subject,
      htmlContent: opts.html,
    },
  });
  if (!res.ok) throw new Error(`Brevo email ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return ((await res.json()) as { messageId?: string }).messageId ?? '';
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]!);
