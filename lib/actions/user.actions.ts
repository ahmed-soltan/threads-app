"use server";
import { useAuth } from "@clerk/nextjs";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { ConnectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

type params = {
  userId: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  // onboarded:boolean
  path: string;
};

export const updateUser = async ({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: params) => {
  await ConnectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, image, bio, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    console.log("failed to create the user", error);
  }
};

export const fetchUser = async (userId: string | undefined) => {
  await ConnectToDB();

  try {
    const user = await User.findOne({ id: userId });
    return user;
  } catch (error) {
    console.log("user not found", error);
  }
};
export const fetchUserPosts = async (userId: string | undefined) => {
  await ConnectToDB();

  try {
    const thread = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "auther",
          model: User,
          select: "name image id",
        },
      },
    });
    return thread;
  } catch (error) {
    console.log("user not found", error);
  }
};

export const fetchAllUsers = async ({
  userId,
  pageNumber = 1,
  pageSize = 20,
  searchString = "",
  sortBy = "desc",
}: {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
  searchString?: string;
  sortBy?: SortOrder;
}) => {
  ConnectToDB();

  try {
    const skipAmount = (pageNumber - 1) * pageSize;
    const regx = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };
    if (searchString.trim() !== "") {
      query.$or = [{ username: { $regex: regx } }, { name: { $regex: regx } }];
    }

    const sortOptions = {
      CreatedAt: sortBy,
    };

    const userQuery = await User.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(skipAmount);

    const totalUserCount = await User.countDocuments(query);

    const users = await userQuery.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      image: user.image,
      bio: user.bio,
      onboarded: user.onboarded,
    }));
    const isNext = totalUserCount > skipAmount + users.length;

    return { isNext, users, userQuery };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getActivity = async (userId: string) => {
  ConnectToDB();

  try {
    const userThreads = await Thread.find({ auther: userId });
    const childThreads = await userThreads.reduce((acc: any, thread: any) => {
      return acc.concat(thread.children);
    },[]);

    const replies = await Thread.find({
      _id: { $in: childThreads },
      auther: { $ne: userId },
    }).populate({
      path: "auther",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error:any) {
    console.log(error.message)
  }
};
