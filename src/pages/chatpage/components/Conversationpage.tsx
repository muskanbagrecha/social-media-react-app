import { getUserDetails } from "../Chatpage";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-firestore";
import { useSelector } from "react-redux";
import { BackIcon, Send } from "../../../assets";
import "../Chat.css";

export function ConversationPage() {
  const { chatId } = useParams();
  const users = chatId?.split("_") ?? [];
  const authUser = useSelector((store: any) => store.auth.authUser);
  const allUsers = useSelector((store: any) => store.allUsers.allUsers);

  const userDetails = getUserDetails(
    users[1] === authUser?.uid ? users[0] : users[1],
    allUsers
  );
  const navigate = useNavigate();

  interface ConversationInterface {
    text: string;
    from: string;
    timestamp: any;
  }

  const [conversations, setConversations] = useState<ConversationInterface[]>(
    []
  );
  const [textField, setTextField] = useState("");

  const scrollBar = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(
      Object(scrollBar?.current).scrollTop,
      Object(scrollBar?.current).scrollHeight
    );
    const unSub = onSnapshot(
      query(
        collection(db, `chats/${chatId}/messages`),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        setConversations(Object(snapshot.docs.map((doc) => doc.data())));
        setTimeout(() => {
          console.log("scroll");

          if (scrollBar.current) {
            console.log("scroll");
            scrollBar.current.scrollTop = scrollBar?.current?.scrollHeight;
          }
        }, 0);
      }
    );
    return () => {
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    if (textField.trim() !== "") {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        from: authUser?.uid,
        text: textField,
        timestamp: serverTimestamp(),
      });
      setTextField("");
      await setDoc(
        doc(collection(db, `chats`), chatId),
        { lastestMessageTime: serverTimestamp() },
        { merge: true }
      );
    }
  };

  return (
    <div className="conversation-screen border-2 rounded-md my-2">
      <div
        className="cursor-pointer flex items-center border-b-2 w-full border-gray-200"
        onClick={() => {
          navigate(
            `/profile/${users[1] === authUser?.uid ? users[0] : users[1]}`
          );
        }}
      >
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackIcon />
        </div>
        <div className="avatar avatar-xs">
          <img
            src={userDetails?.photoURL ?? ""}
            alt={userDetails?.displayName ?? ""}
            className="img-responsive img-rounded"
          />
        </div>
        <p
          onClick={() =>
            navigate(
              `/profile/${users[1] === authUser?.uid ? users[0] : users[1]}`
            )
          }
        >
          {userDetails?.displayName ?? ""}
        </p>
      </div>
      <div className="conversation-body" ref={scrollBar}>
        {conversations.map(({ text, from, timestamp }) => {
          const userDetails = getUserDetails(from, allUsers);
          const isMe = userDetails?.uid === authUser?.uid;
          return (
            <div className={`conversation-tile ${isMe ? "isMe" : ""}`}>
              <img
                src={userDetails?.photoURL ?? ""}
                alt={userDetails?.displayName ?? ""}
              />
              <div className="message">
                <p className="text-base">{text}</p>
                <p className="text-xs text-gray-500">
                  {timestamp?.toDate().toLocaleString("en-IN", {
                    timeStyle: "short",
                    dateStyle: "medium",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="conversation-input-area w-full mx-auto pt-4 flex gap-8 border-t-2">
        <input
          type="text"
          onChange={(e) => setTextField(e.target.value)}
          value={textField}
          className="px-2 py-[2px] border-2"
          placeholder="Type a message"
        />
        <span
          onClick={sendMessage}
          className="btn btn-primary flex justify-center"
        >
          <Send />
        </span>
      </div>
    </div>
  );
}
