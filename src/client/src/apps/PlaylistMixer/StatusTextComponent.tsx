import * as React from 'react';
import glamorous from 'glamorous';
import { Playlist } from './classes';

const StatusText = glamorous.p({
  margin: 0,
  padding: 0,
  color: '#A1A1A1',
});

function getTotalRuntime(playlists: Playlist[]): string {
  const runtime = Math.max(playlists.map(_ => _.runtime).reduce((a, b) => a + b, 0), 0);
  const inMinutes = runtime / 60000;
  const inHours = inMinutes / 60;
  const hours = Math.floor(inHours);
  const hourString = (hours === 1) ? 'hour' : 'hours';
  const minutes = Math.floor((inHours - hours) * 60);
  const minuteString = (minutes === 1) ? 'minute' : 'minutes';
  return `${hours} ${hourString}, ${minutes} ${minuteString}`;
}

const StatusTextComponent: React.SFC<{playlists: Playlist[]}> = ({ playlists }) => {
  const runtime = getTotalRuntime(playlists);
  return (
    <StatusText>{runtime}</StatusText>
  );
};

export default StatusTextComponent;

