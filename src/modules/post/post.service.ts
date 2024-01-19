import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import { CreatePostDto, GetPostsFilterDto } from './post.dto';
import { MutualService } from '../mutual/mutual.service';
import { AppGateway } from 'src/midlewares/websocketGateway';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly appGateway: AppGateway,
    private readonly mutualService: MutualService
  ) { }

  /**
   * Obtiene los posts paginados y opcionalmente filtrados.
   * #param page Número de página.
   * #param pageSize Tamaño de la página.
   * #param filters Filtros opcionales.
   * #returns Una lista de posts.
   */
  async getPosts(page: number, pageSize: number, filters?: GetPostsFilterDto): Promise<Post[]> {
    const skip = (page - 1) * pageSize;
    let query = this.postModel.find();

    // construir lista de condiciones
    if (filters?.authors?.length > 0) {
      const authorIds: string[] = filters.authors.map((author) => author.authorId);
      query = query.where('authorId').in(authorIds);
    } else if (filters?.globalAuthorType) {
      query = query.where('authorType').equals(filters.globalAuthorType);
    }

    //console.log("getPosts-page-pagesize", page, pageSize)
    //console.log("getPosts-filters-query", filters, querytext)

    //const query = filters ? this.postModel.find(filters) : this.postModel.find();
    const posts = await query.sort({ createdAt: -1 }).limit(pageSize).skip(skip).exec();
    return posts;
  }

  /**
   * Obtiene los IDs de los mutuals de un usuario.
   * #param userId ID del usuario.
   * #returns Una lista de IDs de mutuals.
   */
  async getMutuals(userId: string): Promise<string[]> {
    const mutuals = await this.mutualService.getUserMutuals(userId);
    const mutualIds = mutuals.map(mutual => (mutual.userId1 === userId) ? mutual.userId2 : mutual.userId1);
    return mutualIds;
  }

  /**
   * Crea un nuevo post y emite una notificación a los mutuals.
   * #param postDto Datos del post a crear.
   * #returns El post creado.
   */
  async createPost(postDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(postDto);
    const newPost = await createdPost.save();

    const mutualIds = await this.getMutuals(postDto.authorId);
    const channelId = this.appGateway.generateChannelId(postDto.authorId, mutualIds);

    // Emitir notificación de nuevo post al grupo de mutuals
    this.appGateway.sendNotificationToChannel(channelId, 'Nuevo post creado');

    return newPost;
  }

  /**
   * Elimina un post por su ID.
   * #param postId ID del post a eliminar.
   * #throws NotFoundException si el post no se encuentra.
   * #returns El post eliminado.
   */
  async deletePost(postId: string): Promise<Post> {
    const post = await this.postModel.findByIdAndDelete(postId).exec();

    if (!post)
    throw new Error(`Post with ID ${postId} not found`);

    return post;
  }
}
