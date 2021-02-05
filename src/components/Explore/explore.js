import React from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../Api-Service';
import Autocomplete from './Autocomplete';
import CountryNames from './CountryNames';
import CountryCodes from './CountryCodes';
import './explore.css';

export default class Explore extends React.Component {

    state = {
        selectCountry: "",
        maxResults: "",
        videos: [],
        loading: true,
        error: null,
        countryCodes: CountryCodes 
    };

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

    // mapCountryCodes = (selectCountry) => {
    //     return
    // }

    handleSubmit = event => {
        event.preventDefault();

        console.log(this.state.selectCountry)

        const selectCountry = this.state.selectCountry;
        const maxResults = this.state.maxResults;

        // mapCountryCodes(selectCountry)

        let youTubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${selectCountry}&videoCategoryId=10&key=AIzaSyBRPRd_vBZcveCCLZRWVdlCmyRjlmj3G0k`;

        fetch(youTubeUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    videos: data.items, loading: false
                })
                console.log(youTubeUrl)
            })
            .catch(error => {
                console.log({ error })
            })
    }

    addToPlayList = (event) => {
        const idNumber = event.currentTarget.dataset.id;

        console.log(idNumber)

        let videoIdMapped = this.state.videos.map(video => {
            return video.id
        })

        let videoTitleMapped = this.state.videos.map(video => {
            return video.snippet.title
        })

        console.log(videoIdMapped[idNumber]);
        console.log(videoTitleMapped[idNumber]);

        const videoId = videoIdMapped[idNumber];
        const videoTitle = videoTitleMapped[idNumber];

        AuthApiService.postVideo(videoId, videoTitle);
    }

    render() {

        const { error } = this.state;

        return (

            <div className="explorePage">

                <div className="exploreForm">
                    <h2>Explore</h2>
                    <form className="ExploreForm__selectCountry"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="selectCountryForm">
                            <label htmlFor="ExploreForm__selectCountry">
                                Select Country <Required />
                            </label>
                            <Autocomplete countries={CountryNames} addSelectCountry={this.addSelectCountry}/>
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


                <div className="videoResults">

                    {this.state.loading || !this.state.videos ? (
                        <div></div>
                    ) : (

                            <ul>
                                {this.state.videos.map((video, idx) => (
                                    <li className="videoList" key={idx}>
                                        <iframe
                                            width="210"
                                            height="118"
                                            src={`https://www.youtube.com/embed/${video.id}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                        </iframe>
                                        <h3 className="videoTitle">
                                            <a href={`https://www.youtube.com/watch?v=${video.id}`}>
                                                {video.snippet.title}
                                            </a>
                                        </h3>
                                        <button onClick={this.addToPlayList} data-id={idx}>Save to Playlist</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                </div>

            </div>
        );
    }
}





{/* <div className="selectCountryForm">
                            <label htmlFor="ExploreForm__selectCountry">
                                Select Country <Required />
                            </label>

                            <Input
                                name="selectCountry"
                                value={this.state.selectCountry}
                                required
                                onChange={this.handleChange}
                                id="ExploreForm__selectCountry"
                            />
                        </div> */}










