/* eslint-disable react/prop-types */
// Assuming ImageCarousel.jsx
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const ImageCarousel = ({
  id,
  images,
  username,
  desc,
  handleReset,
  loading,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const handleDownload = async () => {
    try {
      const url = images[currentImageIndex];
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });

      if (!blob.type.startsWith('image/')) {
        console.error('Invalid image type:', blob.type);
        return;
      }

      const urlObject = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlObject;
      a.download = `${username}_${id}_${currentImageIndex}.png`;
      a.click();
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('Error during download:', error);
    }
  };

  return (
    <div className='mb-5 d-flex align-items-center justify-content-center flex-column'>
      <h3>Result</h3>
      <h1 className='mb-2'>{currentImageIndex + 1}</h1>

      <div>
        <img
          src={images[currentImageIndex]}
          alt={`TikTok Image ${currentImageIndex + 1}`}
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '300px',
            marginBottom: '10px',
          }}
        />
      </div>

      <div>
        <Typography variant='h6' gutterBottom>
          {username}
        </Typography>

        <Typography variant='body2' color='textSecondary'>
          {desc}
        </Typography>
      </div>

      <div className='mt-3 mb-3 d-flex flex-column'>
        <Button
          className='mb-3'
          variant='contained'
          color='primary'
          onClick={() => handleDownload()}
          disabled={loading}
        >
          {loading ? (
            <div className='spinner-border text-warning' role='status'></div>
          ) : (
            'Download'
          )}
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleReset()}
          disabled={loading}
        >
          {loading ? (
            <div className='spinner-border text-warning' role='status'></div>
          ) : (
            'Refetch'
          )}
        </Button>
      </div>

      <div>
        <Button
          className=''
          variant='contained'
          color='primary'
          onClick={handlePrevImage}
        >
          Previous
        </Button>
        <Button
          className='ms-2'
          variant='contained'
          color='primary'
          onClick={handleNextImage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ImageCarousel;
