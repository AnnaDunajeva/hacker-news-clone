import React from 'react'
import {fetchComments} from '../utils/api.js'
import Loading from './Loading.js'
import PostMetaInfo from './PostMetaInfo.js'
import {ThemeContext} from '../context/ThemeContext.js'
import MoreComments from './MoreComments.js'
import InfiniteScroll from 'react-infinite-scroll-component';
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

// class Comments extends React.Component {
//     constructor(props) {
//         super(props) 
//         this.state = {
//             loading: true,
//             error: null,
//             comments: [],
//             hasMore: true,
//             fetchStart: 0,
//             fetchAmount: 20
//         }
//         this.fetchCommentsData = this.fetchCommentsData.bind(this)
//     }
//     static contextType = ThemeContext; 
//     componentDidMount () {
//         if (this.props.post.descendants !== 0) {
//             this.fetchCommentsData ()
//         } else {
//             this.setState ({
//                 loading: false
//             })
//         }
//     }
//     fetchCommentsData () {
//         const {fetchAmount, fetchStart} = this.state;
//         const ids = this.props.post.kids;
//         let idsToFetch = []
//         if (fetchStart >= ids.length || fetchStart > 200) { //limit amount of fetching
//             this.setState({
//                 hasMore: false
//             })
//             return;
//         }
//         if (fetchStart + fetchAmount > ids.length) {
//             idsToFetch = ids.slice(fetchStart)
//         } else {
//             idsToFetch = ids.slice(fetchStart, fetchStart + fetchAmount)
//         }
//         fetchComments(idsToFetch)
//         .then((newComments)=>{
//             this.setState((state) => ({
//                 comments: state.comments.concat(newComments),
//                 fetchStart: state.fetchStart + state.fetchAmount,
//                 loading: false //super ugly (because I have to set it each time extra stuff loads and not only on initial landid, but it works (meaning there is correct loading element on initial landidg))
//             }))
//         })
//         .catch((error) => {
//             console.warn('Error fetching comments: ', error)
//             this.setState({
//               error: `There was an error fetching the comments.`,
//               loading: false
//             })
//         })
//     }
//     render() {
//         const {loading, comments, error, hasMore} = this.state;
//         const {isLight} = this.context;
//         const theme = isLight? 'light' : 'dark';
//         return (
//             <div>
//                 {loading 
//                     ?<Loading text='Fetching Comments' speed={200}/>
//                     :error
//                         ?<div>{error}</div>
//                         :comments.length === 0
//                             ?<p className='comment-text'>No comment yet.</p>
//                             :this.props.childComment
//                                 ?<React.Fragment>
//                                     {comments.map((comment) => (
//                                         <React.Fragment key={uuidv1()}>
//                                             <div className={`comment bg-${theme}`}>
//                                                 <PostMetaInfo post={comment}/>
//                                                 <p className='comment-text' dangerouslySetInnerHTML={{__html: comment.text}}/>
//                                             </div>
//                                             {comment.kids && <MoreComments comment={comment}/>}
//                                         </React.Fragment>
//                                     ))}
//                                 </React.Fragment>
//                                 :<InfiniteScroll
//                                     dataLength={comments.length}
//                                     next={this.fetchCommentsData}
//                                     hasMore={hasMore}
//                                     loader={<Loading text='Fetching more' speed={200}/>}
//                                     endMessage={
//                                         <p style={{ textAlign: "center" }}>
//                                             <b>Yay! You have seen it all</b>
//                                         </p>}
//                                 >
//                                     {comments.map((comment) => (
//                                         <React.Fragment key={uuidv1()}>
//                                         <div className={`comment bg-${theme}`}>
//                                             <PostMetaInfo post={comment}/>
//                                             <p className='comment-text' dangerouslySetInnerHTML={{__html: comment.text}}/>
//                                         </div>
//                                         {comment.kids && <MoreComments comment={comment}/>}
//                                         </React.Fragment>
//                                     ))}
//                                 </InfiniteScroll>            
//                 }
//             </div>
//         )
//     }
// }

export default Comments;