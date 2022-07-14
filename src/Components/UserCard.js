import { MdGroup } from 'react-icons/md'
import '.././styles/UserCard.css'
import { BiLinkExternal } from 'react-icons/bi'
export default function UserCard(props) {
    return (
        <div className="card">
            <img className="card-img" src={props.user.profileInfo.avatar_url} alt={props.user.profileInfo.name}/>
            <span className="card-tag">Repos: {props.user.profileInfo.public_repos}</span>
            <div className="card-info">
                <div className="flex">
                    <h2>{props.user.profileInfo.login}</h2>

                </div>
                <div className="extended-info">
                    <small>{props.user.profileInfo.name}</small>
                    <MdGroup className="icon"/>
                    <h4>{props.user.profileInfo?.followers ?? 0}</h4>
                </div>
                <div className="card-links">
                    <h3>{props.user.profileInfo?.bio ?? 'Bio Not Available'}</h3>
                    <div>
                        <button className="btn-link" onClick={props.toggleRepoDetails}>{props.user.needsReposDetails ? 'Close Repos Details' : 'See Repos Details'}</button>
                        <a href={props.user.profileInfo.html_url} target='_blank' rel="noreferrer">Go to Github Profile <BiLinkExternal className="icon"/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
