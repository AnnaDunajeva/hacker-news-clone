import React from 'react'
import {fetchComments} from '../utils/api.js'
import Loading from './Loading.js'
import PostMetaInfo from './PostMetaInfo.js'
import {ThemeContext} from '../context/ThemeContext.js'
import MoreComments from './MoreComments.js'
const uuidv1 = require('uuid/v1');

//shows max 50 comments, because makes only one fetch
class ChildComments extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            loading: true,
            comments: [],
            fetchAmount: 50,
            error: null
        }
        this.fetchCommentsData = this.fetchCommentsData.bind(this)
    }
    static contextType = ThemeContext; 
    componentDidMount () {
            this.fetchCommentsData ()
    }

    fetchCommentsData () {
        const {fetchAmount} = this.state;
        const ids = this.props.post.kids;
        let idsToFetch = ids.slice(0, fetchAmount)

        fetchComments(idsToFetch)
        .then((newComments)=>{
            this.setState((state) => ({
                comments: state.comments.concat(newComments),
                loading: false 
            }))
        })
        .catch((error) => {
            console.warn('Error fetching comments: ', error)
            this.setState({
              error: `There was an error fetching the comments.`,
              loading: false
            })
        })
    }
    
    render() {
        const {comments, loading, error} = this.state;
        const {isLight} = this.context;
        const theme = isLight? 'light' : 'dark';
        return (
            <React.Fragment>
                {loading 
                    ? <Loading text='Fetching more comments' speed={200}/>
                    : error
                        ? <div>{error}</div>
                        :comments.map((comment) => (
                            <React.Fragment key={uuidv1()}>
                                <div className={`comment bg-${theme}`}>
                                    <PostMetaInfo post={comment}/>
                                    <p className='comment-text' dangerouslySetInnerHTML={{__html: comment.text}}/>
                                </div>
                                {comment.kids && <MoreComments comment={comment}/>}
                            </React.Fragment>
                ))}
            </React.Fragment>
                    
        )
    }
}

export default ChildComments;