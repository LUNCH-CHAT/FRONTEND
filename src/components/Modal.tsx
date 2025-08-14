interface ModalState {
  modalTitle?: string;
  modalText: string;
  onClose: () => void;
  onClick?: () => void;
}

const Modal = ({ modalTitle, modalText, onClose, onClick }: ModalState) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
      <div className="bg-white min-w-[276px] min-h-[138px] rounded-[20px] p-6 leading-[22px] flex flex-col justify-between">
        <h1 className="text-center font-[pretendard] font-medium text-black text-lg mb-2">
          {modalTitle}
        </h1>
        {/*/n 사용가능 */}
        <p
          className={`pb-6 whitespace-pre-wrap font-[pretendard] font-medium ${
            onClick ? 'text-gray-400' : 'text-black'
          } `}
        >
          {modalText}
        </p>
        <div className={`${onClick ? 'flex justify-around' : 'text-right'} `}>
          {onClick && (
            <button
              type="button"
              className="px-3 py-1 text-gray-400 cursor-pointer font-[pretendard] font-semibold "
              onClick={onClose}
            >
              취소
            </button>
          )}
          <button
            type="button"
            className="px-3 py-1 text-[#F56156] cursor-pointer font-[pretendard] font-semibold"
            onClick={onClick ? onClick : onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
