import React from 'react'
import {fetchComments} from '../utils/api.js'
import PostMetaInfo from './PostMetaInfo.js'
import {ThemeContext} from '../context/ThemeContext.js'
import MoreComments from './MoreComments.js'
import InfiniteScrollUtil from './InfiniteScrollUtil'
const uuidv1 = require('uuid/v1');

class Comments extends React.Component {
    static contextType = ThemeContext; 
    
    render() {
        const {isLight} = this.context;
        const theme = isLight? 'light' : 'dark';
        return (
            <div>
                <InfiniteScrollUtil
                    fetchAmount = {50}
                    fetchFunc = {fetchComments}
                    ids = {this.props.post.kids}
                    text = {'Fetching comments'}
                    speed = {200}
                >
                    {(comments) => comments.map(comment => 
                        <React.Fragment key={uuidv1()}>
                            <div className={`comment bg-${theme}`}>
                                <PostMetaInfo post={comment}/>
                                <p className='comment-text' dangerouslySetInnerHTML={{__html: comment.text}}/>
                            </div>
                            {comment.kids && <MoreComments comment={comment}/>}
                        </React.Fragment>
                    )}
                </InfiniteScrollUtil>            
            </div>
        )
    }
}

export default Comments;