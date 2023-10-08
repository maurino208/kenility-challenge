
import { InjectModel } from "@nestjs/mongoose";
import { Image, User } from "./schema/user.schema";
import mongoose from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    if(Object.keys(users).length === 0) {
      throw new NotFoundException("There are no users");
    }

    return users;
  }

  async create(profilePicture: Express.Multer.File, user: User): Promise<User> {
    const createdUser = new this.userModel({
      name: user.name,
      lastname: user.lastname,
      address: user.address,
    })
    createdUser.profilePicture = {
      data: profilePicture.buffer,
      name: profilePicture.originalname,
    };

    const res = await this.userModel.create(createdUser);
    return res;
  }

  async update(profilePicture: Express.Multer.File, id: string, user: User): Promise<User>{
    user.profilePicture = {
      data: profilePicture.buffer,
      name: profilePicture.originalname,
    };
    return await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true
    });  
}
}
