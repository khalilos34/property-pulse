import MessageCard from "@/components/shared/messages/MessageCard";
import {
  countUnreadMessages,
  fetchMessageByUser,
} from "@/lib/actions/message.action";

const MessagesPage = async () => {
  const messages = await fetchMessageByUser();
  const countMessages = await countUnreadMessages();

  if (!messages) return <p>there is no messages </p>;
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">
            Your Messages ({countMessages})
          </h1>
          <div className="flex flex-col gap-y-4">
            {messages.map((message: any) => (
              <div key={message._id}>
                <MessageCard message={message} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
