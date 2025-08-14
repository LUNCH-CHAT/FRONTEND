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

const patchSignUp = async (): Promise <refreshDto> => {
    const { data } = await refreshAxiosInstance.post('/auth/reissue');
    localStorage.setItem('accessToken',data.result.accessToken)
    return data;
}


export async function refreshTimer(bufferSec = 600): Promise<void> {
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
      await refreshTimer(bufferSec);
    } catch (e) {
      console.error("refresh", e);
    }
  };

  if (remain <= 0) {
    await runReissue();
    return;
  }

  timeout = window.setTimeout(runReissue, remain * 1000);
}

export function logoutTimer(){
    if (timeout) {
    window.clearTimeout(timeout);
    timeout = null; 
  }
}