import { Server as SocketIOServer } from "socket.io";
import { config } from "./config/index.js";
import Message from "./models/MessagesModel.js";
import Channel from "./models/ChannelModel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: config.frontendOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message) => {
    try {
      const { channelId, sender, content, messageType, fileUrl } = message;
      const createdMessage = await Message.create({
        sender,
        channelId,
        content,
        messageType,
        timestamp: new Date(),
        fileUrl,
      });

      // Update the channel to include the new message
      await Channel.findByIdAndUpdate(channelId, {
        $push: { messages: createdMessage._id },
      });

      // Populate sender information
      const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .exec();

      // Fetch channel details including members and admin
      const channel = await Channel.findById(channelId).populate(
        "members admin messages"
      );
      
      if (channel) {
        const recipients = new Set([...channel.members, channel.admin]);

        recipients.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("receive-channel-message", messageData);
          }
        });
      }
    } catch (error) {
      console.error("Error sending channel message:", error);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
