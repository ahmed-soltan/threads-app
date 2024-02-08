"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { ConnectToDB } from "../mongoose";
import mongoose from "mongoose";

type paramsType = {
  text: string;
  auther: string;
  communityId: string | null;
  path: string;
};
export const CreateThread = async ({
  text,
  auther,
  communityId,
  path,
}: paramsType) => {
  ConnectToDB();

  const createThread = await Thread.create({
    text: text,
    auther: auther,
    community: null,
  });

  await User.findByIdAndUpdate(auther, {
    $push: {
      threads: createThread._id,
    },
  });

  revalidatePath(path);
};
export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  ConnectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postQuery = Thread.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "auther", model: User })
    .populate({
      path: "children",
      populate: {
        path: "auther",
        model: User,
        select: "name image parentId _id",
      },
    });

  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postQuery;

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { isNext, posts };
};

export const fetchThread = async (threadId: string) => {
  ConnectToDB();

  try {
    const result = await Thread.findById(threadId)
      .populate({
        path: "auther",
        model: User,
        select: "name image parentId id",
      })
      .populate({
        path: "children",
        model:Thread,
        populate: [
          {
            path: "auther",
            model: User,
            select: "name image parentId id",
          },
          {
            path:"children",
            model:Thread,
            populate:{
              path:"auther",
              model:User,
              select:"name image parentId id"
            }
          }
        ],
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};


export const addCommentToThread = async (threadId: string, text: string, userId: string, path: string) => {
  ConnectToDB(); 
  try {
    const originalThread = await Thread.findById(threadId);

    const commentThread = new Thread({
      text: text,
      auther: userId,
      parentId: threadId
    });

    const savedComment = await commentThread.save();

    // Convert savedComment.id to a valid ObjectId

    // Push the converted ObjectId into originalThread.children
    await originalThread.children.push(savedComment);
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
  }
};