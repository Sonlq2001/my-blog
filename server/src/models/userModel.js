import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
		coverPhoto: {
			type: String,
			required: true,
		},
		description: { type: String, maxLength: 600, required: true },
		savePost: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
		refresh_token: { type: String, select: false },
	},
	{ timestamps: true }
);

export default mongoose.model("users", userSchema);
