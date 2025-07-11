import { useNavigate } from 'react-router-dom';
import SampleProfile from '@/assets/images/sample-profile.png';
import RightArrow from '@/assets/icons/arrow-right.svg';
import ReceivedRequest from '@/assets/icons/received-request.svg';
import SentRequest from '@/assets/icons/sent-request.svg';
import TagSelect from '@/assets/icons/tag-select.svg';

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="px-[20px]">
      <div className="flex gap-[16px]">
        <img
          src={SampleProfile}
          alt="마이 프로필"
          className="size-[100px] rounded-full object-cover"
        />
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-[4px]">
            <p className="text-black text-[16px] font-[pretendard] font-semibold">유엠씨</p>
            <button
              type="button"
              onClick={() => navigate(`/my/profile`)}
              className="flex items-center gap-[5px] text-[#7D7D7D] text-[11px] font-[pretendard] font-regular cursor-pointer"
            >
              나의 프로필
              <img src={RightArrow} alt="나의 프로필 화살표" className="w-[5px] h-[9px]" />
            </button>
          </div>
          <p className="text-black text-[13px] font-[pretendard] font-regular mb-[6px]">
            21학번, 컴퓨터공학과
          </p>
          <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-regular mb-[8px]">
            프로창업러 | 교환 준비생 | 취미 요가
          </p>
          <div className="flex gap-[6px]">
            <p className="inline-block px-[9px] py-[6px] border border-[#FF7C6A] rounded-[15px] text-black text-[13px] font-[pretendard] font-light leading-[11px]">
              창업
            </p>
            <p className="inline-block px-[9px] py-[6px] border border-[#FF7C6A] rounded-[15px] text-black text-[13px] font-[pretendard] font-light leading-[11px]">
              교환학생
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border border-[#D4D4D4] mt-[29px] rounded-[10px] flex justify-center items-center">
        <div className="flex w-[80%] justify-center items-center my-3">
          <div className="w-[60px] flex flex-col items-center">
            <img src={ReceivedRequest} alt="받은 요청 이미지" className="size-[32px] mb-[6px]" />
            <p className="text-black text-[13px] font-[pretendard] font-medium mb-[2px]">3건</p>
            <p className="text-[#A0A0A0] text-[13px] font-[pretendard] font-regular">받은 요청</p>
          </div>
          <div className="w-full flex flex-1 justify-center items-center ">
            <div className="w-[1px] h-[45px] border border-[#D4D4D4]" />
          </div>
          <div className="w-[60px] flex flex-col items-center">
            <img src={SentRequest} alt="보낸 요청 이미지" className="size-[32px] mb-[6px]" />
            <p className="text-black text-[13px] font-[pretendard] font-medium mb-[2px]">3건</p>
            <p className="text-[#A0A0A0] text-[13px] font-[pretendard] font-regular">받은 요청</p>
          </div>
          <div className="w-full flex flex-1 justify-center items-center ">
            <div className="w-[1px] h-[45px] border border-[#D4D4D4]" />
          </div>
          <div className="w-[60px] flex flex-col items-center">
            <img src={TagSelect} alt="매칭 완료 이미지" className="size-[32px] mb-[6px]" />
            <p className="text-black text-[13px] font-[pretendard] font-medium mb-[2px]">3건</p>
            <p className="text-[#A0A0A0] text-[13px] font-[pretendard] font-regular">받은 요청</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="text-black text-[13px] font-[pretendard] font-medium mt-[19px] cursor-pointer"
      >
        로그아웃
      </button>
    </div>
  );
}
