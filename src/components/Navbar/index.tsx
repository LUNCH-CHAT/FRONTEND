import Navlink from './Navlink';
import Home from '/src/assets/home.svg?react';
import Chatting from '/src/assets/chatting.svg?react';
import Search from '/src/assets/search.svg?react';
import Matching from '/src/assets/matching.svg?react';
import My from '/src/assets/my.svg?react';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between p-2">
      <Navlink to="/" Icon={Home} alt="홈" />
      <Navlink to="/chat" Icon={Chatting} alt="채팅" />
      <Navlink to="/search" Icon={Search} alt="둘러보기" />
      <Navlink to="/matching" Icon={Matching} alt="매칭리스트" />
      <Navlink to="/my" Icon={My} alt="마이" />
    </nav>
  );
};

export default Navbar;
