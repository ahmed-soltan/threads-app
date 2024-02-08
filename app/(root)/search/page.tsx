import ThreadsCard from "@/components/cards/ThreadsCard";
import UserCard from "@/components/cards/UserCard";
import Comment from "@/components/forms/Comment";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList , TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { table } from "console";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async () => {

    const user = await currentUser();
    if (!user?.id) return null;
  
    const userInfo = await fetchUser(user?.id);
    if (!userInfo.onboarded) return redirect("/onboarding");
    const result = await fetchAllUsers({
        userId: user.id, // Remove JSON.stringify()
        pageNumber: 1,
        pageSize: 20,
        searchString: ""
    })
    
  return (
    <section>
        <h1 className='head-text text-light-1'>Search</h1>
        <div className="mt-10">
            {result?.users.length === 0 ?(
                <p className="no-result">Oops, No Users Yet.</p>
            ):(
                <div>
                    {result?.users.map((user) => (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            image={user.image}
                            type="User"
                        />
                    ))}
                </div>
            )}
        </div>
    </section>
  )
}

export default page