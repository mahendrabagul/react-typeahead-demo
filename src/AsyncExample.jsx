import React, {Fragment} from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import GithubMenuItem from './GithubMenuItem';
import makeAndHandleRequest from './makeAndHandleRequest';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const getInitialState = () => ({
    isLoading: false,
    options: [],
    selected:[],
});

class AsyncExample extends React.Component {
    state = getInitialState();
    render() {
        const {selected} = this.state;

        if (selected.length) {
            console.log(JSON.stringify(selected));
        }
        return (
            <Fragment>
                <AsyncTypeahead
                    id="asyncTypeahead"
                    {...this.state}
                    labelKey="login"
                    minLength={3}
                    multiple
                    selected={selected}
                    align="justify"
                    onSearch={this._handleSearch}
                    onChange={(s) => this.setState({selected: s})}
                    placeholder="Search for a Github user..."
                    renderMenuItemChildren={(option, props) => (
                        <GithubMenuItem key={option.id} user={option} />
                    )}
                />
            </Fragment>
        );
    }

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