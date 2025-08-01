import { useEffect, useRef, useState } from "react";
import { Card, Button, Image, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  FaCamera,
  FaGraduationCap,
  FaUniversity,
  FaTags,
  FaBuilding,
} from "react-icons/fa";

import ProfilePlaceholder from "../../../assets/Images/profilePlaceholder.jpg";
import Globals from "../../../global/globals";
import * as AM from "../../../managers/AuthManager";
import * as ACM from "../../../managers/ApiClientMethods";
import * as ACO from "../../../managers/ApiClientObjects";

import "./ProfileInfo.css";

export default function ProfileInfo() {
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(ProfilePlaceholder);
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    // bio: Globals.profileInfo.bio || "",
    // company: Globals.profileInfo.company || "",
    // alumni: Globals.profileInfo.alumni || "",
    // universities: Globals.profileInfo.universities || "",
    // interests: Globals.profileInfo.interests || "",
  });

  const [originalData, setOriginalData] = useState({ ...profileData });

  useEffect(() => {
    if (Globals.member.imageFile.id > 0) {
      let dataUrl = ACM.createImageFileURL(Globals.member.imageFile);
      setPreviewImage(dataUrl);
    }
  }, [previewImage]);

  // ========================================
  // Image Handlers
  // ========================================

  function handleImageClick() {
    inputRef.current.click();
  }

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      fileRef.current = file;
      let reader = new FileReader();
      reader.onload = handleFileLoad;
      reader.readAsArrayBuffer(file);
    }
  }

  async function handleFileLoad(e) {
    try {
      let arrayBuf = e.target.result;
      let file = fileRef.current;

      let imageFile = new ACO.ImageFile();
      imageFile.name = file.name;
      imageFile.contentType = file.type;
      imageFile.data = ACM.arrayBufferToBase64(arrayBuf);
      imageFile.length = arrayBuf.byteLength;

      let flag = await AM.UpdateImageFile(imageFile);
      if (flag) {
        await AM.ReloadMember();
        // window.location.reload();
        const imageUrl =
          ACM.createImageFileURL(Globals.member.imageFile) + `?t=${Date.now()}`;
        setPreviewImage(imageUrl);
      }

      fileRef.current = null;
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  }

  // ========================================
  // Profile Info Handlers
  // ========================================

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setOriginalData({ ...profileData });
    setEditMode(true);
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setEditMode(false);
  };

  const handleSave = () => {
    console.log("Saving profile info:", profileData);
    // TODO: Persist to API when backend is ready
    setEditMode(false);
  };

  // ========================================
  // JSX
  // ========================================

  return (
    <Card className="shadow p-4">
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
        <div className="avatar-wrapper mb-3" onClick={handleImageClick}>
          <Image src={previewImage} roundedCircle className="profile-avatar" />
          <div className="icon-overlay">
            <FaCamera />
          </div>
        </div>
      </OverlayTrigger>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />

      <div className="text-start">
        <h4 className="mb-1">{Globals.member.user.username}</h4>
        <p className="text-muted mb-2">
          {Globals.member.profile.email || "email@example.com"}
        </p>

        {!editMode ? (
          <>
            {profileData.bio && (
              <p className="text-muted mb-1 d-flex align-items-center">
                <strong className="ms-1">{profileData.bio}</strong>
              </p>
            )}
            {profileData.company && (
              <p className="text-muted mb-1 d-flex align-items-center">
                <FaBuilding className="me-2" />I work for:{" "}
                <strong className="ms-1">{profileData.company}</strong>
              </p>
            )}
            {profileData.alumni && (
              <p className="text-muted mb-1 d-flex align-items-center">
                <FaGraduationCap className="me-2" />
                Alumni of:{" "}
                <strong className="ms-1">{profileData.alumni}</strong>
              </p>
            )}
            {profileData.universities && (
              <p className="text-muted mb-1 d-flex align-items-center">
                <FaUniversity className="me-2" />
                Interested Universities:{" "}
                <strong className="ms-1">{profileData.universities}</strong>
              </p>
            )}
            {profileData.interests && (
              <p className="text-muted mb-3 d-flex align-items-center">
                <FaTags className="me-2" />
                Interests:{" "}
                <strong className="ms-1">{profileData.interests}</strong>
              </p>
            )}

            <Button
              variant="outline-primary"
              className="w-100"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </>
        ) : (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Add a bio"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaBuilding className="me-1" /> Company
              </Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={profileData.company}
                onChange={handleChange}
                placeholder="The company you work for"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaGraduationCap className="me-1" /> Alumni (College/University)
              </Form.Label>
              <Form.Control
                type="text"
                name="alumni"
                value={profileData.alumni}
                onChange={handleChange}
                placeholder="University you graduated from"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaUniversity className="me-1" /> Interested Universities
              </Form.Label>
              <Form.Control
                type="text"
                name="universities"
                value={profileData.universities}
                onChange={handleChange}
                placeholder="Universities you are interested in"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaTags className="me-1" /> Industry Interests
              </Form.Label>
              <Form.Control
                type="text"
                name="interests"
                value={profileData.interests}
                onChange={handleChange}
                placeholder="Your industry interests"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" className="w-50" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outline-secondary"
                className="w-50"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
