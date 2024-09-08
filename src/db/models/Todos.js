import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);