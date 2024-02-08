import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadsCard from "../cards/ThreadsCard";
import { currentUser } from "@clerk/nextjs";

type props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};
const ThreadsTab = async ({ currentUserId, accountId, accountType }: props) => {
  const threads = await fetchUserPosts(accountId);
  if (!threads) redirect("/");
  return (
    <section className="flex flex-col gap-10 mt-9">
      {threads &&
        threads.threads.map((thread: any) => (
          <ThreadsCard
            id={thread._id}
            key={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            auther={
              accountType === "User"
                ? { name: threads.name, image: threads.image, id: threads.id }
                : {
                    name: threads.auther.name,
                    image: threads.auther.image,
                    id: threads.auther.id,
                  }
            }
            commuinty={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        ))}
    </section>
  );
};

export default ThreadsTab;
