import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  address: string;
  @Prop()
  nonce: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
