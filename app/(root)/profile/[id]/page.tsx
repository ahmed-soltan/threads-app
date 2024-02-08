import ThreadsCard from "@/components/cards/ThreadsCard";
import Comment from "@/components/forms/Comment";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList , TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { table } from "console";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user?.id) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo.onboarded) return redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user?.id}
        name={userInfo.name}
        image={userInfo.image}
        username={userInfo.username}
        bio={userInfo.bio}
      />
      <div className="mt-10">
        <Tabs defaultValue="thread" className="w-full">
            <TabsList className="tab">
                {profileTabs.map(tab=>(
                    <TabsTrigger key={tab.label} className="tab" value={tab.value}>
                        <Image src={tab.icon} alt={tab.label} width={24} height={24} className="object-contain"/>
                        <p className="text-light-1 max-sm:hidden">{tab.label}</p>

                        <div>
                            {tab.label==="Threads" && (
                                <div>
                                    <p className="text-light-2 ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium ">{userInfo.threads.length}</p>
                                </div>
                            )}
                        </div>
                    </TabsTrigger>
                ))}
            </TabsList>
            {profileTabs.map(tab=>(
                    <TabsContent key={tab.label} className="w-full" value={tab.value}>
                        <ThreadsTab
                           currentUserId={user?.id}
                           accountId={userInfo?.id}
                           accountType="User"
                        />
                    </TabsContent>
                ))}
        </Tabs>
      </div>
    </section>
  );
};

export default page;
