import { UserRole } from '@domain/entities/user/user-role';
import { UniqueEntityID } from '@domain/value-objects/unique-identity-id.value';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserModel extends Document {
  id: UniqueEntityID;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: Date;
  emailVerified: boolean;
  isDeleted: boolean;
}

const userSchema = new Schema<IUserModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'User', 'SuperAdmin'], required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emailVerified: { type: Boolean, default: false },
});

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
