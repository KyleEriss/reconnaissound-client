import { Link } from 'react-router-dom';

const NavLinks = {

    ReconHeaderLink() {
        return (
            <div>
                <Link to='/' style={{ textDecoration: 'none', color: 'rgb(255, 0, 149)' }}>Reconnaissound</Link>
            </div>
        )
    },

    ExploreLink() {
        return (
            <div>
                <Link to='/explore' style={{ textDecoration: 'none', color: 'rgb(255, 0, 149)' }}>Explore</Link>
            </div>
        )
    },

    PlaylistLink() {
        return (
            <div>
                <Link to='/playlist' style={{ textDecoration: 'none', color: 'rgb(255, 0, 149)' }}>Playlist</Link>
            </div>
        )
    },

    LogoutLink(props) {
        return (
            <div>
                <Link onClick={props.logout} to='/' style={{ textDecoration: 'none', color: 'rgb(255, 0, 149)' }}>Logout</Link>
            </div>
        )
    },

    LoginLink() {
        return (
            <div>
                <Link to='/Login' style={{ textDecoration: 'none', color: 'rgb(255, 0, 149)' }}>Login</Link>
            </div>
        )
    }
}

export default NavLinks

