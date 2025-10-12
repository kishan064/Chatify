import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uplaodResponse = await cloudinary.uploader.upload(image);
      imageUrl = uplaodResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {

    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getChatPartners = async (req, res) => {

  try {
    const loggedInUserId=req.user._id;

    //find all messages where the logged-in user is either the sender or receiver

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });


    const ChatPartnersIds=[
      ...new set (
        messages.map((map)=> 
            msg.senderId.toString()===loggedInUserId.toString()
             ? msg.receiverId.toString()
             : msg.senderId.toString()
      )),
    ];
  
  } catch (error) {}
};
  
