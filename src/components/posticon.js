import React from 'react';

import LikeOutlined from '@ant-design/icons/LikeOutlined';
import LikeFilled from '@ant-design/icons/LikeFilled';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import MessageFilled from '@ant-design/icons/MessageFilled';
import PushpinOutlined from '@ant-design/icons/PushpinOutlined';
import PushpinFilled from '@ant-design/icons/PushpinFilled';

import { status, json } from '../utilities/requestHandlers';

/**
 * @typedef {"filled" | "outlined"} theme
 * @typedef {"like" | "pushpin" | "message"} iconType
 */
         
/**
 * Determine the icon to be displayed
 * 
 * @param {theme} theme - design of icon
 * @param {iconType} iconType - icon to show
 * @returns {Object} - the correct Ant Design icon component
 */
function getIcon (theme, iconType) {
  let Icon;

  if (theme === 'filled') {
    if (iconType === 'like') {
      Icon = LikeFilled
    } else if (iconType === 'pushpin') {
      Icon = PushpinFilled
    } else if (iconType === 'message') {
      Icon = MessageFilled
    }
  } else if (theme === 'outlined') {
    if (iconType === 'like') {
      Icon = LikeOutlined
    } else if (iconType === 'pushpin') {
      Icon = PushpinOutlined
    } else if (iconType === 'message') {
      Icon = MessageOutlined
    }      
  }

  return Icon;
}
  
class PostIcon extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      selected: props.selected,
      count: 0
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if (this.props.viewOnly) {
      console.log('This icon is view only: preventing update');
      return;
    }
    //reverse the selected state with every click
    this.setState({selected: !this.state.selected});
  }

  componentDidMount() {
    if (!this.props.countLink) return;  // prevent fetch on parent mount
    fetch(this.props.countLink)
    .then(status)
    .then(json)
    .then(count => {
      this.setState({count:count})
    })
    .catch(err => {
      console.log(`${this.props.type} icon error for post ${this.props.id}`)
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.selected !== this.state.selected) {
      //run the handler passed in by the parent component
      this.props.handleToggle(this.state.selected);
    }
  }

  render(){
    const theme = this.state.selected ? 'filled' : 'outlined';
    const iconType = this.props.type;
    const Icon = getIcon(theme, iconType);

    //return a span that contains the desired icon
    //and a space then the counter
    //if the icon is clicked we will run onClick handler
    
    return (
      <span>
        <Icon
          onClick={this.onClick}
          style={{color:'steelblue'}} />
        {this.state.count}
      </span>
    );
  }
}

export default PostIcon;
