import type { refreshDto } from "../types/user";
import { refreshAxiosInstance } from "./axios";

let timeout: number | null = null;

function getExp(accessToken: string) {
  try {
    const [, p] = accessToken.split(".");
    if (!p) return null;
    const b64 = p.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), "=");
    const { exp } = JSON.parse(atob(padded));
    return typeof exp === "number" ? exp : null;
  } catch {
    return null;
  }
}

const patchSignUp = async (): Promise<refreshDto> => {
  const { data } = await refreshAxiosInstance.post<refreshDto>("/auth/reissue");
  localStorage.setItem("accessToken", data.result.accessToken);
  return data;
};

export async function refreshTimer(bufferSec = 60): Promise<void> {

  if (timeout) {
    window.clearTimeout(timeout);
    timeout = null;
  }

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return;

  const exp = getExp(accessToken);
  if (!exp) return;

  const nowSec = Math.floor(Date.now() / 1000);
  const remain = exp - nowSec - bufferSec;

  const runReissue = async () => {
    try {
      await patchSignUp();
    } catch (error) {
      console.error("재발급 실패", error);
    } finally {
      // 1초 후 새 토큰 기준으로 다시 '한 번'만 예약
      timeout = window.setTimeout(() => { void refreshTimer(bufferSec); }, 1000);
    }
  };

  if (remain <= 0) {
    timeout = window.setTimeout(runReissue, 5000);
    return;
  }

  timeout = window.setTimeout(runReissue, remain * 1000);
}

export function logoutTimer() {
  if (timeout) {
    window.clearTimeout(timeout);
    timeout = null;
  }
}
