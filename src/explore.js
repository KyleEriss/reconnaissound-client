import React from 'react';
import './App.css';

export default class Explore extends React.Component {

    state = {
        selectCountry: "",
        selectCountryError: "",
        maxResults: "",
        videos: [],
        loading: true,
        iframe: [],

    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    validate = () => {
        let selectCountryError = "";

        if (!this.state.selectCountry) {
            selectCountryError = "Country cannot be blank";
        }

        if (selectCountryError) {
            return this.setState({ selectCountryError });
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();

        const selectCountry = this.state.selectCountry;
        const maxResults = this.state.maxResults;
        const isValid = this.validate();
        let youTubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${selectCountry}&videoCategoryId=10&key=AIzaSyBRPRd_vBZcveCCLZRWVdlCmyRjlmj3G0k`;

        if (!isValid) {
            return false;
        }

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


    render() {
        return (
            <div>
                <form>

                    <input
                        name="selectCountry"
                        placeholder="select a country"
                        value={this.state.selectCountry}
                        onChange={this.handleChange}
                    />

                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.selectCountryError}
                    </div>

                    <input
                        name="maxResults"
                        placeholder="select number of videos"
                        value={this.state.maxResults}
                        defaultValue="3"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button onClick={this.handleSubmit}>submit</button>
                </form>

                <div>

                    {this.state.loading || !this.state.videos ? (
                        <div></div>
                    ) : (
                            //<div>{this.state.videos.id}</div>

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
                                        <h3>
                                            <a href={`https://www.youtube.com/watch?v=${video.id}`}>
                                                {video.snippet.title}
                                            </a>
                                        </h3>
                                    </li>
                                ))}
                            </ul>
                        )}
                </div>

            </div>
        );
    }
}

