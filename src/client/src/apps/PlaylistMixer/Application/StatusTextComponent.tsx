import * as React from 'react';
import glamorous from 'glamorous';
import { Playlist, Track } from './classes';
import { timeToString, getUniquetracks } from './helpers';

const StatusText = glamorous.p({
  margin: 0,
  padding: 0,
  color: '#A1A1A1',
});

function getTotalRuntime(tracks: Track[]): string {
  const runtime = Math.max(tracks.map(_ => _.duration).reduce((a, b) => a + b, 0), 0);
  return timeToString(runtime);
}

const StatusTextComponent: React.SFC<{playlists: Playlist[]}> = ({ playlists }) => {
  const playlistString = (playlists.length === 1) ? ' playlist selected' : ' playlists selected';
  // Make setting for this
  const uniqueTracks = getUniquetracks(playlists, true);
  const runtime = getTotalRuntime(uniqueTracks);
  return (
    <StatusText>
      {playlists.length + playlistString + ', with a total of ' +
      uniqueTracks.length + ' unique tracks and total runtime of ' + runtime + '.'}
    </StatusText>
  );
};

export default StatusTextComponent;

