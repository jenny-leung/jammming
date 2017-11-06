import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  /*addTrack() {
    this.props.onAdd(this.props.track);
  }*/
  render() {
    return (
      <div className="TrackList">
          { this.props.tracks.map(track => <Track
                track={ track }
                key={ track.id }
                onAdd={ this.props.onAdd }
                isRemoval={ this.props.isRemoval }
                onRemove={ this.props.onRemove } />
            ) }
      </div>
    );
  }
}

export default TrackList;
