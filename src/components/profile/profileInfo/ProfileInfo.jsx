import { useRef, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaCamera } from 'react-icons/fa';

import { useAuthContext } from '../../../context/AuthProvider';
import ProfilePlaceholder from '../../../assets/Images/profilePlaceholder.jpg';

import Globals from "../../../global/globals";

import './ProfileInfo.css';

export default function ProfileInfo() {
  const authCtx = useAuthContext();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(ProfilePlaceholder);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    // TODO: store file or send to API
    console.log('📸 Selected file:', file);
  };

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
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="text-start">
        <h4 className="mb-1">{Globals.userInfo.username || 'Full Name'}</h4>
        <p className="text-muted mb-3">
          {Globals.profileInfo.email || 'email@example.com'}
        </p>
        <Button variant="outline-primary" className="w-100">
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}
