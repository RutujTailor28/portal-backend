const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const { ErrorResponse, getCustomStructureUserData } = require("../utils");
const User = require("../Database/Schemas/User");

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    //varify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id).populate([
      { path: "cityId", select: "cityName" },
      { path: "stateId", select: "stateName" },
      { path: "countryId", select: "countryName" },
      {
        path: "roleId",
        select: "roleName",
        populate: {
          path: "permissions",
          select: ["permissionName", "permissionDisplayName"],
        },
      },
      {
        path: "otherPermission",
        select: ["permissionName", "permissionDisplayName"],
      },
      { path: "parentId", select: ["firstName", "middleName", "lastName"] },
    ]);
    if (req.user) {
      next();
    } else {
      return next(new ErrorResponse("User not found", 404));
    }
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Grant access to specific role
exports.authorize = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.roleId.roleName.toLowerCase())) {
      return next();
    }

    next(new ErrorResponse(`You are not authorized to access this route`, 403));
  };
};

// Grant access to specific role
exports.checkPermission = (...permissions) => {
  return (req, res, next) => {
    const allPermission = [
      ...req.user.roleId.permissions,
      ...req.user.otherPermission,
    ];
    for (let permission of allPermission) {
      if (permissions.includes(permission.permissionName)) {
        return next();
      }
    }

    next(
      new ErrorResponse(`You don't have permission to perform this task`, 403)
    );
  };
};
