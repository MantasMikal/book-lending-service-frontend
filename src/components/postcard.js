import React from 'react';
import { Card } from 'antd';
import PostIcon from './posticon';
import NavImage from './navimage';

const { Meta } = Card;

class PostCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
  }

  toggleLike(isSelected) {
    console.log(`toggle LIKE on post ${this.props.ID}`);
    console.log(`new value ${isSelected}`);
    // code can be added here to update the API with new liked status
  }

  togglePinned(isSelected) {
    console.log(`toggle PINNED on post ${this.props.ID}`);
    console.log(`new value ${isSelected}`);
    // code can be added here to update the API with new pinned status
  }

  render() {
    const postID = this.props.ID;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Post ${postID}`} src={this.props.imageURL} to={`/post/${postID}`} />}
        hoverable={true}
        actions={[
          <PostIcon type="like" countLink={this.props.links.likes} selected={this.props.liked}
              handleToggle={this.toggleLike} id={postID}/>,
          <PostIcon type="message" countLink={this.props.links.comments} viewOnly={true} id={postID}/>,
          <PostIcon type="pushpin" selected={this.props.pinned}
              handleToggle={this.togglePinned} id={postID}/>
        ]}>
        
        <Meta title={this.props.title} description={this.props.summary} />
      </Card>
    );
  }
}

export default PostCard; 
