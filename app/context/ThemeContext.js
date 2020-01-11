import React from 'react'

export const ThemeContext = React.createContext();

class ThemeContextProvider extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            isLight: true
        }
        this.toggleTheme = this.toggleTheme.bind(this)
    }
    toggleTheme() {
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