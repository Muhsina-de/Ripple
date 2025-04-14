import { Schema, model, Types } from 'mongoose';
import dateFormat from '../utils/dateFormat.js';
// Create the Reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        getters: true,
        transform(_doc, ret) {
            if (ret.createdAt) {
                ret.createdAt = dateFormat(ret.createdAt);
            }
            return ret;
        }
    },
    id: false
});
// Create the Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        unique: false,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        transform(_doc, ret) {
            if (ret.createdAt) {
                ret.createdAt = dateFormat(ret.createdAt);
            }
            return ret;
        }
    },
    id: false
});
// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);
export default Thought;
