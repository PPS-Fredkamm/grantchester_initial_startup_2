import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Image, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  FaCamera,
  FaGraduationCap,
  FaUniversity,
  FaTags,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";

import * as ACM from "../../../../managers/ApiClientMethods";
import * as BLM from "../../../../managers/BusinessLayerMethods";

import ProfilePlaceholder from "../../../../assets/images/placeholder/profilePlaceholder.jpg";

// CSS now imported via styles/index.css

export default function ProfileInfo() {
  // Redux state
  const userDTO = useSelector((state) => state.auth.userDTO);
  const profileCDO = useSelector((state) => state.auth.profileCDO);
  const imageFile = useSelector((state) => state.auth.profileCDO.imageFile);

  // Local state
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(ProfilePlaceholder);
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    // bio: profileCDO?.bio || "",
    // company: profileCDO?.company || "",
    // alumni: profileCDO?.alumni || "",
    // universities: profileCDO?.universities || "",
    // interests: profileCDO?.interests || "",
  });

  const [originalData, setOriginalData] = useState({ ...profileData });

  // Update preview when Redux imageFile changes
  useEffect(() => {
    if (imageFile) {
      const imageUrl = ACM.createImageFileURL(imageFile);
      if (imageUrl) {
        const isBase64 = imageUrl.startsWith("data:image/");
        setPreviewImage(isBase64 ? imageUrl : `${imageUrl}?t=${Date.now()}`);
      } else {
        setPreviewImage(ProfilePlaceholder);
      }
    } else {
      setPreviewImage(ProfilePlaceholder);
    }
  }, [imageFile]);

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
    var flag;
    var tmpProfileCDO;

    try {
      let arrayBuf = e.target.result;
      let file = fileRef.current;

      tmpProfileCDO = JSON.parse(JSON.stringify(profileCDO));

      tmpProfileCDO.imageFile.name = file.name;
      tmpProfileCDO.imageFile.contentType = file.type;
      tmpProfileCDO.imageFile.data = ACM.arrayBufferToBase64(arrayBuf);
      tmpProfileCDO.imageFile.length = arrayBuf.byteLength;

      flag = await BLM.UpdateProfileCDO(tmpProfileCDO);
      if (!flag) {
        console.error("Image update failed");
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
  //
  // ========================================

  return (
    <div className="profile-info-container">
      <Card className="profile-info-card">
        {/* Body Section */}
        <Card.Body className="profile-info-body">
          {/* Profile Header */}
          <div className="profile-header-section">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Click to change photo</Tooltip>}>
              <div className="avatar-wrapper" onClick={handleImageClick}>
                <Image src={previewImage} roundedCircle className="profile-avatar" />
                <div className="icon-overlay">
                  <FaCamera />
                </div>
              </div>
            </OverlayTrigger>
            
            <div className="profile-header-info">
              <h4 className="profile-name">{userDTO?.username || "Unknown User"}</h4>
              <p className="profile-email">{profileCDO?.email || "email@example.com"}</p>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleFileChange}
          />
          {!editMode ? (
            <>
              {/* View Mode */}
              <div className="profile-info-section">
                {profileData.bio && (
                  <div className="info-item">
                    <div className="info-icon">
                      <FaUser />
                    </div>
                    <div className="info-content">
                      <h6 className="info-label">Bio</h6>
                      <p className="info-text">{profileData.bio}</p>
                    </div>
                  </div>
                )}
                
                {profileData.company && (
                  <div className="info-item">
                    <div className="info-icon">
                      <FaBuilding />
                    </div>
                    <div className="info-content">
                      <h6 className="info-label">Company</h6>
                      <p className="info-text">{profileData.company}</p>
                    </div>
                  </div>
                )}
                
                {profileData.alumni && (
                  <div className="info-item">
                    <div className="info-icon">
                      <FaGraduationCap />
                    </div>
                    <div className="info-content">
                      <h6 className="info-label">Alumni</h6>
                      <p className="info-text">{profileData.alumni}</p>
                    </div>
                  </div>
                )}
                
                {profileData.universities && (
                  <div className="info-item">
                    <div className="info-icon">
                      <FaUniversity />
                    </div>
                    <div className="info-content">
                      <h6 className="info-label">Interested Universities</h6>
                      <p className="info-text">{profileData.universities}</p>
                    </div>
                  </div>
                )}
                
                {profileData.interests && (
                  <div className="info-item">
                    <div className="info-icon">
                      <FaTags />
                    </div>
                    <div className="info-content">
                      <h6 className="info-label">Industry Interests</h6>
                      <p className="info-text">{profileData.interests}</p>
                    </div>
                  </div>
                )}

                {/* Empty state message */}
                {!profileData.bio && !profileData.company && !profileData.alumni && 
                 !profileData.universities && !profileData.interests && (
                  <div className="empty-state">
                    <p className="empty-state-text">Complete your profile to showcase your background and interests.</p>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <div className="profile-actions">
                <Button
                  variant="outline-primary"
                  className="profile-edit-btn"
                  onClick={handleEdit}
                >
                  <FiEdit3 className="me-2" />
                  Edit
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <div className="profile-edit-section">
                <Form.Group className="profile-form-group">
                  <Form.Label className="profile-form-label">
                    <FaUser className="profile-label-icon" /> Bio
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    className="profile-form-control"
                  />
                </Form.Group>

                <Form.Group className="profile-form-group">
                  <Form.Label className="profile-form-label">
                    <FaBuilding className="profile-label-icon" /> Company
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleChange}
                    placeholder="Where do you work?"
                    className="profile-form-control"
                  />
                </Form.Group>

                <Form.Group className="profile-form-group">
                  <Form.Label className="profile-form-label">
                    <FaGraduationCap className="profile-label-icon" /> Alumni
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="alumni"
                    value={profileData.alumni}
                    onChange={handleChange}
                    placeholder="University you graduated from"
                    className="profile-form-control"
                  />
                </Form.Group>

                <Form.Group className="profile-form-group">
                  <Form.Label className="profile-form-label">
                    <FaUniversity className="profile-label-icon" /> Interested Universities
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="universities"
                    value={profileData.universities}
                    onChange={handleChange}
                    placeholder="Universities you're interested in"
                    className="profile-form-control"
                  />
                </Form.Group>

                <Form.Group className="profile-form-group">
                  <Form.Label className="profile-form-label">
                    <FaTags className="profile-label-icon" /> Industry Interests
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="interests"
                    value={profileData.interests}
                    onChange={handleChange}
                    placeholder="Your professional interests"
                    className="profile-form-control"
                  />
                </Form.Group>
              </div>

              {/* Action Buttons */}
              <div className="profile-edit-actions">
                <Button variant="primary" className="profile-save-btn" onClick={handleSave}>
                  <FiSave className="me-2" />
                  Save Changes
                </Button>
                <Button variant="outline-secondary" className="profile-cancel-btn" onClick={handleCancel}>
                  <FiX className="me-2" />
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
