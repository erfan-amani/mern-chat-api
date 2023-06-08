const getConnectedUsers = (io) => {
  const activeList = [...io.of("/").sockets];
  const usersList = activeList.map((s) => {
    const userData = { ...s?.[1].user.toObject() };

    delete userData.password;
    delete userData.tokens;

    return userData;
  });

  return usersList;
};

module.exports = getConnectedUsers;
