import React from 'react'
import queryString from 'query-string'
import {fetchItem} from '../utils/api.js'
import PostMetaInfo from './PostMetaInfo.js'
import PostHeader from './PostHeader.js'
import Loading from './Loading.js'
import Comments from './Comments.js'

class Post extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            loading: true,
            error: null,
            post: {}
        }
    }
    componentDidMount () {
        const {id} = queryString.parse(this.props.location.search);
        fetchItem(id)
        .then((post)=>{
            this.setState({
                loading: false,
                error: null,
                post: post
            })
        })
        .catch((error) => {
            console.warn('Error fetching posts: ', error)
            this.setState({
                loading: false,
                error: `There was an error fetching the post.`
            })
        })
    }
    render() {
        const {post, loading, error} = this.state;
        return (
            <div className='post-li'>
                {loading 
                    ?<Loading text='Fetching Post' speed={200}/>
                    :error
                        ?<div>error</div>
                        :<React.Fragment>
                            <PostHeader post={post} fontSize='30px' fontWeight='900'/>
                            <PostMetaInfo post={post}/>
                            {post.text && <p dangerouslySetInnerHTML={{__html: post.text}} className='comment-text'/>}
                            <Comments post={post} />
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default Post;