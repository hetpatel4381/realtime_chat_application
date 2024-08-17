import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

const createChannel = async (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.userId;

    if (!name || !members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).send("Channel name and members are required!");
    }

    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(404).send("Admin not found!");
    }

    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      return res.status(400).send("Some members are not valid users!");
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();

    return res.status(201).json({ channel: newChannel });
  } catch (error) {
    console.error("Error creating channel:", error);
    return res.status(500).send("Internal Server Error!");
  }
};

const getUserChannels = async (req, res) => {
  try {
    const userId = req.userId;

    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });

    return res.status(200).json({ channels });
  } catch (error) {
    console.error("Error fetching user channels:", error);
    return res.status(500).send("Internal Server Error!");
  }
};

const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName _id email image color",
      },
    });

    if (!channel) {
      return res.status(404).send("Channel not found!");
    }

    const messages = channel.messages;

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    return res.status(500).send("Internal Server Error!");
  }
};

export { createChannel, getUserChannels, getChannelMessages };
