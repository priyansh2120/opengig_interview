import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    runningStatus: {
        type: String,
        enum: ['running', 'paused'],
        default: 'paused',
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
    },
    timeUpdated: {
        type: Date,
        default: Date.now,
    },
    activeTime: {
        type: Number,
        default: 0,
    },
});

TaskSchema.pre('save', function (next) {
    this.timeUpdated = Date.now();
    next();
});

export default mongoose.model('Task', TaskSchema);