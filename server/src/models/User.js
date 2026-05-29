import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['OWNER', 'MANAGER', 'SALES', 'PRODUCTION', 'DELIVERY', 'ACCOUNTANT'],
      default: 'SALES'
    },
    status: { type: String, enum: ['Online', 'Busy', 'Away', 'Offline'], default: 'Offline' },
    permissionOverrides: [{ key: String, enabled: Boolean }]
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = (password) => bcrypt.hash(password, 12);

export const User = mongoose.model('User', userSchema);
