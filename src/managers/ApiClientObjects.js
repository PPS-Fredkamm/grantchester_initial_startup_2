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
//  Address
// ========================================

// ========================================
//  State
// ========================================

// ========================================
//  Country
// ========================================

// ========================================
//  ImageFile
// ========================================

export function ImageFile() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toISOString();
    this.modifiedDate = new Date().toISOString();
    this.userID = 0;
    this.path = "";
    this.name = "";
    this.contentType = "";
    this.order = 0;
    this.data = "";
    this.length = 0;
}

// ========================================
//  Profile
// ========================================

export function Profile() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toISOString();
    this.modifiedDate = new Date().toISOString();
    this.userID = 0;
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.addressID = 0;
    this.phoneNumber = "";
    this.email = "";
}

// ========================================
//  Role
// ========================================

export function Role() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toISOString();
    this.modifiedDate = new Date().toISOString();
    this.name = "";
    this.description = "";
}

// ========================================
//  User
// ========================================

export function User() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toISOString();
    this.modifiedDate = new Date().toISOString();
    this.memberID = "";
    this.username = "";
    this.passwordSalt = "";
    this.passwordHash = "";
    this.passwordChangeRequired = false;
    this.passwordLastChanged = new Date().toISOString();
}

// ========================================
//  UserRole
// ========================================

export function UserRole() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toISOString();
    this.modifiedDate = new Date().toISOString();
    this.userID = 0;
    this.roleID = 0;
}
