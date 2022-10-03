import { Schema } from 'mongoose';

// Data Transfer Object. Used in controllers
export class UserDTO {
  readonly user: string;
  readonly email: string;
  readonly passwd: string;
}

// Mongoose Schema. Imported in Modules
export const UserSchema = new Schema({
    name: String,
    email: { type: String, required: true},
    passwd: String
});

interface User {
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
}