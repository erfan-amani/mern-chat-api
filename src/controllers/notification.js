const Notification = require("../models/notification");

const getAll = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.send(notifications);
  } catch (error) {
    next(error);
  }
};

const getAndReadNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    notification.read = true;

    notification.save();
    res.send(notification);
  } catch (error) {
    next(error);
  }
};

const readAll = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id });

    notifications.forEach((notif) => {
      notif.read = true;
      notif.save();
    });

    res.send(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getAndReadNotification, readAll };
