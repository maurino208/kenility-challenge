import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;
  @Prop()
  lastname: string;
  @Prop()
  address: string;
  @Prop( { type: Object } )
  profilePicture: {
    data: Buffer;
    name: string;
  };
}

@Schema()
export class Image extends Document {
  @Prop({ type: Buffer }) // Puedes usar el tipo Buffer para almacenar imágenes en formato binario
  data: Buffer;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
