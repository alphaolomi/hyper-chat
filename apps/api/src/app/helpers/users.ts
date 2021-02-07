interface IUser {
  id: string;
  username: string;
  room: string;
}

const users: Array<IUser> = [];

/**
 * Join user to chat
 * @param id
 * @param username
 * @param room
 */
export const userJoin = (id:string, username:string, room:string) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

/**
 *  Get current user
 * @param id
 */
export const getCurrentUser = (id: string) => {
  return users.find((user) => user.id === id);
};

/**
 * User leaves chat
 * @param id
 */
export const userLeave = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

/**
 *  Get room users
 *
 */
export const getRoomUsers = (room: string) => {
  return users.filter((user) => user.room === room);
};

// export default {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// };
