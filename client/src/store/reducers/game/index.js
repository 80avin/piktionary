
export { default as artist } from './artist'
export { default as members } from './members';
export { default as messages } from './messages';
// export { default as score } from './score'; // keep score in members
export { default as state } from './state';
export { default as word } from './word'

export const MessageSelector = (state) => {
  const { members, messages } = state;

  return messages.map(msg => ({
    from: msg.from,
    user: members.find(member => member.id === msg.from),
    type: msg.type,
    text: msg.text,
  }));
}
export const ArtistSelector = (state)=>{
  const {members, artist} = state;
  return members.find(member=>member.id===artist.id);
}
export const amIArtist = (state)=>{
  const {artist, user} = state;
  // return false;
  return artist.id===user.id;
}