"use client";
import React from 'react';
import dynamic from 'next/dynamic'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import { cloudinaryConfig } from './config';
const UploadFile = ({ onUpload }) => {

  const handleUpload = (event) => {
    // Handle the uploaded file or URL as needed
    const fileOrUrl = event.info.secure_url || event.info.files[0];
    if (onUpload) {
      onUpload(fileOrUrl);
    }
  };


  return (
    <div>
      <WidgetLoader />
      <Widget
        sources={['local', 'url', 'image_search', 'camera', 'dropbox']}
        resourceType={'image'}
        cloudName={cloudinaryConfig.cloudName}
        uploadPreset={cloudinaryConfig.uploadPreset}
        buttonText={'Document'}
        style={{
          color: 'white',
          border: 'none',
          width: "10rem",
          backgroundColor: "green",
          borderRadius: '0.375rem',
          fontWeight:"bold",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "1rem",
          paddingBottom: "2rem",
          margin:"0",
          height: '36px'
         
        }} 
   
        folder={'sp_uploads'}
        cropping={false}
        use_filename={false}
        logging={true}
        widgetStyles={{
          palette: {
            window: ' #3fdc52',
            windowBorder: '#FFFFFF',
            tabIcon: '#ffffff',
            menuIcons: '#ffffff',
            textDark: '#ffffff',
            textLight: '#FFFFFF',
            link: '#0cf327',
            action: '#FF620C',
            inactiveTabIcon: '#fff',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#a7f6c4'
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
              active: true
            }
          }
        }} // ability to customise the style of the widget uploader
        destroy={true}
        generateSignatureUrl={'https://kds-back.onrender.com/api/medias/uploads/sign'}
        apiKey={cloudinaryConfig.apiKey}
        accepts={'application/json'}
        contentType={'application/json'}
        onSuccess={handleUpload}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(UploadFile), { ssr: false });

