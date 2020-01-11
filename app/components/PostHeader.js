import React from 'react'
import {ThemeContext} from '../context/ThemeContext.js'
import {Link} from 'react-router-dom'

class PostHeader extends React.Component {
    static contextType = ThemeContext; 
    render () {
        const {post, fontSize, fontWeight} = this.props;
        const {isLight} = this.context;
        const theme = isLight? 'light' : 'dark';
        const style = {
            fontSize: fontSize,
            fontWeight: fontWeight
        }
        return (
            <h1 style={{paddingBottom: '8px'}}>
                {post.url 
                    ?<a href={post.url} className={`post-link header-${theme}`} style={style}>{post.title}</a>
                    :<Link to={`/post?id=${post.id}`} className={`post-link header-${theme}`} style={style}>{post.title}</Link>
                }
            </h1>
        )
    }
}

export default PostHeader;