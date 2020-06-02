import React from 'react'

export const ThemeContext = React.createContext();

class ThemeContextProvider extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            isLight: localStorage.getItem('theme') === 'light' ? true : false
        }
        this.toggleTheme = this.toggleTheme.bind(this)
    }
    toggleTheme() {
        localStorage.setItem('theme', this.state.isLight ? 'dark' : 'light')
        this.setState({
            isLight: !this.state.isLight
        })
    }
    render() {
        return (
            <ThemeContext.Provider value={{...this.state, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
export default ThemeContextProvider;