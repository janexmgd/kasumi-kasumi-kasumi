import { Fragment, useState } from 'react';
import Footer from '../component/Footer.jsx';
import ImageCarousel from '../component/carousel/ImgCarousel.jsx';
import {
  Button,
  Typography,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../component/Navbar.jsx';

const theme = createTheme();

const TiktokDL = () => {
  const [urlTiktok, setUrlTiktok] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const { data } = result;
      const response = await axios.get(data.url, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const urlObject = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = urlObject;
      if (data.type === 'video') {
        a.download = `${data.username}_${data.id}.mp4`;
      } else {
        console.log('Unsupported media type');
      }

      a.click();
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        'https://sosmed-wrapper.vercel.app/dl/tiktok/single',
        { url: urlTiktok }
      );
      setResult(res.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResult(null);
      setUrlTiktok('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
          <Navbar />
          <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='container w-75 mt-2 d-flex align-items-center flex-column'>
              <h2 className='mt-5 mb-5'>Tiktok downloader</h2>

              {result === null && (
                <form
                  className='w-100 d-flex align-items-center justify-content-center flex-column'
                  onSubmit={handleSubmit}
                >
                  <Typography component='h1' variant='h5' className='mb-3'>
                    Insert Tiktok Link
                  </Typography>
                  <div className='input-with-button d-flex flex-column mb-5'>
                    <TextField
                      type='text'
                      id='videoUrl'
                      name='videoUrl'
                      value={urlTiktok}
                      label='Insert link here'
                      variant='outlined'
                      margin='normal'
                      onChange={(e) => setUrlTiktok(e.target.value)}
                      required
                    />

                    {loading ? (
                      <Button
                        variant='contained'
                        type='submit'
                        disabled={loading}
                        className='mt-2 loader'
                      >
                        <div
                          className='spinner-border text-warning'
                          role='status'
                        ></div>
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        type='submit'
                        disabled={loading}
                        className='mt-2'
                      >
                        Download
                      </Button>
                    )}
                  </div>
                </form>
              )}

              {result?.data?.type === 'video' ? (
                <div className='mb-5 d-flex align-items-center justify-content-center flex-column'>
                  <h3>Result</h3>
                  <video className='mt-3' width='50%' height='auto' controls>
                    <source src={result.data.url} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>

                  <div>
                    <Typography variant='h6' gutterBottom>
                      {result.data.username}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {result.data.desc}
                    </Typography>
                  </div>

                  <div className='mb-3 d-flex flex-column'>
                    <Button
                      className='mb-3'
                      variant='contained'
                      color='primary'
                      onClick={handleDownload}
                      disabled={loading}
                    >
                      {loading ? (
                        <div
                          className='spinner-border text-warning'
                          role='status'
                        ></div>
                      ) : (
                        'Download'
                      )}
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleReset}
                      disabled={loading}
                    >
                      {loading ? (
                        <div
                          className='spinner-border text-warning'
                          role='status'
                        ></div>
                      ) : (
                        'Refetch'
                      )}
                    </Button>
                  </div>
                </div>
              ) : result?.data?.type === 'slideshow' ? (
                <ImageCarousel
                  id={result.data.id}
                  images={result.data.url}
                  username={result.data.username}
                  desc={result.data.desc}
                  handleReset={handleReset}
                  loading={loading}
                />
              ) : (
                <div>{error}</div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default TiktokDL;
