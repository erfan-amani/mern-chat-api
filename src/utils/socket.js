const getConnectedUsers = (io) => {
  const activeList = [...io.of("/").sockets];
  const usersList = [];

  activeList.forEach((s) => {
    const userData = { ...s?.[1].user.toObject() };

    delete userData.password;
    delete userData.tokens;

    const notExist =
      usersList.findIndex(
        (u) => u._id.toString() === userData._id.toString()
      ) === -1;

    notExist && usersList.push(userData);
  });

  return usersList;
};

const getUserSocketConnection = (io, userId) => {
  const activeList = [...io.of("/").sockets];

  const socket = activeList.find((s) => {
    const userData = { ...s?.[1].user.toObject() };

    return userData._id.toString() === userId.toString();
  });

  return socket[1];
};

module.exports = { getConnectedUsers, getUserSocketConnection };
