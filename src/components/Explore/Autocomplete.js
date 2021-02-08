import React from 'react';
import { Input } from '../Utils/Utils';
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
        const { countryNames } = this.props;
        const value = e.target.value;
        let list = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            list = countryNames.sort().filter(v => regex.test(v));
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
            </ul>
            
        );
    }

    suggestionSelected(value) {
        const { countryList } = this.props;

        console.log(countryList)

        
        const country = countryList.find(item => item.label === value)

        this.props.addSelectCountry(country.code)

        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    render() {

        const { text } = this.state;

        return (
            <div className="Autocomplete">
                <Input
                    name="selectCounty"
                    value={text}
                    onChange={this.onTextChanged}
                    type="text"
                    required
                    autoComplete="off"
                    id="ExploreForm__selectCountry"
                />
                {this.renderSuggestions()}
            </div>
        )
    }
}
