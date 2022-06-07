import { v4 as uuidv4 } from 'uuid';
import { dynamodbCreateNotification } from '../services/dynamodb/notifications/dynamodb-create-notification.service';
import { dynamodbGetPostMediaByPostId } from '../services/dynamodb/posts/dynamodb-get-post-media-by-post-id.service';

export const createNotificationUtil = async (
  post: any,
  postLikersNickname: string,
  userId: string
): Promise<any> => {
  const postMedia = await dynamodbGetPostMediaByPostId(post.id);

  const notification = {
    id: uuidv4(),
    seen: false,
    postLikersNickname,
    createdAt: Date.now(),
    userIdThisNotificationBelongsTo: post.userId,
    userId,
    postId: post.id,
    postText: post.text,
    postMediaUrl: postMedia ? postMedia.mediaUrl : false,
  };

  await dynamodbCreateNotification(notification);
};
