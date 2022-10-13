import { isStringObject } from "util/types";
import { IsString, IsEmpty, IsEmail, IsNotEmpty} from "class-validator";

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string
}