
const API_BASE_URL = 'http://localhost:3000';

export function streamMockAiResponse(
  message: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError?: (error: Error) => void
): () => void {
  const controller = new AbortController();

  fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Backend responded with HTTP ${response.status}`);
      }
      const data: { reply: string } = await response.json();
      onChunk(data.reply);
      onDone();
    })
    .catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return; // user switched/cancelled the chat — not a real error
      }
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Chat backend request failed:', err);
      onError?.(err);
    });

  return () => controller.abort();
}