import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd'
import PostIcon from './posticon';
import { status, json } from '../utilities/requestHandlers';

const { Title, Paragraph } = Typography;

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: undefined
    }
    this.toggleLike = this.toggleLike.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()

    fetch(`http://localhost:3030/api/v1/articles/${id}`)
    .then(status)
    .then(json)
    .then(post => {
      this.setState({post:post})
    })
    .catch(err => {
      console.log(`Fetch error for post ${id}`)
    });
  }

  toggleLike(isSelected) {
    // Implement same functionality as in <PostCard>
    // To avoid repetition (DRY principle) the handler for this
    // and for <PostCard> should be defined in a single place
    // and imported into both components.
    console.log('like was toggled');
  }

  togglePinned(isSelected) {
    // Implement same functionality as in <PostCard>
    // To avoid repetition (DRY principle) the handler for this
    // and for <PostCard> should be defined in a single place
    // and imported into both components.
    console.log('pin was toggled');
  }

  render() {
    if (!this.state.post) {
      return <h3>Loading post...</h3>
    }
    const post = this.state.post;

    const icons = (
      <div>
        Likes : <PostIcon type="like" count={post.likes} selected={post.liked}
          handleToggle={this.toggleLike}/><br/>
        Comments : <PostIcon type="message" count={post.comments} viewOnly={true}/><br/>
        Pinned : <PostIcon type="pushpin" selected={post.pinned}
          handleToggle={this.togglePinned}/>
      </div>
    );

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Post" src={post.imageURL} />
          </Col>
          <Col span={12}>
            <Title>{post.title}</Title>
            <Paragraph>{post.allText}</Paragraph>
          </Col>
          <Col span={6} align="center">
            {icons}
          </Col>
        </Row>
      </div>
    );
  }

}

export default withRouter(Post);
