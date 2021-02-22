import React from 'react';
import AuthApiService from '../../Api-Service';
import { Button } from '../Utils/Utils';
import config from '../../config';
import TokenService from '../../token-service';
import './playlist.css';

export default class Playlist extends React.Component {

    state = {
        videos: [],
        loading: true
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/playlists`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    videos: data, loading: false
                })
                console.log(this.state.videos)
            })
            .catch(error => {
                console.log({ error })
            })
    }

    handleRemove = (id) => {
        const videoId = id;

        AuthApiService.deleteVideo(videoId);

        const newVideoList = this.state.videos.filter((item) => item.id !== videoId);

        this.setState ({
            videos: newVideoList
        })
    }


    render() {

        return (
            <div>

                {this.state.loading || !this.state.videos ? (
                    <div></div>
                ) : (

                        <ul>
                            {this.state.videos.map((video) => (
                                <li className="videoList" key={video.id}>
                                    <iframe
                                        width="210"
                                        height="118"
                                        src={`https://www.youtube.com/embed/${video.videoid}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        frameborder="0"
                                        allowFullScreen>
                                    </iframe>
                                    <h3 className="videoTitle">
                                        <a href={`https://www.youtube.com/watch?v=${video.videoid}`}>
                                            {video.videotitle}
                                        </a>
                                    </h3>
                                    <Button onClick={() => this.handleRemove(video.id)}>Delete from Playlist</Button>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>



        )

    }
}