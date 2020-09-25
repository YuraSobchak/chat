import mongoose, {Schema, Document} from 'mongoose';

export interface IMessage extends Document {
    text: {
        type: string;
        require: boolean;
    };
    dialog: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    read: {
        type: boolean;
        default: boolean;
    };
}

const MessageSchema: Schema = new Schema(
    {
        text: { type: String, require: Boolean },
        dialog: { type: Schema.Types.ObjectId, ref: "Dialog" },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        read: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;
