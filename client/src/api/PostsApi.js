import { Call } from './ApiUtils';

export const fetchPostsList = () => {
  return Call(
    'get',
    '/api/v1/posts',
    {},
    {
      responseDataKeys: { posts: 'posts' }
    },
  );
};

export const saveNewPost = post => {
  return Call(
    'post',
    '/api/v1/posts',
    post,
  );
}