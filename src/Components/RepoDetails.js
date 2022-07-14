import '.././styles/RepoDetails.css'
import { ImArrowUp2 } from 'react-icons/im'
import { GiRoundStar } from 'react-icons/gi'
import { TbGitFork } from 'react-icons/tb'
import { IoEyeSharp } from 'react-icons/io5'
import { BsCode } from 'react-icons/bs'
import { BiLinkExternal } from 'react-icons/bi'
import { useState } from 'react'
export default function RepoDetails({ repos }) {
    const [repoDetails, setRepoDetails] = useState({
        id: 0,
        isOpen: false
    })
    function toggleDetails(id) {
        if (repoDetails.id === id) {
            setRepoDetails(prevRepo => {
                return {...prevRepo, isOpen: !prevRepo.isOpen}
            })
        }
        setRepoDetails(prevRepo => {
            return {...prevRepo, id}
        })
    }
    const repoItems = repos.map((repo, index) => {
        const { name, forks, watchers, stargazers_count, language, html_url } = repo

        return (
            <li  key={repo.id} onClick={() => toggleDetails(repo.id)}>
                <div className="repo-items">
                    <h4>{ name ?? 'Name Not Available'}</h4>
                    <ImArrowUp2 className={repoDetails.isOpen && repoDetails.id === repo.id ? 'arrow-up' : 'arrow-down'}/>
                </div>
                {repoDetails.id === repo.id && repoDetails.isOpen && <div className="repo-container">
                        <div>
                            <RepoDescription title={'Stars'} desc={stargazers_count}>
                                <GiRoundStar />
                            </RepoDescription>
                            <RepoDescription title={'Forks'} desc={forks}>
                                <TbGitFork />
                            </RepoDescription>
                        </div>
                        <div>
                            <RepoDescription title={'Watchers'} desc={watchers}>
                                <IoEyeSharp />
                            </RepoDescription>
                            <RepoDescription title={'Language'} desc={language ?? 'Unknown'}>
                                <BsCode />
                            </RepoDescription>
                        </div>
                        <a href={html_url} target="_blank" rel="noreferrer">Go to Github Repo <BiLinkExternal className="icon"/></a>
                    </div>}
            </li>
        )
    })
    return (
        <ul className="repo-details">{ repoItems }</ul>
)}

const RepoDescription = props => {
    return (
        <div className="item">
            { props.children }
            <span>{props.title}: {props.desc}</span>
        </div>
    )
}
