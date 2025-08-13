// src/pages/login-page/redirect-page.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../api/login";
import { getProfileDetail, updateProfileImage } from "../../api/profile";
import { pickRandomDefaultProfile as pickDefaultProfileUrl } from "../../config/defaultProfile";
import { getMemberIdFromToken } from "../../utils/jwt";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const isBadUrl = (u?: string | null) =>
  !u || u.trim() === "" || /^string$/i.test(u) || !/^https?:\/\//.test(u);

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const firstRef = useRef(false);

  useEffect(() => {
    if (firstRef.current) return; // strictMode 방지
    firstRef.current = true;

    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        alert("구글 로그인 실패");
        return;
      }

      try {
        const res = await getLogin(code); // 토큰 저장됨
        console.log("로그인 응답:", res.data);

        // 기존 흐름 유지 (50ms 지연)
        setTimeout(async () => {
          try {
            // 1) 신규/기존 공통으로 프로필 이미지 값 검증 및 교정
            try {
              // 로그인 응답에 memberId가 있으면 사용, 없으면 토큰에서 추출
              const memberIdFromRes =
                (res?.data?.memberId ?? res?.data?.result?.memberId) as number | undefined;
              const memberId = memberIdFromRes ?? getMemberIdFromToken();

              if (memberId) {
                const meRes = await getProfileDetail(memberId);
                const me: any = (meRes as any)?.data?.result ?? (meRes as any)?.data;
                if (isBadUrl(me?.profileImageUrl)) {
                  await updateProfileImage(pickDefaultProfileUrl());
                }
              }
            } catch (e) {
              console.warn("내 프로필 조회/교정 실패(무시):", e);
            }

            // 2) 기존 라우팅
            if (res?.data?.result === "isNewUser") {
              // 신규라면 온보딩으로
              navigate("/onboarding/profile");
            } else {
              navigate("/onboarding/complete");
            }
          } catch (e) {
            console.error("리다이렉트 처리 중 오류:", e);
            navigate("/onboarding/complete");
          }
        }, 50);
      } catch (error) {
        console.error("로그인 처리중 문제 발생", error);
        alert("로그인 중 문제가 발생했습니다.");
      }
    })();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
