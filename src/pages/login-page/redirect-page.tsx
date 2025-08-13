// src/pages/login-page/redirect-page.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../api/login";
import { updateProfileImage } from "../../api/profile";
import { pickRandomDefaultProfile as pickDefaultProfileUrl } from "../../config/defaultProfile";
import { LoadingSpinner } from "../../components/LoadingSpinner";

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
        console.log('구글 코드',code);
        const res = await getLogin(code); // 토큰 저장됨
        console.log("getLogin 로그인 응답:", res.data);

        // 기존 흐름 유지 (50ms 지연)
        setTimeout(async () => {
          try {
            if (res?.data?.result === "isNewUser") {
              // 새 유저일 때만 기본 프로필 이미지를 서버에 1회 저장
              const url = pickDefaultProfileUrl();
              try {
                await updateProfileImage(url);
              } catch (e) {
                console.warn("기본 프로필 이미지 저장 실패(무시):", e);
              }
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
