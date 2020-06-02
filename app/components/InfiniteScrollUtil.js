import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading.js'

class InfiniteScrollUtil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            data: [],
            hasMore: true,
            fetchStart: 0,
            loading: true,
            minDataLength: 4,
            dataAmountFetchedThrougFetchLoop: 0 //when we fetch content produced by user, we have only id which can be a
            //commnet, poll, post and also dead or deleted etc, but want to display only post, so if from ids we have we get
            //less stuff - meaning some were not valid posts we want, we fetch again, and again util we dont get fetchAmount
            //of data
        }
        this.fetchData = this.fetchData.bind(this)
        this.controller = new AbortController();
    }
    componentDidMount () {
        this.fetchData ()
    }
    componentWillUnmount(){
        this.controller.abort();
    }

    fetchData () {
        console.log('running fetch data')
        const {fetchStart, dataAmountFetchedThrougFetchLoop} = this.state;
        const {fetchAmount, ids, fetchFunc} = this.props;
        console.log('dataAmountFetchedThrougFetchLoop: ', dataAmountFetchedThrougFetchLoop)

        let idsToFetch = []
        if (fetchStart >= ids.length || fetchStart > 750) { //limit amount of fetching
            console.log('nothing more to fetch')
            this.setState({
                hasMore: false
            })
            return;
        }
        if (dataAmountFetchedThrougFetchLoop >= fetchAmount) {
            console.log('got enough data now, stopping fetchLoop')
            this.setState({
                dataAmountFetchedThrougFetchLoop: 0
            })
            return;
        }
        if (fetchStart + fetchAmount > ids.length) {
            idsToFetch = ids.slice(fetchStart)
        } else {
            idsToFetch = ids.slice(fetchStart, fetchStart + fetchAmount)
        }
        fetchFunc(idsToFetch, this.controller.signal)
        .then((newData)=>{
            console.log('newData', newData)
            this.setState((state) => ({
                data: state.data.concat(newData),
                fetchStart: state.fetchStart + fetchAmount,
                loading: false
            }))

            if (newData.length < fetchAmount && dataAmountFetchedThrougFetchLoop < fetchAmount) {
                console.log('got less data than fetchAmount, fetching next batch')
                this.setState((state) => ({
                    dataAmountFetchedThrougFetchLoop: state.dataAmountFetchedThrougFetchLoop + newData.length
                }))
                this.fetchData()
            }

        })
        .catch((error) => {
            console.warn('Error fetching data: ', error)
            this.setState({
              error: `There was an error fetching the data.`,
              loading: false
            })
        })
    }
    render () {
        const {data, hasMore, loading, error} = this.state;
        const {text, speed} = this.props;
        return (
            loading 
                ?<Loading text={text} speed={speed}/>
                :error
                    ?<div>{error}</div>
                    :<InfiniteScroll
                        dataLength={data.length}
                        next={this.fetchData}
                        hasMore={hasMore}
                        loader={<Loading text='Fetching more' speed={200}/>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>}
                    >
                    {this.props.children(data)}
                </InfiniteScroll>
        )
    }
}
export default InfiniteScrollUtil;

