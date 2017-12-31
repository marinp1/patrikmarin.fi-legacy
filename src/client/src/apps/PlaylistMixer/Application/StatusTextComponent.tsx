import * as React from 'react';
import glamorous from 'glamorous';
import { Playlist, Track } from './classes';
import { timeToString } from './helpers';

const StatusText = glamorous.p({
  margin: 0,
  padding: 0,
  color: '#A1A1A1',
});

function getTotalRuntime(playlists: Playlist[]): string {
  const runtime = Math.max(playlists.map(_ => _.runtime).reduce((a, b) => a + b, 0), 0);
  return timeToString(runtime);
}

function getUniquetracks(playlists: Playlist[], aggressive: boolean): Track[] {
  return [];
}

const StatusTextComponent: React.SFC<{playlists: Playlist[]}> = ({ playlists }) => {
  const playlistString = (playlists.length === 1) ? 'playlist selected' : 'playlists selected';
  // Make setting for this
  const uniqueTracks = getUniquetracks(playlists, false);
  console.log(uniqueTracks);
  const runtime = getTotalRuntime(playlists);
  return (
    <StatusText>{playlists.length} {playlistString} with a total runtime of {runtime}.</StatusText>
  );
};

export default StatusTextComponent;

