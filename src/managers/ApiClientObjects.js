// ========================================
//  ApiResult
// ========================================

export function ApiResult() {
    this.data = null;
    this.statusCode = 200;
    this.statusText = "Success";
    this.messages = [];
}

// ========================================
//  Profile
// ========================================

export function Profile() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toUTCString();
    this.modifiedDate = new Date().toUTCString();
    this.userID = 0;
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.email = "";
}

// ========================================
//  Role
// ========================================

export function Role() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toUTCString();
    this.modifiedDate = new Date().toUTCString();
    this.name = "";
    this.description = "";
}

// ========================================
//  User
// ========================================

export function User() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toUTCString();
    this.modifiedDate = new Date().toUTCString();
    this.memberID = "";
    this.username = "";
    this.passwordSalt = "";
    this.passwordHash = "";
    this.passwordChangeRequired = false;
    this.passwordLastChanged = new Date().toUTCString();
}



