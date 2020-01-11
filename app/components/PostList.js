import React from 'react'
import PostMetaInfo from './PostMetaInfo.js'
import PostHeader from './PostHeader.js'
const uuidv1 = require('uuid/v1');

class PostList extends React.Component {
    render () {
        const {posts} = this.props;
        return (
            <ul>
                {posts.map((post) => 
                    <li key={uuidv1()} className='post-li'>
                        <div className='row'>
                            <div className='score'>{post.score} <br/>{post.score === 1 ?'point':'points'}</div>
                            <div>
                                <PostHeader post={post} fontSize='22px' fontWeight='700'/>
                                <PostMetaInfo post={post}/>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
         
        )
    }
}

export default PostList;