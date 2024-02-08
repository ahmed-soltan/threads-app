import ThreadsCard from "@/components/cards/ThreadsCard";
import UserCard from "@/components/cards/UserCard";
import Comment from "@/components/forms/Comment";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchThread } from "@/lib/actions/thread.actions";
import {
  fetchUser,
  getActivity,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { table } from "console";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) return null;

  const userInfo = await fetchUser(user?.id);
  if (!userInfo.onboarded) return redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text text-light-1">Activity</h1>

      <div className="flex flex-col mt-10">
        {activity && activity.length > 0 ? (
          activity.map((reply:any) => (
            <Link key={reply.id} href={`/thread/${reply.parentId}`}>
                <article className="activity-card">
                   <Image src={reply.auther.image} alt="profile photo" width={40} height={40} className="rounded-full object-cover"/>
                   <p className="!text-small-regular text-light-1 mx-3">
                    <span className="mr-1 text-purple-300">
                      {reply.auther.name}
                    </span>{" "}
                    Replied To your Thread
                   </p>
                </article>
            </Link>
          ))
        ):
        <p className="no-result">Oops, No Replies Yet.</p>}
      </div>
    </section>
  );
};

export default page;
