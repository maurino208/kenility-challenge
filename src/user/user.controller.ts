import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schema/user.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('new')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async createUser(@UploadedFile() profilePicture: Express.Multer.File, @Body() body): Promise<User> {
    return this.userService.create(profilePicture, body);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
    async updateUser(@UploadedFile() profilePicture: Express.Multer.File, @Param('id') id: string, @Body() body): Promise<User> {
        return this.userService.update(profilePicture, id, body);
    }
}
