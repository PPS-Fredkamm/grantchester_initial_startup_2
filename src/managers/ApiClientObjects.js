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

export function Address()
{
    this.id = 0;
    this.addressLine1 = "";
    this.addressLine2 = "";
    this.addressLine3 = "";
    this.cityName = "";
    this.stateID = 0;
    this.countryID = 0;
    this.postalCode = ""    ;
}

// ========================================
//  AddressDTO
// ========================================

export function AddressDTO()
{
    this.id = 0;
    this.addressLine1 = "";
    this.addressLine2 = "";
    this.addressLine3 = "";
    this.cityName = "";
    this.stateAbbreviation = "";
    this.stateName = "";
    this.countryAbbreviation = "";
    this.countryName = "";
    this.postalCode = ""    ;
}

// ========================================
//  State
// ========================================

export function State()
{
    this.id = 0;
    this.abbreviation = "";
    this.name = "";
    this.capital = "";
    this.timezones = "";
    this.ianaTimezones = "";
    this.lattitude = 0;
    this.longitude = 0;
}

// ========================================
//  Country
// ========================================

// ========================================
//  ImageFile
// ========================================

export function ImageFile() {
    this.id = 0;
    this.name = "";
    this.contentType = "";
    this.data = "";
    this.length = 0;
}

// ========================================
//  Profile
// ========================================

export function Profile() {
    this.id = 0;
    this.addressID = 0;
    this.email = "";
    this.firstName = "";
    this.imageID = 0;
    this.lastName = "";
    this.middleName = "";
    this.phoneNumber = "";
    this.prefix = "";
    this.suffix = "";
    this.title = "";
}

// ========================================
//  ProfileDTO
// ========================================

export function ProfileDTO() {
    this.id = 0;
    this.addressID = 0;
    this.email = "";
    this.firstName = "";
    this.imageID = 0;
    this.lastName = "";
    this.middleName = "";
    this.phoneNumber = "";
    this.prefix = "";
    this.suffix = "";
    this.title = "";
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
    this.profileID = "";
    this.username = "";
    this.passwordSalt = "";
    this.passwordHash = "";
    this.passwordChangeRequired = false;
    this.passwordLastChanged = new Date().toISOString();
    this.loginCount = 0;
    this.loginTimestamp = new Date().toISOString();
}

// ========================================
//  UserDTO
// ========================================

export function UserDTO() {
    this.id = 0;
    this.isEnabled = false;
    this.createdDate = new Date().toISOString();
    this.modifiedDate = new Date().toISOString();
    this.memberID = "";
    this.profileID = 0;
    this.username = "";
    this.passwordChangeRequired = false;
    this.passwordLastChanged = new Date().toISOString();
    this.loginCount = 0;
    this.loginTimestamp = new Date().toISOString();
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
