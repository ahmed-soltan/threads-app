import AccoutProfile from '@/components/forms/AccoutProfile'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
const page = async() => {
  const user = await currentUser()
  const userInfo = await fetchUser(user?.id);
  
  const userData = {
    userId : user?.id || '',
    objectId : userInfo?._id ,
    username : userInfo?.username || user?.username ,
    name :userInfo?.name || user?.firstName || "",
    bio : userInfo?.bio || "",
    image : userInfo?.image || user?.imageUrl || "",
  }
  return (
    <main className='mx-auto flex flex-col justify-start px-10 py-20 max-w-3xl'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-light-2 text-base-regular'>Compelete Your Proile Now To use Threads</p>
      <section className='bg-dark-2 mt-9 p-10'>
        <AccoutProfile user={userData} btnTitle = "continue" />
      </section>
    </main>
  )
}

export default page