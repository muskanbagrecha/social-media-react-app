// import { Moments } from "../moments/Moments";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CreatePost } from "../create-post/CreatePost";
import { Post } from "../post/Post";
import { db } from "../../../../firebase/firebase-firestore";
import "./MainFeed.css";
import { useSelector } from "react-redux";
interface Post {
  caption: string;
  image: string;
  createdAt: string;
  uid: string;
}

export const MainFeed: React.FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const { followingList } = useSelector((store: any) => store.auth);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const tempPosts = snapshot.docs.map((doc) => doc.data());
        const filteredPosts = followingList
          ? tempPosts.filter((post) => followingList.includes(post.uid))
          : tempPosts;
        console.log(filteredPosts, tempPosts);
        setPosts(tempPosts);
      }
    );
  }, []);

  return (
    <main className="w-full md:w-3/5 lg:w-3/5 flex flex-col main-feed rounded ">
      {/* <Moments /> */}
      <CreatePost />
      <div className="all-posts flex flex-col">
        {posts?.map((post: Post) => (
          <Post
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </main>
  );
};
