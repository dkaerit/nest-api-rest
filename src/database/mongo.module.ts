import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'; dotenv.config();

console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD)

let username = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    options = 'retryWrites=true&w=majority',
    url = 'test-crud.z2cjr.azure.mongodb.net/';

export const MongoModule = MongooseModule
    .forRoot(`mongodb+srv://${username}:${password}@${url}?${options}`);
    