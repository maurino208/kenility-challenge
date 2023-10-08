import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class AuthUser {
    @Prop( { unique: [true, 'Duplicate email entered'] } )
    email: string;
    @Prop()
    password: string
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);