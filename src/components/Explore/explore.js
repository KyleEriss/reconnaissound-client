import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../Api-Service';
import Autocomplete from './Autocomplete';
import { CountryNames, CountryList } from './CountryList';
import config from '../../config';
import TokenService from '../../token-service';
import './explore.css';

export default class Explore extends React.Component {

    state = {
        selectCountry: "",
        maxResults: "",
        videos: [],
        loading: true,
        error: null,
        hideScrollBar: true,
        loggedIn: false
    };

    componentDidMount() {
        this.setState({
            loggedIn: TokenService.hasAuthToken()
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    addSelectCountry = (country) => {
        this.setState({
            selectCountry: country
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            hideScrollBar: false,
            browsingVideos: true
        })

        const selectCountry = this.state.selectCountry;
        const maxResults = this.state.maxResults;
        const apiKey = config.API_KEY;

        let youTubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${selectCountry}&videoCategoryId=10&key=${apiKey}`;

        fetch(youTubeUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    videos: data.items, loading: false
                })
            })
            .catch(error => {
                console.log({ error })
            })
    }

    addToPlayList = (event) => {
        const idNumber = event.currentTarget.dataset.id;

        let videoIdMapped = this.state.videos.map(video => {
            return video.id
        })

        let videoTitleMapped = this.state.videos.map(video => {
            return video.snippet.title
        })

        const videoId = videoIdMapped[idNumber];
        const videoTitle = videoTitleMapped[idNumber];

        AuthApiService.postVideo(videoId, videoTitle);

        const newVideoList = this.state.videos.filter((item) => item.id !== videoId);

        this.setState({
            videos: newVideoList
        })

    }

    render() {

        return (
            <div className="explorePage">
                <div className="exploreItem">
                    <div className="exploreForm">
                        <h2>Explore</h2>
                        <form className="ExploreForm__selectCountry"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="selectCountryForm">
                                <label htmlFor="ExploreForm__selectCountry">
                                    Select Country <Required />
                                </label>
                                <Autocomplete countryNames={CountryNames} countryList={CountryList} addSelectCountry={this.addSelectCountry} />
                            </div>

                            <div className="maxResults">
                                <label htmlFor="ExploreForm__maxResults">
                                    Number of Results <Required />
                                </label>

                                <Input
                                    name="maxResults"
                                    value={this.state.maxResults}
                                    required
                                    onChange={this.handleChange}
                                    id="ExploreForm__maxResults"
                                />
                            </div>

                            <Button type="submit">submit</Button>
                        </form>

                    </div>
                </div>
                {this.state.hideScrollBar ? (
                    null
                ) : (
                    <div className="exploreItem">
                        <div className="videoResults">

                            {this.state.loading || !this.state.videos ? (
                                null
                            ) : (
                                <ul>
                                    {this.state.videos.map((video, idx) => (
                                        <li className="videoList" key={idx}>
                                            <div iframeClass>
                                                <iframe
                                                    title="Video Results"
                                                    width="210"
                                                    height="118"
                                                    src={`https://www.youtube.com/embed/${video.id}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen>
                                                </iframe>
                                            </div>
                                            <h3 className="videoTitle">
                                                <a href={`https://www.youtube.com/watch?v=${video.id}`}>
                                                    {video.snippet.title}
                                                </a>
                                            </h3>

                                            {this.state.loggedIn ? (
                                                <Button onClick={this.addToPlayList} data-id={idx}>Save to Playlist</Button>
                                            ) : (
                                                <Link to='/login'>
                                                    <Button>Save to Playlist</Button>
                                                </Link>
                                            )}

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}






