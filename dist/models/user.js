import { Schema, model } from 'mongoose';
// Create the User schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});
// Create a virtual property `friendCount` that retrieves the length of the user's friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Create the User model using the userSchema
const User = model('User', userSchema);
export default User;
