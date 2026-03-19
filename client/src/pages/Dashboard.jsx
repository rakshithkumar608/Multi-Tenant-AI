import { useOutletContext } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";

export default function Dashboard() {
  const { chatId } = useOutletContext();

  return <ChatWindow chatId={chatId} />;
}