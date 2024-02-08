import home from '../assets/home.svg'
import search from '../assets/search.svg'
import heart from '../assets/heart.svg'
import create from '../assets/create.svg'
import community from '../assets/community.svg'
import user from '../assets/user.svg'
import replay from '../assets/reply.svg'
import members from '../assets/members.svg'
import tag from '../assets/tag.svg'
export const sidebarLinks = [
    {
      imgURL: home,
      route: "/",
      label: "Home",
    },
    {
      imgURL: search,
      route: "/search",
      label: "Search",
    },
    {
      imgURL: heart,
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: create,
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: community,
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL:user,
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: replay },
    { value: "replies", label: "Replies", icon: members},
    { value: "tagged", label: "Tagged", icon: tag },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];