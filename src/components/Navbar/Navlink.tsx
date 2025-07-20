import React from 'react';
import { NavLink as RR_NavLink, type To } from 'react-router-dom';

interface NavLinkProps {
  to: To;
  // SVG를 props를 받을 수 있는 React 컴포넌트로 변환
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  alt: string;
}

const Navlink = ({ to, Icon, alt }: NavLinkProps) => {
  return (
    // Function as Child pattern
    // NavLink가 내부적으로 isActive 상태를 children 함수에 전달
    <RR_NavLink to={to}>
      {({ isActive }) => (
        <Icon
          aria-label={alt}
          className={`w-12 h-12 transition-colors ${isActive ? 'text-black' : 'text-[#A0A0A0]'}`}
        />
      )}
    </RR_NavLink>
  );
};

export default Navlink;
