// ========================================
// ========================================

import * as ACO from "../managers/ApiClientObjects";

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

  member: {
    user: null,
    profile: null,
    address: null,
    roles: null,
    imageFile: null,
  },

  initMember: function () {
    this.initUser();
    this.initProfile();
    this.initAddress();
    this.initRoles();
    this.initImageFile();
  },

  initUser: function () {
    this.member.user = new ACO.UserDTO();
  },

  initProfile: function () {
    this.member.profile = new ACO.ProfileDTO();
  },

  initAddress: function () {
    this.member.address = new ACO.AddressCDO();
  },

  initRoles: function () {
    this.member.roles = [];
  },

  initImageFile: function () {
    this.member.imageFile = new ACO.ImageFile();
  },

  // ========================================
  // Persistence Helpers
  // ========================================

  saveToSessionStorage: function () {
    const data = {
      apiInfo: this.apiInfo,
      member: this.member,
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
      this.member = parsed.member;
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
