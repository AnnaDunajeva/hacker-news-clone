import React from 'react'
import {ThemeContext} from '../context/ThemeContext.js'
import {Link} from 'react-router-dom'
import {convertTime} from '../utils/helpers.js'

class PostMetaInfo extends React.Component {
    static contextType = ThemeContext; 
    render () {
        const {post} = this.props;
        const {isLight} = this.context;
        const theme = isLight? 'light' : 'dark';
        return (               
            <p className={`post-meta`}>
                by <Link 
                        to={`/user?id=${post.by}`} 
                        className={`meta-link-${theme}`}
                    >
                            {post.by}
                    </Link>{' '}
                on {convertTime(post.time) + ' '}
                {post.type === 'story' && 
                    <span>
                        with <Link 
                                to={`/post?id=${post.id}`} 
                                className={`meta-link-${theme}`}
                                >
                                    {post.descendants.toLocaleString() + ' ' + (post.descendants === 1 ?'comment':'comments') }
                            </Link>{' '}
                    </span>}
                </p>
        )
    }
}

export default PostMetaInfo;