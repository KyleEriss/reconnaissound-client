import React from 'react';
import { Input, Required } from '../Utils/Utils';
import './Autocomplete.css';

export default class Autocomplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: "",
        }
    }

    onTextChanged = (e) => {
        const { countries } = this.props;
        const value = e.target.value;
        let list = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            list = countries.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions: list, text: value }));
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
                {/* {suggestions.map((country) => <li onClick={() => this.props.addSelectCountry(country)}>{country}</li>)} */}
            </ul>
            
        );
    }

    suggestionSelected(value) {

        this.props.addSelectCountry({
            country: this.state.suggestions
        })

        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    render() {

        const { text } = this.state;

        return (
            <div className="Autocomplete">
                <input
                    name="selectCounty"
                    value={text}
                    onChange={this.onTextChanged}
                    type="text"
                    required
                    id="ExploreForm__selectCountry"
                />
                {this.renderSuggestions()}
            </div>
        )
    }
}
