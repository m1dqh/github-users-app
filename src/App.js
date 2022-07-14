import { FaGithub } from 'react-icons/fa'
import InputSearch from './Components/InputSearch'
import UserCard from './Components/UserCard'
import RepoDetails from './Components/RepoDetails'
import { useState, useEffect } from 'react'
import ThemeToggler from './Components/ThemeToggler'

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [inputSearch, setInputSearch] = useState('')
    const [user, setUser] = useState({
        profileInfo: '',
        repos: '',
        needsReposDetails: false
    })
    const [loading, setLoading] = useState(false)

    function handleSearch(event) {
        setInputSearch(event.target.value)
    }

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    function toggleRepoDetails() {
        getRepos()
        setUser(prevUser => {
            return {
                ...prevUser,
                needsReposDetails: !prevUser.needsReposDetails
            }
        })
    }

    async function getUser(e) {
        if (e) {
            e.preventDefault()
        }
        if (inputSearch) {
            setLoading(true)
            const response = await fetch(`https://api.github.com/users/${inputSearch}`)
            const profileInfo = await response.json()
            setUser(prevUser => {
                return {
                    ...prevUser,
                    profileInfo
                }
            })
            setInputSearch('')
            setUser(prevUser => {
                return {...prevUser, needsReposDetails: false}
            })
            setLoading(false)
        }
    }

    async function getRepos() {
        if (user.profileInfo.login === user.repos[0]?.owner.login) {
            return
        }
        if (user.profileInfo && !user.needsReposDetails) {
            setLoading(true)
            const response = await fetch(`https://api.github.com/users/${user.profileInfo.login}/repos`)
            const repos = await response.json()
            setUser(prevUser => {
                return {
                ...prevUser,
                repos
                }
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        if (theme === 'light') {
            document.body.classList.replace('dark', 'light')
        } else if (theme === 'dark') {
            document.body.classList.replace('light', 'dark')
        }
    }, [theme])

    return (
        <main>
            <ThemeToggler theme={ theme } toggleTheme={ toggleTheme } />
            <section className="center">
                <InputSearch handleSearch={handleSearch} inputSearch={inputSearch} getUser={getUser} />
                {   loading ? <BackgroundFill title={`Loading`} /> :
                    !user.profileInfo ? <BackgroundFill title={'Github Users'} /> :
                    user.profileInfo.message === 'Not Found' ? <BackgroundFill title={`User ${user.profileInfo.message}`} /> :
                    <div className="card-container">
                        <UserCard
                        user={user}
                        loading={loading}
                        toggleRepoDetails={toggleRepoDetails}/>
                        {user.needsReposDetails && <RepoDetails repos={user.repos} />}
                    </div>
            }
            </section>
        </main>
  );
}

const BackgroundFill = props => {
    return (
        <section className="section">
            <FaGithub className="section-icon"/>
            <h1>{props.title}</h1>
        </section>
    )
}

export default App;
