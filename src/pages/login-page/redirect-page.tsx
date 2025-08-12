import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../api/login";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const firstRef = useRef(false);

  useEffect(() => {
    if (firstRef.current) return; //strictMode 방지
    firstRef.current = true; 

    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        alert("구글 로그인 실패");
        return;
      }

      try {
        const res = await getLogin(code);
        console.log(" 로그인 응답:", res.data);  //콘솔 로그 확인하려고 추가함
        setTimeout(() => {
          if (res.data.result === "isNewUser") navigate(`/onboarding/profile`);
          else navigate(`/onboarding/complete`);

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
  )
}
