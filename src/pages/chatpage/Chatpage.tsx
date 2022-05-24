import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import { User } from "../../store/auth-action/authSlice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-firestore";
interface ChatInterface {
  chatId: string;
  user: string[];
}

export const ChatPage = () => {
  const { authUser } = useSelector((state: any) => state.auth);
  const { allUsers } = useSelector((state: any) => state.allUsers);
  const navigate = useNavigate();
  const [allChats, setAllChats] = useState<ChatInterface[]>([]);

  useEffect(() => {
    if (authUser) {
      var unSub = onSnapshot(
        query(
          collection(db, `chats`),
          where("user", "array-contains", authUser?.uid)
        ),
        (snapshot) => {
          setAllChats(snapshot.docs.map((doc) => Object(doc.data())));
        }
      );
    }
    return () => {
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <div>
      <div className="chat-container">
        {allChats.length > 0 ? (
          allChats.map(({ chatId, user }) => {
            const userDetails = getUserDetails(
              user[1] === authUser?.uid ? user[0] : user[1],
              allUsers
            );
            return (
              <div
                className="chat-tile border-2 rounded-md my-2 hover:bg-primary-200 cursor-pointer"
                onClick={() => {
                  navigate(`/chat/conversation/${chatId}`);
                }}
              >
                <img
                  src={userDetails?.photoURL ?? ""}
                  alt={userDetails?.displayName ?? ""}
                  className="avatar avatar-md"
                />
                <p>{userDetails?.displayName ?? ""}</p>
              </div>
            );
          })
        ) : (
          <div>No chats</div>
        )}
      </div>
    </div>
  );
};

export const getUserDetails = (currentUser: string, allUsers: User[]) => {
  const userDetails = allUsers.find((user: User) => user.uid === currentUser);
  return userDetails;
};
