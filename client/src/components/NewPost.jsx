import React, { Component }               from 'react'
import { saveNewPost } from '../api/PostsApi';

class NewPost extends Component {

  state = {
    title: '',
    content: ''
  }

  handleChange = e => {
    let newValue = e.target.value;
    let key = e.target.name;
    this.setState({
      [key]: newValue
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    saveNewPost(this.state).then(result => {
      if (result.success)
        this.props.history.push('/');
      else
        alert(result.errors[0]);
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="content">Content: </label>
          <textarea name="content" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>
        </p>
        <input type="submit" value="Create Post" />
      </form>
    )
  }
}

export default NewPost