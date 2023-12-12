import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'; dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

console.log('TOKEN_SECRET:', tokenSecret);
console.log('DB_USERNAME:', dbUsername);
console.log('DB_PASSWORD:', dbPassword);

let username = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    options = 'retryWrites=true&w=majority',
    url = 'test-crud.z2cjr.azure.mongodb.net/';

export const MongoModule = MongooseModule
    .forRoot(`mongodb+srv://${username}:${password}@${url}?${options}`);
    