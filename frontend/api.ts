/*
 * API Base - Cloudflare Worker URL
 */
export const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

/*
 * Sermon audio URL (served from R2 via Worker)
 */
export const sermonUrl = `${workerUrl}/sermon`;

/*
 * Post the connect form to Cloudflare Worker.
 */
export const postConnectForm = async (data: object) => {
  const response = await fetch(`${workerUrl}/inquiry`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = new Error(`Request failed`) as Error & { status: number };
    error.status = response.status;
    throw error;
  }
  return response.json();
};
