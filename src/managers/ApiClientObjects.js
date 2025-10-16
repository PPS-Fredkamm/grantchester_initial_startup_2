// ========================================
// ----------------------------------------
//  ApiClientObjects
//  Javascript Constructor Functions for use with new operator
// ----------------------------------------
// ========================================

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

export function Address() {
  this.id = 0;
  this.addressLine1 = "";
  this.addressLine2 = "";
  this.addressLine3 = "";
  this.cityName = "";
  this.postalCode = "";
  this.stateID = 0;
  this.countryID = 0;
}

// ========================================
//  AddressCDO
// ========================================

export function AddressCDO() {
  this.id = 0;
  this.addressLine1 = "";
  this.addressLine2 = "";
  this.addressLine3 = "";
  this.cityName = "";
  this.postalCode = "";
  this.stateID = 0;
  this.state = new State();
  this.countryID = 0;
  this.country = new Country();
}

// ========================================
//  Company
// ========================================

export function Company() {
  this.id = 0;
  this.isEnabled = false;
  this.isVerified = false;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.name = "";
  this.profileID = 0;
  this.employerIdentificationNumber = "";
}

// ========================================
//  CompanyCDO
// ========================================

export function CompanyCDO() {
  this.id = 0;
  this.isEnabled = false;
  this.isVerified = false;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.name = "";
  this.profileID = 0;
  this.profileCDO = new ProfileCDO();
  this.employerIdentificationNumber = "";
}

// ========================================
//  Country
// ========================================

export function Country() {
  this.id = 0;
  this.name = "";
  this.abbreviation = "";
  this.capital = "";
  this.latitude = 0;
  this.longitude = 0;
}

// ========================================
//  Donation
// ========================================

export function Donation() {
  this.id = 0;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.isConfirmed = false;
  this.userID = 0;
  this.donationID = 0;
  this.donationDate = new Date().toISOString();
  this.donationStatusID = 0;
  this.transactionID = 0;
  this.units = 0;
  this.initialValuation = 0;
  this.currentValuation = 0;
  this.valuationDate = new Date().toISOString();
  this.note = "";
  this.companyID = 0;
  this.universityID = 0;
}

// ========================================
//  DonationCDO
// ========================================

export function DonationCDO() {
  this.id = 0;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.isConfirmed = false;
  this.userID = 0;
  this.donationID = 0;
  this.donationDate = new Date().toISOString();
  this.donationStatusID = 0;
  this.donationStatus = new DonationStatus();
  this.transactionID = 0;
  this.units = 0;
  this.initialValuation = 0;
  this.currentValuation = 0;
  this.valuationDate = new Date().toISOString();
  this.note = "";
  this.companyID = 0;
  this.companyCDO = null;
  this.universityID = 0;
  this.universityCDO = null;
}

// ========================================
//  DonationStatus
// ========================================

export function DonationStatus() {
  this.id = 0;
  this.isEnabled = false;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.sequence = 0;
  this.code = "";
  this.name = "";
  this.description = "";
}

// ========================================
//  DonationStatusCode
// ========================================

export const DonationStatusCode = Object.freeze({
  UNDEFINED: 0,
  CREATED: 1,
});

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
//  ProfileCDO
// ========================================

export function ProfileCDO() {
  this.id = 0;
  this.addressID = 0;
  this.addressCDO = new AddressCDO();
  this.email = "";
  this.firstName = "";
  this.imageID = 0;
  this.imageFile = new ImageFile();
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
//  State
// ========================================

export function State() {
  this.id = 0;
  this.abbreviation = "";
  this.name = "";
  this.capital = "";
  this.timezones = "";
  this.ianaTimezones = "";
  this.latitude = 0;
  this.longitude = 0;
}

// ========================================
//  University
// ========================================

export function University() {
  this.id = 0;
  this.isEnabled = false;
  this.isVerified = false;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.name = "";
  this.displayCode = "";
  this.profileID = 0;
}

// ========================================
//  UniversityCDO
// ========================================

export function UniversityCDO() {
  this.id = 0;
  this.isEnabled = false;
  this.isVerified = false;
  this.createdDate = new Date().toISOString();
  this.modifiedDate = new Date().toISOString();
  this.name = "";
  this.displayCode = "";
  this.profileID = 0;
  this.profileCDO = new ProfileCDO();
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
