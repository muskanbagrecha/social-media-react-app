import { FeedNavigation } from "../homepage/components";
import { MainProfile, YourFollowers } from "./components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { WhoToFollow } from "../homepage/components";
import { useParams } from "react-router-dom";

export const Profilepage = () => {
  const [currentUserid, setCurrentUserId] = useState("");
  const { uid } = useParams();
  useEffect(() => {
    if (uid) {
      setCurrentUserId(uid);
    }
  }, [uid]);

  const { authUser } = useSelector((store: any) => store.auth);
  return (
    <div className="container max-w-[1100px] flex flex-col md:flex-row lg:flex-row p-2">
      <FeedNavigation />
      <MainProfile />
      {authUser?.id === currentUserid ? <WhoToFollow /> : <YourFollowers />}
    </div>
  );
};
