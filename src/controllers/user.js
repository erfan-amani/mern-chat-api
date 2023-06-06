const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  getProfile,
};
