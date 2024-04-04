import { countUnreadMessages } from "@/lib/actions/message.action";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const UnreadMessagesCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const countMessages = async () => {
      const count = await countUnreadMessages();
      setCount(count);
    };
    countMessages();
  });

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {count}
    </span>
  );
};

export default UnreadMessagesCount;
