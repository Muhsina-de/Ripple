import { Schema, model, Document, Types } from 'mongoose';
import dateFormat from '../utils/dateFormat';

interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Create the Reaction schema
const reactionSchema = new Schema<IReaction>({
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
    get: function (timestamp: Date): string {
      return dateFormat(timestamp);
    }
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
});

// Create the Thought schema
const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (timestamp: Date): string {
      return dateFormat(timestamp);
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;