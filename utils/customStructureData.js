const getCustomStructureUserData = (userData, isArray = false) => {
    if (isArray){
        for (let i = 0; i < userData.length - 1; i++) {
            userData[i].permissions = [...userData[i].otherPermission,...userData[i].roleId?.permissions];
            delete userData[i]["__v"];
            delete userData[i].password;
            delete userData[i].otherPermission;
            delete userData[i].roleId?.permissions;
        }
    }else{
        userData.permissions = [...userData.otherPermission,...userData?.roleId?.permissions];
        delete userData["__v"];
        delete userData?.password;
        delete userData?.otherPermission;
        delete userData?.roleId?.permissions;
    }

    return userData;
}

const userCommonPopulateFields = [
    {path: "cityId",select: "cityName"},
    {path: "stateId",select: "stateName"},
    {path: "countryId",select: "countryName"},
    {path: "roleId",select: "roleName", populate: {path: "permissions", select: ["permissionName", "permissionDisplayName"]}},
    {path: "otherPermission",select: ["permissionName", "permissionDisplayName"]},
    {path: "parentId",select: ["firstName","middleName","lastName"]},
];

module.exports = {getCustomStructureUserData, userCommonPopulateFields};