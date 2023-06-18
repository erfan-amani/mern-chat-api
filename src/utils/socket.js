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

module.exports = getConnectedUsers;
