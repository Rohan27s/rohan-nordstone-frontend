import React, { useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { firestore } from './firebase';
import './ImageUpload.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = () => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>('');
  const [showReplaceDialog, setShowReplaceDialog] = useState<boolean>(false);
  const [showCameraPreview, setShowCameraPreview] = useState<boolean>(false);

  const storage = firebase.storage();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const picked = e.target.files[0];
      setImage(picked);
      setImageUrl(URL.createObjectURL(picked)); // Create a temporary URL for the selected image
    }
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (image) {
      const storageRef = storage.ref(`images`);
      const uploadTask = storageRef.put(image);

      uploadTask.on(
        'state_changed',
        null,
        (error: any) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Get the image URL after successful upload
          uploadTask.snapshot.ref.getDownloadURL().then((url: string) => {
            firestore.collection('images').add({
              imgUrl: url,
            });
            setImageUrl(url);
            toast.success('Image uploaded successfully!', {
              position: 'top-center',
            });
          });
        }
      );
    } else {
      toast.error('Please select an image before uploading!', {
        position: 'top-center',
      });
    }
  };

  const handleCameraCapture = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        setShowCameraPreview(true); // Show the camera preview
        setShowReplaceDialog(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Error accessing camera.');
      }
    } else {
      alert('Camera is not available on this device.');
    }
  };

  const takePicture = () => {
    if (cameraVideoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = cameraVideoRef.current.videoWidth;
      canvas.height = cameraVideoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(
          cameraVideoRef.current,
          0,
          0,
          cameraVideoRef.current.videoWidth,
          cameraVideoRef.current.videoHeight
        );

        canvas.toBlob((blob) => {
          setImage(blob);
          setShowCameraPreview(false); // Hide the camera preview after capturing
          setShowReplaceDialog(true); // Show the dialog for replace options
        }, 'image/jpeg', 1);
      }
    }
  };



  const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const picked = e.target.files[0];
      setImage(picked);
      setShowReplaceDialog(false); // Close the dialog after selecting the image
    }
  };

  const handleReplaceFromGallery = () => {
    setShowReplaceDialog(false); // Close the dialog
    // Open the file input for gallery image selection
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };
  const startCameraPreview = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (cameraVideoRef.current) {
          cameraVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Error accessing camera.');
      }
    } else {
      alert('Camera is not available on this device.');
    }
  };
  return (
    <>
      <div className="image-upload-container">
        <h2>Upload Photo</h2>
        <div className="image-preview-container">
          {showCameraPreview ? (
            <video ref={cameraVideoRef} autoPlay className="camera-preview" />
          ) : image ? (
            <img src={URL.createObjectURL(image)} alt="Captured" className="image-preview" />
          ) : imageUrl ? (
            <img src={imageUrl} alt="Uploaded" className="image-preview" />
          ) : (
            <p className="no-photo">No Photo Selected</p>
          )}
        </div>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>

        {/* Add the replace image functionality */}
        <button onClick={() => setShowReplaceDialog(true)} className="replace-button">
          {imageUrl ? 'Replace Image' : 'Select Photo'}
        </button>

        {/* Modal for replace options */}
        {showReplaceDialog && (
          <div className="replace-dialog">
            {!showCameraPreview && (
              <button onClick={() => { handleCameraCapture(); startCameraPreview(); }} className="capture-button">
                Start Camera
              </button>
            )}
            {showCameraPreview && (
              <>
                <button onClick={takePicture} className="capture-button">
                  Capture
                </button>
              </>
            )}
            <button onClick={handleReplaceFromGallery} className="gallery-button">
              Upload from Gallery
            </button>
            <button onClick={() => setShowReplaceDialog(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={cameraInputRef}
          capture={showCameraPreview ? undefined : 'environment'}
          style={{ display: 'none' }}
          onChange={handleCameraChange}
        />
      </div>
      <ToastContainer />
    </>
  );




};

export default ImageUpload;
