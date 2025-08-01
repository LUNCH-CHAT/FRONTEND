import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../api/login-page/login";

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
        
        setTimeout(() => {
          if (res.data.result === "isNewUser") navigate(`/onboarding/profile`);
          else navigate(`/onboarding/complete`);

        }, 50);
        

      } catch (error) {
        console.error("로그인 처리중 문제 발생", error);
        alert("로그인 중 문제가 발생했습니다.");
      }
    })();

  }, []);

  return <div>redirecting...</div>;
}
