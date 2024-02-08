import ThreadsCard from "@/components/cards/ThreadsCard";
import Comment from "@/components/forms/Comment";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async({params}:{params:{id:string}}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user?.id) return null;

    const userInfo = await fetchUser(user.id);
    console.log(user.id)
    if(!userInfo.onboarded) return redirect('/onboarding');

    const thread = await fetchThread(params.id);
  return (
    <section className="relative">
        <div>
        <ThreadsCard
              id={thread?.id}
              key={thread?._id}
              currentUserId={user?.id || ""}
              parentId={thread?.parentId}
              content={thread?.text}
              auther={thread?.auther}
              commuinty={thread?.community}
              createdAt={thread?.createdAt}
              comments={thread?.children}
            />
        </div>
        <div className="mt-7">
        <Comment
          threadId={params.id}
          image={userInfo.image}
          userId={JSON.stringify(userInfo._id)}
        />

        </div>

        <div className="mt-10">
          {thread.children.map((child : any)=>(
            <ThreadsCard
              id={child?.id}
              key={child?._id}
              currentUserId={user?.id || ""}
              parentId={child?.parentId}
              content={child?.text}
              auther={child?.auther}
              commuinty={child?.community}
              createdAt={child?.createdAt}
              comments={child?.children}
              isComment
            />
          ))}
        </div>
    </section>
  )
}

export default page