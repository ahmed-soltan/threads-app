"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type props = {
  id: string;
  name: string;
  username: string;
  image: string;
  type: string;
};
const UserCard = ({ id, name, username, image, type }: props) => {
    const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-cart_avatar">
        <Image
          src={image}
          alt="photo"
          width={48}
          height={48}
          className="rounded-full "
        />
      </div>
      <div className="flex-1 text-ellipsis">
        <h4 className="text-base-semibold text-light-1">
          {name}
        </h4>
        <p className="text-small-regular text-gray-400">
          @{username}
        </p>
      </div>

      <Button className="user-card_btn" onClick={()=>router.push(`/profile/${id}`)}>View</Button>

    </article>
  );
};

export default UserCard;
