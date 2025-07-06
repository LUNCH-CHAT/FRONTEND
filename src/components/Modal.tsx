interface ModalState {
    modalText:string;
    onClose:()=>void;
}

const Modal=({modalText,onClose}:ModalState)=>{

    return(
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white min-w-[276px] min-h-[138px] rounded-[20px] p-6 leading-[22px] flex flex-col justify-between">
                {/*/n 사용가능 */}
                <p className="text-black pb-6 whitespace-pre-wrap font-[pretendard] font-medium">{modalText}</p> 
                <p className="text-[#FF7C6A] text-right cursor-pointer font-[pretendard] font-semibold" onClick={()=>onClose()}>확인</p>
            </div>
        </div>
    )
}

export default Modal;
