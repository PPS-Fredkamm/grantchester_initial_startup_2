// ========================================
// ========================================

export default {
  // ----------------------------------------

  apiInfo: {
    apiEnvironment: "",
    bearerToken: null,
  },

  initApiInfo: function () {
    this.apiInfo.apiEnvironment = "none";
    this.apiInfo.bearerToken = null;
  },

  // ----------------------------------------

  userInfo: {
    id: 0,
    memberID: 0,
    username: "",
  },

  initUserInfo: function () {
    this.userInfo.id = 0;
    this.userInfo.memberID = 0;
    this.userInfo.username = "guest";
  },

  // ----------------------------------------

  profileInfo: {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },

  initProfileInfo: function () {
    this.profileInfo.firstName = "Guest";
    this.profileInfo.middleName = "";
    this.profileInfo.lastName = "User";
    this.profileInfo.phoneNumber = "";
    this.profileInfo.email = "";
  },

  // ----------------------------------------

  roleInfo: {
    roles: [],
  },

  initRoleInfo: function () {
    this.roleInfo.roles.length = 0;
  },

  // ----------------------------------------

  imageFileInfo: {
    id: 0,
    name: "",
    contentType: "",
    data: "",
    length: 0,
  },

  initImageFileInfo: function () {
    this.imageFileInfo.id = 0;
    this.imageFileInfo.name = "";
    this.imageFileInfo.contentType = "";
    this.imageFileInfo.data = "";
    this.imageFileInfo.length = 0;
  },

  createImageFileURL: function () {
    let dataUrl = "";
    if (this.imageFileInfo.data.length > 0) {
      dataUrl += "data:";
      dataUrl += this.imageFileInfo.contentType;
      dataUrl += ";";
      dataUrl += "base64,";
      dataUrl += this.imageFileInfo.data;
    }
    return dataUrl;
  },

  // ========================================
  // Persistence Helpers
  // ========================================

  saveToSessionStorage: function () {
    const data = {
      apiInfo: this.apiInfo,
      userInfo: this.userInfo,
      profileInfo: this.profileInfo,
      roleInfo: this.roleInfo,
      imageFileInfo: this.imageFileInfo,
      lastActive: Date.now(),
    };
    sessionStorage.setItem("grantchester.auth", JSON.stringify(data));
  },

  loadFromSessionStorage: function () {
    const stored = sessionStorage.getItem("grantchester.auth");
    if (!stored) return false;

    try {
      const parsed = JSON.parse(stored);
      this.apiInfo = parsed.apiInfo || this.apiInfo;
      this.userInfo = parsed.userInfo || this.userInfo;
      this.profileInfo = parsed.profileInfo || this.profileInfo;
      this.roleInfo = parsed.roleInfo || this.roleInfo;
      this.imageFileInfo = parsed.imageFileInfo || this.imageFileInfo;
      return true;
    } catch (e) {
      console.error("Failed to parse globals from sessionStorage:", e);
      return false;
    }
  },

  clearFromSessionStorage: function () {
    sessionStorage.removeItem("grantchester.auth");
  },
};
