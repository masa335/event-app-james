import { useCallback, useState } from "react";
import { Event } from "../types/event";

type Props = {
  id: number | undefined;
  events: Array<Event>
  onOpen: () => void;
}

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const onSelectEvent = useCallback((props: Props) => {
      const { id, events, onOpen } = props;
      const targetEvent = events.find((event) => event.id === id);
      setSelectedEvent(targetEvent!);
      onOpen();
    },
    []
  );
  return { onSelectEvent, selectedEvent}
};