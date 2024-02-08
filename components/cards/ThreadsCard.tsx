import Image from "next/image";
import Link from "next/link";
import Heart from "../../assets/heart-gray.svg";
import replay from "../../assets/reply.svg";
import repost from "../../assets/repost.svg";
import share from "../../assets/share.svg";
type props = {
  id: string;
  currentUserId: string;
  parentId: string;
  content: string;
  auther: {
    name: string;
    image: string;
    id: string;
  };
  commuinty: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: {
    auther: {
      image: string;
    };
  }[];
  createdAt: string;
  isComment?: boolean;
};

export default function ThreadsCard({
  id,
  currentUserId,
  parentId,
  content,
  auther,
  commuinty,
  createdAt,
  comments,
  isComment,
}: props) {
  console.log(auther)
  return (
    <article className={`flex w-full flex-col  ${isComment? "px-0 sm:px-7 " : "bg-dark-2 rounded-xl p-7"}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-row flex-1 gap-4">
          <div className={`${isComment? "mb-10":""} flex flex-col items-center`}>
            <Link href={`/profile/${auther.id}`}>
              <Image
                src={auther.image}
                alt={auther.name}
                width={40}
                height={40}
                className="cursor-pointer object-contain rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${auther.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {auther.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src={Heart}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src={replay}
                    alt="replay"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src={repost}
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src={share}
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-light-3">{comments.length} Replies</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
