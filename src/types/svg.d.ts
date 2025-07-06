// SVG 파일을 React 컴포넌트로 불러올 수 있도록 타입을 선언
// *.svg?react로 끝나는 모듈을 TypeScript가 인식 가능
declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
