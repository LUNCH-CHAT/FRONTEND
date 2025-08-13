// src/utils/jwt.ts
function base64UrlDecode(input: string) {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = input.length % 4;
  if (pad) input += '='.repeat(4 - pad);
  return atob(input);
}

export function getMemberIdFromToken(): number | null {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    // 서버 구현에 맞게 우선순위로 시도
    return payload.memberId ?? payload.userId ?? (payload.sub ? Number(payload.sub) : null) ?? null;
  } catch {
    return null;
  }
}
