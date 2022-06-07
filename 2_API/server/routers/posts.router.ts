import Router from 'koa-router';
import { createCommentToPost } from '../controllers/posts/comments/create-comment-to-post.controller';
import { giveLikeToComment } from '../controllers/posts/comments/likes/give-like-to-comment.controller';
import { removeLikeFromComment } from '../controllers/posts/comments/likes/remove-like-from-comment.controller';
import { createPostWithMedia } from '../controllers/posts/create-post-with-media.controller';
import { createPost } from '../controllers/posts/create-post.controller';
import { giveLikeToPost } from '../controllers/posts/likes/give-like-to-post.controller';
import { removeLikeFromPost } from '../controllers/posts/likes/remove-like-from-post.controller';
import { getSignedUrlForUploadingPostImage } from '../controllers/posts/post-image/get-signed-url-for-uploading-post-image.controller';

const postsRouter = new Router({ prefix: '/posts' });

postsRouter.post('/', createPost);
postsRouter.post('/with-media', createPostWithMedia);
postsRouter.post('/like/:postId/:likeId', giveLikeToPost);
postsRouter.delete('/like/:likeId', removeLikeFromPost);
postsRouter.post('/comment/:postId/:commentId', createCommentToPost);
postsRouter.post('/comment/like/:commentId/:likeId', giveLikeToComment);
postsRouter.delete('/comment/like/:likeId', removeLikeFromComment);



postsRouter.post(
  '/get-signed-url-for-uploading-post-image',
  getSignedUrlForUploadingPostImage
);

export { postsRouter };
