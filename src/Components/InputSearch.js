import '.././styles/InputSearch.css'
export default function InputSearch(props) {
    return (
        <form autoComplete='off'>
            <label className="search-title">
                Search An User
            </label>
            <div className="input">
                <input type="text" name="searchInput" value={props.inputSearch} onChange={props.handleSearch}/>
                <input type="submit" value="Find User" onClick={props.getUser}/>
            </div>
        </form>
    )
}
