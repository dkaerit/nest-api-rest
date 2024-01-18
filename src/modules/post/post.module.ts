import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService,  } from './post.service';
import { PostFeatured } from './post.schema';
import { MutualModule } from '../mutual/mutual.module';

// middlewares
import { AppGateway } from '../../midlewares/websocketGateway';

@Module({
  imports: [PostFeatured, MutualModule],
  controllers: [PostController],
  providers: [PostService, AppGateway],
  exports: [PostService]
})
export class PostModule {}
