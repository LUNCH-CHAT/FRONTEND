interface ToastNotiProps {
  title: string | undefined;
  body: string | undefined;
}

const ToastNoti = ({ title, body }: ToastNotiProps) => {
  return (
    <div>
      <p className="font-[pretendard] font-semibold text-sm text-[#F56156]">{title}</p>
      <p className="font-[pretendard] font-normal text-sm">{body}</p>
    </div>
  );
};

export default ToastNoti;
