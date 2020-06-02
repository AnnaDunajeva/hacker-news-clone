import React from 'react'
import {fetchPosts, fetchStoriesIds} from '../utils/api.js'
import Loading from './Loading.js'
import PostList from './PostList.js'
import InfiniteScrollUtil from './InfiniteScrollUtil'

class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ids: [],
            loading: true,
            error: null
        }
        this.controller = new AbortController();
    }
    componentDidMount () {
        fetchStoriesIds('new', this.controller.signal )
        .then((ids)=>{
            this.setState({
                error: null,
                ids: ids,
                loading: false
            })
        })
        .catch((error) => {
            console.warn('Error fetching ids: ', error)
            this.setState({
              errorIds: `There was an error fetching the posts ids.`,
              loading: false
            })
        })
    }
    componentWillUnmount(){
        this.controller.abort();
      }
    render () {
        const {loading, error, ids} = this.state;
        return (
            <div>
                {loading 
                    ? <Loading text='Fetching stories' speed={200}/>
                    : error
                        ? <div>{error}</div>
                        :<InfiniteScrollUtil
                            fetchAmount = {50}
                            fetchFunc = {fetchPosts}
                            ids = {ids}
                            text = {'Fetching stories'}
                            speed = {200}
                        >
                            {(posts)=>(<PostList posts={posts}/>)}
                        </InfiniteScrollUtil>
                }
            </div>
        )
    }
}

// class New extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             posts: [],
//             loading: true,
//             error: null
//         }
//     }
//     componentDidMount () {
//         fetchStories('new')
//         .then((posts)=>{
//             this.setState({
//                 posts: posts,
//                 loading: false,
//                 error: null
//             })
//         })
//         .catch((error) => {
//             console.warn('Error fetching posts: ', error)
//             this.setState({
//               error: `There was an error fetching the posts.`,
//               loading: false
//             })
//         })
//     }
//     render () {
//         const {posts, loading, error} = this.state;
//         return (
//             <div>
//                 {loading && <Loading text='Fetching stories' speed={200}/>}
//                 {error && <div>{error}</div>}
//                 <PostList posts={posts}/>
//             </div>
//         )
//     }
// }

export default New;