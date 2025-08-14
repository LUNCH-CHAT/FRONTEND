import { useInView } from 'react-intersection-observer';
import ChattingList from '../../components/ChattingPage/ChattingList';
import useGetChatRoomList from '../../hooks/chat/useGetChatRoomList';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { deleteChatRoom } from '../../api/chat';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function ChattingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const { data, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetChatRoomList();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 채팅방 퇴장
  const handleDeleteChatRoom = async (roomId: number | null) => {
    if (roomId) {
      try {
        const data = await deleteChatRoom(roomId);

        // 성공 시 새로고침하여 채팅 목록 재호출
        if (data.isSuccess) {
          location.reload();
        }
      } catch (error) {
        console.log('chatRoom delete error', error);
      } finally {
        setSelectedRoomId(null);
        setIsModalOpen(false);
      }
    }
  };

  if (isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-1 select-none">
        {data?.pages.flatMap(page => {
          const chatRooms = page.result.data;

          if (chatRooms.length > 0) {
            return chatRooms.map(room => {
              // 오전/오후로 시간 필터링
              let formattedTime;
              if (room.lastMessageSentAt) {
                const hours = String(room.lastMessageSentAt).split(':')[0];
                const minutes = String(room.lastMessageSentAt).split(':')[1];

                let displayHours = Number(hours);
                let period = '오전';
                if (displayHours >= 12) {
                  period = '오후';
                  if (displayHours > 12) {
                    displayHours = displayHours - 12;
                  }
                }
                formattedTime = `${period} ${displayHours}:${minutes}`;
              }

              return (
                <ChattingList
                  name={room.friendName}
                  friendInfo={room.friendDepartment}
                  friendImage={room.friendImageUrl}
                  lastMessage={room.lastMessage ? room.lastMessage : ''}
                  time={formattedTime || ''}
                  id={room.roomId}
                  key={room.roomId}
                  onLongPress={() => {
                    setIsModalOpen(true);
                    setSelectedRoomId(room.roomId); // longPress를 실행한 roomId 저장
                  }}
                />
              );
            });
          } else {
            return [
              <p
                key="no-chat"
                className="flex justify-center items-center min-h-[200px] text-gray-400 font-[pretendard]"
              >
                채팅이 존재하지 않습니다
              </p>,
            ];
          }
        })}
      </div>
      <div ref={ref}></div>

      {isModalOpen && (
        <Modal
          modalTitle="채팅방을 나가시겠습니까?"
          modalText="퇴장 후 대화 내용은 복구할 수 없습니다."
          onClose={() => setIsModalOpen(false)}
          onClick={() => handleDeleteChatRoom(selectedRoomId)}
        />
      )}
    </>
  );
}
