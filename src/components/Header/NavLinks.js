import { parseWithOptions } from 'date-fns/fp';
import { Link } from 'react-router-dom';
import TokenService from '../../token-service';


// function handleLogoutClick() {
//     TokenService.clearAuthToken()
// }

const NavLinks = {

    // handleLogoutClick() {
    //     return (
    //         TokenService.clearAuthToken()
    //     )
    // },

    ReconHeaderLink() {
        return (
            <div>
                <Link to='/' style={{ textDecoration: 'none', color: 'orangered' }}>Reconnaissound</Link>
            </div>
        )
    },

    ExploreLink() {
        return (
            <div>
                <Link to='/explore' style={{ textDecoration: 'none', color: 'orangered' }}>Explore</Link>
            </div>
        )
    },

    PlaylistLink() {
        return (
            <div>
                <Link to='/playlist' style={{ textDecoration: 'none', color: 'orangered' }}>Playlist</Link>
            </div>
        )
    },

    LogoutLink(props) {
        return (
            <div>
                <Link onClick={props.logout} to='/' style={{ textDecoration: 'none', color: 'orangered' }}>Logout</Link>
            </div>
        )
    },

    LoginLink() {
        return (
            <div>
                <Link to='/Login' style={{ textDecoration: 'none', color: 'orangered' }}>Login</Link>
            </div>
        )
    }
}

export default NavLinks

