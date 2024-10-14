import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserStatus } from '../user/user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: Date;

  @Prop({ required: true, default: UserStatus.ACTIVE, enum: UserStatus })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
