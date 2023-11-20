import { ObjectId } from "mongoose";

export class UpdateUserDto{
    _id: ObjectId;
    address: string;
    image: string;
}