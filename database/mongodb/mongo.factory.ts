import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from 'dotenv';

dotenv.config();
export const MongoFactory = MongooseModule.forRoot(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@test-crud.z2cjr.azure.mongodb.net/?retryWrites=true&w=majority`
);