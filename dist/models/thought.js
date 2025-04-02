import { Schema, model, Types } from 'mongoose';
import dateFormat from '../utils/dateFormat';
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
        default: Date.now,
        get: (value) => dateFormat(value) // Modify here, use value directly
    }
}, {
    toJSON: {
        getters: true
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
        default: Date.now,
        get: (value) => dateFormat(value) // Ensure the return type is string
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
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
