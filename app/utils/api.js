const api = 'https://hacker-news.firebaseio.com/v0/'
const fetchStories = (type, signal) => {
    const endpoint = window.encodeURI(`${api}${type}stories.json?print=pretty`)
    return fetch(endpoint, {signal})
            .then((response) => response.json())
            .then((idsArray) => {
                if (!idsArray) {
                    throw new Error(`There was wrror fetching ${type} stories.`)
                }
                console.log(signal)
                return idsArray.slice(0,50)
            })
            .then((idsArray) => Promise.all(idsArray.map((id)=>fetchItem(id, signal))))
            .then((posts)=>removeDeadAndDeleted(onlyStory(posts)))
}
const fetchStoriesIds = (type, signal) =>{
    const endpoint = window.encodeURI(`${api}${type}stories.json?print=pretty`)
    return fetch(endpoint, {signal})
            .then((response) => response.json())
            .then((idsArray) => {
                if (!idsArray) {
                    throw new Error(`There was wrror fetching ${type} stories.`)
                }
                return idsArray
            })
}

const fetchPosts = (ids, signal) => {
    return Promise.all(ids.map((id)=>fetchItem(id, signal)))
            .then((items) => removeDeadAndDeleted(onlyStory(items)))
}
const fetchComments = (ids, signal) => {
    return Promise.all(ids.map((id)=>fetchItem(id, signal)))
            .then((comments)=>removeDeadAndDeleted(onlyComments(comments)))
}
const fetchItem = (item, signal) => {
    const endpoint = window.encodeURI(`${api}item/${item}.json?print=pretty`)
    return fetch(endpoint, {signal})
            .then((response) => response.json())
            // .then((item)=> {
            //     if (!item) {
            //         throw new Error(`There was wrror with fetching item ${item}.`)
            //     }
            //     return item;
            // })
}
const fetchUser = (id, signal) => {
    const endpoint = window.encodeURI(`${api}user/${id}.json?print=pretty`)
    return fetch(endpoint, {signal})
        .then((response) => response.json())
        .then((user)=> {
            if (!user) {
                throw new Error(`There was wrror with fetching user.`)
            }
            return user;
        })
}
const removeDeadAndDeleted = (posts) => {
    return posts.filter((post)=>post.deleted !== true && post.dead !== true)
}

const onlyStory = (posts) => {
   return posts.filter((post) => (post && post.type === 'story'))
}
const onlyComments = (posts) => {
    return posts.filter((post) => (post && post.type === 'comment'))
}

export {fetchStories, fetchComments, fetchItem, fetchUser, fetchPosts, fetchStoriesIds};