const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const askQuestion = async (question: string) => {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return response.json();
};
