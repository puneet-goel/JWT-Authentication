import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String
});

const UserMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;