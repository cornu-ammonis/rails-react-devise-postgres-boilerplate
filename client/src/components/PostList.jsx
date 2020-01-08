import React, { Component }               from 'react'
import { Link }                           from 'react-router-dom'
import { fetchPostsList } from '../api/PostsApi';

class PostList extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    fetchPostsList()
      .then(result => {
        if (result.success)
          this.setState({ posts: result.posts });
        else
          alert(result.errors[0]);
      })
  }

  renderPosts = () => {
    return this.state.posts.map(post => {
      return (
        <div key={post.id}>
          {post.title} - {post.content}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        PostList Component
        {this.renderPosts()}
        <Link to="/posts/new">Add a New Post</Link>
      </div>
    )
  }
}

export default PostList
