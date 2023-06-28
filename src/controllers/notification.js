const Notification = require("../models/notification");
const { generateResponseWithPagination } = require("../utils/response");
const createError = require("../utils/error");
const { getNotificationSchema } = require("../validators");

const getAll = async (req, res, next) => {
  try {
    const { skip, limit, page } = req.pagination;

    const total = await Notification.count({ user: req.user._id });
    const notifications = await Notification.find({ user: req.user._id })
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip(skip);

    const response = generateResponseWithPagination(notifications, {
      limit,
      page,
      total,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const getAndReadNotification = async (req, res, next) => {
  try {
    await getNotificationSchema.validateAsync(req.params);

    const notification = await Notification.findById(req.params.id);

    notification.read = true;

    notification.save();
    res.send(notification);
  } catch (error) {
    next(createError(error));
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
