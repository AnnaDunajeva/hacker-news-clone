import React from 'react'
import {fetchStories, fetchPosts, fetchStoriesIds} from '../utils/api.js'
import Loading from './Loading.js'
import PostList from './PostList.js'
import InfiniteScrollUtil from './InfiniteScrollUtil'

class Top extends React.Component {
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
        fetchStoriesIds('top', this.controller.signal)
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


// class Top extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             ids: [],
//             fetchStart: 0,
//             fetchAmount: 20,
//             posts: [],
//             loading: true,
//             errorIds: null,
//             errorPosts: null,
//             hasMore: true
//         }
//         this.fetchStoriesPosts = this.fetchStoriesPosts.bind(this)
//     }
//     componentDidMount () {
//         fetchStoriesIds('top')
//         .then((ids)=>{
//             this.setState({
//                 errorIds: null,
//                 ids: ids
//             }, this.fetchStoriesPosts)
//         })
//         .catch((error) => {
//             console.warn('Error fetching ids: ', error)
//             this.setState({
//               errorIds: `There was an error fetching the posts ids.`,
//               loading: false
//             })
//         })
//     }
//     fetchStoriesPosts () {
//         console.log('fetching')
//         const {ids, fetchAmount, fetchStart} = this.state;
//         let idsToFetch = []
//         console.log(this.state)
//         if (fetchStart >= ids.length) {
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
//         console.log(idsToFetch)
//         fetchPosts (idsToFetch)
//         .then((newPosts)=>{
//             this.setState((state) => ({
//                 posts: state.posts.concat(newPosts),
//                 fetchStart: state.fetchStart + state.fetchAmount,
//                 loading: false //super ugly (because I have to set it each time extra stuff loads and not only on initial landid, but it works (meaning there is correct loading element on initial landidg))
//             }))
//         })
//         .catch((error) => {
//             console.warn('Error fetching posts: ', error)
//             this.setState({
//               errorPosts: `There was an error fetching the posts ids.`,
//               loading: false
//             })
//         })
//     }
//     render () {
//         const {posts, loading, error, hasMore} = this.state;
//         return (
//             <div>
//                 {loading 
//                     ? <Loading text='Fetching stories' speed={200}/>
//                     : error
//                         ? <div>{error}</div>
//                         :<InfiniteScroll
//                             dataLength={this.state.posts.length}
//                             next={this.fetchStoriesPosts}
//                             hasMore={hasMore}
//                             loader={<Loading text='Fetching more' speed={200}/>}
//                             endMessage={
//                                 <p style={{ textAlign: "center" }}>
//                                   <b>Yay! You have seen it all</b>
//                                 </p>}
//                         >
//                             <PostList posts={posts}/>
//                         </InfiniteScroll>
//                 }
//             </div>
//         )
//     }
// }

// class Top extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             posts: [],
//             loading: true,
//             error: null
//         }
//     }
//     componentDidMount () {
//         fetchStories('top')
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

export default Top;