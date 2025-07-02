# Front-End 팀원

1. 강민서  
2. 이소민  
3. 장준영  

---

## 📌 커밋 컨벤션

각 태그를 이용하여 어떤 내용이 변경되었는지를 나타내는 규칙입니다.

- `[FEAT]` : 새로운 기능 추가  
- `[DESIGN]` : 디자인 수정  
- `[REFACTOR]` : 리팩토링 
- `[BUGFIX]` : 버그 에러 수정
- `[MODIFY]` : 코드 수정 
- `[STYLE]` : 코드 포맷 
- `[CHORE]` : 빌드 수정, 패키지 매니저 설정  
- `[RENAME]` : 파일 혹은 폴더명 수정
- `[REMOVE]` : 파일 혹은 폴더 삭제
- `[MERGE]` : Pull 과정 중 현재 commit과 병합이 일어난 경우
- `[BUILD]` : 새로운 라이브러리 혹은 패키지 추가
- `[DOCS]` : 문서 작성 

---

## 🧾 브랜치명 정의

브랜치 이름을 지정할 때의 규칙입니다.

- 영어로 통일, 케밥 케이스로 작성
- 작성 형식 : 브랜치 유형/브랜치명/#이슈번호
- 작성 예시
  - feature/login-page/#12
  - docs/README.md/#25

---

## 📐 코드 컨벤션

코드에서 이름을 지정할 때의 케이스 규칙입니다.

- `PascalCase` : 컴포넌트 함수, 클래스, 타입, 인터페이스, 컴포넌트 파일  
- `camelCase` : 변수, 일반함수 
- `UPPER_CASE` : 상수
- `kebab-case` : 파일,폴더 (컴포넌트 파일만 예외로  PascalCase로 설정)

---

## 🧑‍💻 개발 환경 세팅 가이드
### 코드 스타일 통일하기 위해 ESLint+Prettier 세팅했습니다.
### 📥 1. 코드 가져오기 (clone 후) npm install 하면 자동으로 설정됩니다!

- git clone https://github.com/LUNCH-CHAT/FRONTEND.git 
- npm install 
