import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
export default function ThemeToggler({ theme, toggleTheme }) {
    return (
        <header>
            <div className="theme-toggler" onClick={toggleTheme} >
                <FaSun className={`react-icons ${theme === "light" && 'choosen-theme'}`} style={ {'--icon-color': '#ffe577' } }  />
                <FaMoon className={`react-icons ${theme === "dark" && 'choosen-theme'}`} style={ {'--icon-color': '#69757d' } }  />
            </div>
        </header>
    )
}
