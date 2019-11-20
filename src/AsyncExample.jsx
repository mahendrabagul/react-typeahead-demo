import React, {Fragment} from 'react';
import {FormGroup} from 'react-bootstrap';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import Control from './Control';
import GithubMenuItem from './GithubMenuItem';
import makeAndHandleRequest from './makeAndHandleRequest';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class AsyncExample extends React.Component {
    state = {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
    };

    render() {
        return (
            <Fragment>
                <AsyncTypeahead
                    {...this.state}
                    labelKey="login"
                    minLength={3}
                    onSearch={this._handleSearch}
                    placeholder="Search for a Github user..."
                    renderMenuItemChildren={(option, props) => (
                        <GithubMenuItem key={option.id} user={option} />
                    )}
                />
                <FormGroup>
                    {this._renderCheckboxes()}
                </FormGroup>
            </Fragment>
        );
    }

    _renderCheckboxes() {
        const checkboxes = [
            {label: 'Multi-Select', name: 'multiple'},
            {label: 'Allow custom selections', name: 'allowNew'},
        ];

        return checkboxes.map(({label, name}) => (
            <Control
                checked={this.state[name]}
                key={name}
                name={name}
                onChange={this._handleChange}
                type="checkbox">
                {label}
            </Control>
        ));
    }

    _handleChange = (e) => {
        const {checked, name} = e.target;
        this.setState({[name]: checked});
    };

    _handleSearch = (query) => {
        this.setState({isLoading: true});
        makeAndHandleRequest(query)
            .then(({options}) => {
                this.setState({
                    isLoading: false,
                    options,
                });
            });
    }
}

export default AsyncExample;