import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*searchResults: [ { name: 'Hello', artist: 'Adele', album: '25' },
                        { name: 'Heavy', artist: 'Linkin Park', album: 'One More Light' }
                      ],*/
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
      /*playlistTracks: [
                        { name: 'Hello', artist: 'Adele', album: '25' },
                        { name: 'Heavy', artist: 'Linkin Park', album: 'One More Light' }
                      ]*/
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let currentPlaylistTracks = this.state.playlistTracks;

    let currentPlaylistTracksLength = currentPlaylistTracks.filter(currentTrack => currentTrack.id === track.id).length;
    if (currentPlaylistTracksLength === 0) {
      /* id is doesn't exist, add the song to the end of the playlist. */
      currentPlaylistTracks.push(track);
      this.setState({ playlistTracks: currentPlaylistTracks });
    }

  }
  removeTrack(track) {
    let currentPlaylistTracks = this.state.playlistTracks;
    /* must reassign currentPlaylistTracks to set updated playlist */
    currentPlaylistTracks = currentPlaylistTracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: currentPlaylistTracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        searchResults: [],
        playlistName: 'New Playlist', // only resets using value instead of defaultValue
        playlistTracks: []
      });
    });
    //this.updatePlaylistName('New Playlist');
    /*Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState({
      searchResults: [],
      playlistName: 'New Playlist', // does not update Playlist name visually
      playlistTracks: []
    });*/

  }
  search(term) {
    //console.log(term);
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={ this.search } />
          <div className="App-playlist">
            <SearchResults searchResults={ this.state.searchResults }
                           onAdd={ this.addTrack } />
            <Playlist playlistName={ this.state.playlistName }
                      playlistTracks={ this.state.playlistTracks }
                      onNameChange={ this.updatePlaylistName }
                      onRemove={ this.removeTrack }
                      onSave={ this.savePlaylist } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
