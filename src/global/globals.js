// ========================================
// ========================================

export default {
  // ----------------------------------------

  apiEnvironment: "none",

  // ----------------------------------------

  userInfo: {
    bearerToken: null,
    memberID: 0,
    userID: 0,
    username: "",
  },

  initUserInfo: function () {
    // console.log("Initialize UserInfo ...");
    this.userInfo.bearerToken = null;
    this.userInfo.memberID = 0;
    this.userInfo.userID = 0;
    this.userInfo.username = "guest";
  },

  // ----------------------------------------

  profileInfo: {
    firstName: "Guest",
    middleName: "",
    lastName: "User",
    email: "",
  },

  initProfileInfo: function () {
    // console.log("Initialize ProfileInfo ...");
    this.profileInfo.firstName = "";
    this.profileInfo.middleName = "";
    this.profileInfo.lastName = "";
    this.profileInfo.email = "";
  },

  // ----------------------------------------

  roleInfo: {
    role: "",
    roles: [],
  },

  initRoleInfo: function () {
    // console.log("Initialize RoleInfo ...");
    this.roleInfo.role = "default";
    this.roleInfo.roles.length = 0;
  },
};
