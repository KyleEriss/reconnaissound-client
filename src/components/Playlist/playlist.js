import React from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../Api-Service';
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

    deleteFromPlayList = (event) => {
        const videoId = event.currentTarget.dataset.id;

        AuthApiService.deleteVideo(videoId);

        window.location.reload(false);



        // console.log(idNumber)

        // let videoIdMapped = this.state.videos.map(video => {
        //     return video.id
        // })

        // let videoTitleMapped = this.state.videos.map(video => {
        //     return video.snippet.title
        // })

        // console.log(videoIdMapped[idNumber]);
        // console.log(videoTitleMapped[idNumber]);

        // const videoId = videoIdMapped[idNumber];
        // const videoTitle = videoTitleMapped[idNumber];


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
                                    <button onClick={this.deleteFromPlayList} data-id={video.id}>Delete from Playlist</button>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>



        )

    }
}