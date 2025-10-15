import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Accordion } from "react-bootstrap";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";

import * as ACELocation from "../../../../../managers/ApiClient-Location";
import * as ACM from "../../../../../managers/ApiClientMethods";
import * as BLM from "../../../../../managers/BusinessLayerMethods";

import ContactInfo from "./ContactInfo";
import AddressInfo from "./AddressInfo";

import "../../Profile.css";
import "./BasicInfo.css";

export default function BasicInfo() {
  const profileCDO = useSelector((state) => state.auth.profileCDO);

  const [states, setStates] = useState([]);
  const [statesDDL, setStatesDDL] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesDDL, setCountriesDDL] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: profileCDO?.firstName || "",
    middleName: profileCDO?.middleName || "",
    lastName: profileCDO?.lastName || "",
    phoneNumber: profileCDO?.phoneNumber || "",
    email: profileCDO?.email || "",

    address1: profileCDO?.addressCDO?.addressLine1 || "",
    address2: profileCDO?.addressCDO?.addressLine2 || "",
    address3: profileCDO?.addressCDO?.addressLine3 || "",
    cityName: profileCDO?.addressCDO?.cityName || "",
    stateListItem:
      profileCDO?.addressCDO?.state?.abbreviation +
        " ( " +
        profileCDO?.addressCDO?.state?.name +
        " )" || "",
    postalCode: profileCDO?.addressCDO?.postalCode || "",
    countryListItem:
      profileCDO?.addressCDO?.country?.name +
        " [ " +
        profileCDO?.addressCDO?.country?.abbreviation +
        " ]" || "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  useEffect(() => {
    async function fetchDDLData() {
      try {
        let apiResult;
        let states, countries;
        let list;

        apiResult = await ACELocation.GetStatesAsync();
        states = ACM.getApiResultData(apiResult);
        setStates(states);
        list = states.map((o) => o.abbreviation + " ( " + o.name + " )");
        setStatesDDL(list);

        apiResult = await ACELocation.GetCountriesAsync();
        countries = ACM.getApiResultData(apiResult);
        setCountries(countries);
        list = countries.map((o) => o.name + " [ " + o.abbreviation + " ]");
        setCountriesDDL(list);
      } catch (error) {
        console.error("Error fetching DDL data:", error);
      }
    }
    fetchDDLData();
  }, []);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCancel() {
    setFormData(originalData);
    setEditMode(false);
  }

  async function handleSave() {
    var flag;
    var index;
    var tmpProfileCDO;

    try {
      tmpProfileCDO = JSON.parse(JSON.stringify(profileCDO));

      tmpProfileCDO.firstName = formData.firstName;
      tmpProfileCDO.middleName = formData.middleName;
      tmpProfileCDO.lastName = formData.lastName;
      tmpProfileCDO.phoneNumber = formData.phoneNumber;
      tmpProfileCDO.email = formData.email;

      tmpProfileCDO.addressCDO.addressLine1 = formData.address1;
      tmpProfileCDO.addressCDO.addressLine2 = formData.address2;
      tmpProfileCDO.addressCDO.addressLine3 = "";
      tmpProfileCDO.addressCDO.cityName = formData.cityName;
      tmpProfileCDO.addressCDO.postalCode = formData.postalCode;

      index = statesDDL.findIndex((o) => o === formData.stateListItem);
      tmpProfileCDO.addressCDO.stateID = index;
      tmpProfileCDO.addressCDO.state = states[index];

      index = countriesDDL.findIndex((o) => o === formData.countryListItem);
      tmpProfileCDO.addressCDO.countryID = index;
      tmpProfileCDO.addressCDO.country = countries[index];

      flag = await BLM.UpdateProfileCDO(tmpProfileCDO);
      if (flag) {
        setOriginalData(formData);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
    setEditMode(false);
  }

  return (
    <div className="px-2">
      <div className="d-flex justify-content-end mb-4">
        {!editMode ? (
          <Button
            variant="outline-primary"
            onClick={() => setEditMode(true)}
            className="profile-edit-btn"
          >
            <FiEdit3 className="me-2" />
            Edit
          </Button>
        ) : (
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleSave} className="profile-save-btn">
              <FiSave className="me-2" />
              Save Changes
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleCancel}
              className="profile-cancel-btn"
            >
              <FiX className="me-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Form>
        <Accordion
          defaultActiveKey={["0", "1"]}
          alwaysOpen
          className="profile-accordion"
        >
          <ContactInfo
            formData={formData}
            editMode={editMode}
            handleChange={handleChange}
          />
          <AddressInfo
            formData={formData}
            editMode={editMode}
            handleChange={handleChange}
            statesDDL={statesDDL}
            countriesDDL={countriesDDL}
          />
        </Accordion>
      </Form>
    </div>
  );
}
