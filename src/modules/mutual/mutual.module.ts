import { Module } from '@nestjs/common';
import { MutualController } from './mutual.controller';
import { MutualService,  } from './mutual.service';
import { MutualFeatured } from './mutual.schema';


@Module({
  imports: [MutualFeatured],
  controllers: [MutualController],
  providers: [MutualService],
  exports: [MutualService]
})
export class MutualModule {}
