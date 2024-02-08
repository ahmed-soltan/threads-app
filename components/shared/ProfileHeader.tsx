import Image from "next/image";

type params = {
  accountId: string;
  authUserId: string;
  name: string;
  image: string;
  username: string;
  bio: string;
};

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  image,
  username,
  bio,
}: params) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 border border-primary-blue-4 rounded-full">
                <Image src={image} alt="profile image" fill className="object-contain rounded-full shadow-2xl"/>
            </div>
            <div className={"flex-1"}>
                <h2 className="text-left text-light-1 text-heading3-bold">{name}</h2>
                <p className="text-base-meduim text-gray-400">@{username}</p>
            </div>
        </div>
      </div>
        <p className="text-base-regular text-light-2 mt-6 max-w-lg">{bio}</p>
        <div  className="mt-10 h-0.5 w-full bg-dark-1"/>
    </div>
  );
};

export default ProfileHeader;
