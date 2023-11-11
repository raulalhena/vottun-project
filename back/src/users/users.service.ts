import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { AssignNonceDto } from './dto/assign-nonce.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  generateNonce() {
    return (Math.random() * 100000).toFixed(0);
  }

  async checkSignature() {
    return true;
  }

  async signIn(signInDto: SignInDto) {
    console.log(signInDto.address);
    console.log(signInDto.signature);
    try {
      const user = await this.userModel.findOne({ address: signInDto.address });
      return String(user.nonce) === signInDto.signature;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async assignNonce(assignNonceDto: AssignNonceDto) {
    try {
      const nonce = this.generateNonce();
      const user = await this.userModel.findOne({ address: assignNonceDto.address });
      if (!user) this.create({ address: assignNonceDto.address });
      const updatedUser = await this.userModel.findOneAndUpdate(
        { address: assignNonceDto.address },
        { nonce: nonce },
        { new: true },
      );
      return updatedUser.nonce;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.userModel.find();
      return allUsers;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
