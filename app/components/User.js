import React from 'react'
import {fetchUser, fetchPosts} from '../utils/api.js'
import queryString from 'query-string'
import {convertTime} from '../utils/helpers.js'
import PostList from './PostList.js'
import Loading from './Loading.js'
import { FaUser } from "react-icons/fa";
import InfiniteScrollUtil from './InfiniteScrollUtil'

class User extends React.Component {
    constructor (props) {
        super (props) 
        this.state={
            user: {},
            loading: true,
            error: null,
        }
        this.controller = new AbortController();
    }
    componentDidMount () {
        const {id} = queryString.parse(this.props.location.search);
        fetchUser(id, this.controller.signal)
        .then((user)=>{
            this.setState({
                loading: false,
                error: null,
                user: user
            })
        })
        .catch((error)=>{
            console.warn('Error fetching posts: ', error)
            this.setState({
                error: `There was an error fetching the user.`,
                loading: false
            })
        })
    }
    componentWillUnmount(){
        this.controller.abort();
      }
    render() {
        const {id, created, karma, about, submitted} = this.state.user;
        const {loading, error} = this.state;
        console.log(this.state.user)
        return (
            <div>
                {loading
                    ?<Loading text='Fetching user' speed={200}/>
                        : error
                            ? <div>{error}</div>
                            :<React.Fragment>
                                <div className='row' style={{padding: '60px 0'}}>
                                    <FaUser size={60}/>
                                    <div className = 'padding-left'>
                                        <h1 className='nav-link' style={{fontSize: '38px'}}>{id}</h1>
                                        <p className='post-meta'>joined {convertTime(created)}, has {karma} karma</p>
                                    </div>
                                </div>
                                {about && <p dangerouslySetInnerHTML={{__html: about}} className='comment-text padding-bottom'/>}
                                <h2 className='post-link' style={{fontSize: '30px'}}>Posts</h2>
                                {submitted !== 0 
                                    ?<InfiniteScrollUtil
                                        fetchAmount = {50}
                                        fetchFunc = {fetchPosts}
                                        ids = {submitted}
                                        text = {'Fetching stories'}
                                        speed = {200}
                                    >
                                        {(posts)=><PostList posts={posts}/>} 
                                    </InfiniteScrollUtil> 
                                    :<p>User have not posted anything yet.</p>
                                }
                            </React.Fragment>
                }
            </div>
        )
    }
}

// class User extends React.Component {
//     constructor (props) {
//         super (props) 
//         this.state={
//             user: {},
//             posts: [],
//             loadingUser: true,
//             loadingPosts: false,
//             error: null
//         }
//         this.fetchUserPosts = this.fetchUserPosts.bind(this)
//     }
//     // static contextType = ThemeContext; 
//     componentDidMount () {
//         const {id} = queryString.parse(this.props.location.search);
//         fetchUser(id)
//         .then((user)=>{
//             this.setState({
//                 loadingUser: false,
//                 loadingPosts: true,
//                 error: null,
//                 user: user
//             }, this.fetchUserPosts)
//         })
//         .catch((error)=>{
//             console.warn('Error fetching posts: ', error)
//             this.setState({
//                 error: `There was an error fetching the user.`,
//                 loadingUser: false
//             })
//         })
//     }
//     fetchUserPosts () {
//         let ids = this.state.user.submitted;
//         if (ids) {
//             this.setState({
//                 loadingPosts: true
//             })
//             if (ids.length > 50) {
//                 ids = ids.slice(0, 50)
//             }
//             fetchPosts(ids)
//                 .then((posts)=>{
//                     this.setState({
//                         posts: posts,
//                         loadingPosts: false
//                     })
//                 })
//                 .catch((error)=>{
//                     console.warn('Error fetching posts: ', error)
//                     this.setState({
//                             error: `There was an error fetching the posts.`,
//                             loadingPosts: false
//                     })
//                 })
//         }
//     }
//     render() {
//         const {id, created, karma, about} = this.state.user;
//         const {loadingPosts, loadingUser, posts} = this.state;
//         return (
//             <div>
//                 {loadingUser
//                     ?<Loading text='Fetching user' speed={200}/>
//                     :<React.Fragment>
//                         <div className='row padding-bottom'>
//                             <FaUser size={60}/>
//                             <div className = 'padding-left'>
//                                 <h1 className='nav-link' style={{fontSize: '38px'}}>{id}</h1>
//                                 <p className='post-meta'>joined {convertTime(created)}, has {karma} karma</p>
//                             </div>
//                         </div>
//                         {about && <p dangerouslySetInnerHTML={{__html: about}} className='comment-text padding-bottom'/>}
//                     </React.Fragment>
//                 }
//                 {loadingPosts
//                     ?<Loading text='Fetching posts' speed={200}/>
//                     :<React.Fragment>
//                         <h2 className='post-link' style={{fontSize: '30px'}}>Posts</h2>
//                         {posts ?<PostList posts={posts}/> : <p>User have not posted anything yet.</p> }
//                     </React.Fragment>
//                 }
//             </div>
//         )
//     }
// }

export default User;