import React from 'react'
import Comments from './Comments.js'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {ThemeContext} from '../context/ThemeContext.js'
import ChildComments from './ChildComments';

class MoreComments extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            moreCommenta: 'More Comments...',
            lessComments: 'Less Comments',
            display: false
        }
        this.handleDisplayMore = this.handleDisplayMore.bind(this)
    }
    static contextType = ThemeContext; 
    handleDisplayMore() {
        this.setState({
            display: !this.state.display
        })
    }
    render() {
        const {moreCommenta, lessComments, display} = this.state;
        const {isLight} = this.context;
        const theme = isLight? 'light' : 'dark';
        return (
            <React.Fragment>
                <button onClick={this.handleDisplayMore} className='display-comments-btn'>
                    {display
                        ?<span className='row'>
                            <AiFillCaretUp size={22} color={isLight?'rgb(70, 69, 69)':'rgb(158, 148, 148)'}/>
                            <span className={`comments-btn-text meta-link-${theme}`}>{lessComments}</span>
                        </span>
                        :<span className='row'>
                            <AiFillCaretDown size={22} color={isLight?'rgb(70, 69, 69)':'rgb(158, 148, 148)'}/>
                            <span className={`comments-btn-text meta-link-${theme}`}>{moreCommenta}</span>
                        </span>
                    }
                </button>
                <div className='more-comments'>
                    {display && <ChildComments post={this.props.comment} />}
                </div>
            </React.Fragment>
        )
    }
}

export default MoreComments;