import * as React from 'react';
import glamorous from 'glamorous';
import { Playlist, Track } from './classes';
import { timeToString } from './helpers';

const StatusText = glamorous.p({
  margin: 0,
  padding: 0,
  color: '#A1A1A1',
  marginTop: '0.5rem',
  marginBottom: '1.5rem',
});

function getTotalRuntime(tracks: Track[]): string {
  const runtime = Math.max(tracks.map(_ => _.duration).reduce((a, b) => a + b, 0), 0);
  return timeToString(runtime);
}

const StatusTextComponent: React.SFC<{
  playlists: Playlist[],
  tracks: Track[],
}> = ({ playlists, tracks }) => {
  const playlistString = (playlists.length === 1) ? ' playlist selected' : ' playlists selected';
  const runtime = getTotalRuntime(tracks);
  return (
    <StatusText>
      {playlists.length + playlistString + ', with a total of ' +
      tracks.length + ' unique tracks and total runtime of ' + runtime + '.'}
    </StatusText>
  );
};

export default StatusTextComponent;

