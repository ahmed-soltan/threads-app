import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  
  if(!userInfo?.onboarded) redirect('/onboarding');
  return (
    <div>
      <h1 className="head-text">
        Create Thread
        <PostThread userId={userInfo._id}/>
        </h1>
    </div>
  );
};

export default page;
