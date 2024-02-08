import { UserButton } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadsCard from "../../components/cards/ThreadsCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  let userId = "";
  if (user?.id) {
    userId = user.id;
  }

  const result = await fetchPosts(1, 30);
  const userInfo = await fetchUser(user?.id);
  if (!userInfo.onboarded) return redirect("/onboarding");
  // console.log(result.posts?.auther.id)
  return (
    <div className="h-screen">
      <h1 className="head-text text-left">Home</h1>
      <section className="flex flex-col justify-start gap-10 mt-9">
        {result.posts.length === 0 ? (
          <p className="no-result">Oops, No Posts Yet.</p>
        ) : (
          result.posts.map((post) => (
            <ThreadsCard
              id={post._id}
              key={post._id}
              currentUserId={userId || ""}
              parentId={post.parentId}
              content={post.text}
              auther={post.auther}
              commuinty={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))
        )}
      </section>
    </div>
  );
}
