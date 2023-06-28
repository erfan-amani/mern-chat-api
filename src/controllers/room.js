const Room = require("../models/room");
const createError = require("../utils/error");
const { sendNotification } = require("../utils/notification");
const { generateResponseWithPagination } = require("../utils/response");
const {
  getActiveRooms,
  getSentRequests,
  getReceivedRequests,
} = require("../utils/room");
const validationSchemas = require("../validators");

const getOneRoom = async (req, res, next) => {
  try {
    await validationSchemas.getOneRoomSchema.validateAsync(req.query);

    const room = await Room.findOne({
      users: { $all: [req.user._id, req.query.other] },
    });

    res.send(room);
  } catch (err) {
    next(createError(err));
  }
};

const activeRooms = async (req, res, next) => {
  try {
    await validationSchemas.getActiveRoomsSchema.validateAsync(req.query);

    const search = req.query.search;
    const mongooseQuery = {};
    search &&
      (mongooseQuery.users = { username: { $regex: new RegExp(search, "i") } });

    const rooms = await getActiveRooms(req.user, null, mongooseQuery);

    res.send(rooms);
  } catch (err) {
    next(createError(err));
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    await validationSchemas.getAllRoomsSchema.validateAsync(req.query);

    const { skip, limit, page } = req.pagination;
    const query = req.query;
    const dbQuery = {};

    query.pending && (dbQuery.pending = query.pending);
    dbQuery.users = {
      $all: query.otherId ? [req.user._id, query.otherId] : [req.user._id],
    };

    const rooms = await Room.find(dbQuery)
      .limit(limit)
      .skip(skip)
      .populate("users")
      .exec();

    const total = await Room.count(dbQuery);
    const response = generateResponseWithPagination(rooms, {
      limit,
      page,
      total,
    });
    res.send(response);
  } catch (err) {
    next(createError(err));
  }
};

const sendContactRequest = async (req, res, next) => {
  try {
    await validationSchemas.sendContactRequestSchema.validateAsync(req.body);

    const other = req.body.other;

    const existedRoom = await Room.findOne({
      users: { $all: [req.user._id, other] },
    });

    if (!!existedRoom) throw new Error("A request has already sent!");

    const room = new Room({ users: [req.user._id, other] });
    await room.save();

    sendNotification(req.app.get("io"), other, {
      user: other,
      title: "New contact request",
      description: `${req.user.username} want to contact to you. By accepting the request they can send message to you.`,
    });

    res.status(201).send(room);
  } catch (err) {
    next(createError(err));
  }
};

const rejectContactRequest = async (req, res, next) => {
  try {
    await validationSchemas.rejectContactRequestSchema.validateAsync({
      ...req.params,
      ...req.query,
    });

    const id = req.params.id;
    const type = req.query.type;

    const room = await Room.findByIdAndDelete(id);

    const other = room.users.find((u) => u !== req.user._id);
    type === "REJECT" &&
      sendNotification(req.app.get("io"), other, {
        user: other,
        title: "Request rejected",
        description: `${req.user.username} rejected your conteact request. You can send another request if you want to send message to ${req.user.username}.`,
      });

    res.send(room);
  } catch (err) {
    next(createError(err));
  }
};

const acceptContactRequest = async (req, res, next) => {
  try {
    await validationSchemas.acceptContactRequestSchema.validateAsync(req.body);

    const id = req.body.id;

    const room = await Room.findById(id);
    room.pending = false;
    await room.save();

    // to other user - other._id
    const other = room.users.find((u) => u !== req.user._id);
    sendNotification(req.app.get("io"), other, {
      user: other,
      title: "Request accepted",
      description: `${req.user.username} accepted your conteact request. By accepting now you can send message to  ${req.user.username}.`,
    });

    res.send(room);
  } catch (err) {
    next(createError(err));
  }
};

const getSentContactRequests = async (req, res, next) => {
  try {
    const { skip, limit, page } = req.pagination;

    const { requests, total } = await getSentRequests(req.user, {
      skip,
      limit,
    });

    const response = generateResponseWithPagination(requests, {
      limit,
      page,
      total,
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const getReceivedContactRequests = async (req, res, next) => {
  try {
    const { skip, limit, page } = req.pagination;

    const { requests, total } = await getReceivedRequests(req.user, {
      skip,
      limit,
    });

    const response = generateResponseWithPagination(requests, {
      limit,
      page,
      total,
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const getRoomUsers = async (req, res, next) => {
  try {
    await validationSchemas.getRoomUsersSchema.validateAsync(req.query);

    const room = await Room.findById(req.query.id).populate("users");

    const users = room.users.filter((u) => u._id !== req.user._id);

    res.send(users);
  } catch (err) {
    next(createError(err));
  }
};

module.exports = {
  getOneRoom,
  activeRooms,
  getAllRooms,
  sendContactRequest,
  rejectContactRequest,
  acceptContactRequest,
  getSentContactRequests,
  getReceivedContactRequests,
  getRoomUsers,
};
