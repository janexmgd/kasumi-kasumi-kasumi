import { Fragment, useState } from 'react';
import Footer from '../component/Footer.jsx';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import axios from 'axios';
import '../assets/css/TiktokDL.css';
import Navbar from '../component/Navbar.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const TiktokDL = () => {
  const [urlTiktok, setUrlTiktok] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    try {
      setLoading(true);
      const url = result.data.url;
      const id = result.data.id;
      const username = result.data.username;
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const urlObject = window.URL.createObjectURL(blob);

      // Buat elemen <a> untuk mengeksekusi unduhan
      const a = document.createElement('a');
      a.href = urlObject;
      if (result.data.type == 'video') {
        a.download = `${username}_${id}.mp4`; // Nama file unduhan
      } else {
        console.log('b');
      }

      a.click();

      // Bebaskan objek URL setelah pengunduhan
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        'https://sosmed-wrapper.vercel.app/dl/tiktok/single',
        {
          url: urlTiktok,
        }
      );
      console.log(res.data);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      setError(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='card container w-75 mt-2 d-flex align-items-center shadow'>
              <h2 className='mt-5'>Tiktok downloader</h2>
              <form
                className='w-100 d-flex align-items-center justify-content-center flex-column '
                onSubmit={handleSubmit}
              >
                <label htmlFor='videoUrl'>Insert Tiktok Link</label>
                <div className='input-with-button d-flex flex-column'>
                  <input
                    type='text'
                    id='videoUrl'
                    name='videoUrl'
                    value={urlTiktok}
                    onChange={(e) => setUrlTiktok(e.target.value)}
                    required
                  />
                  <Button
                    variant='contained'
                    type='submit'
                    disabled={loading}
                    className='mt-2 mb-5'
                  >
                    {loading ? 'Loading......' : 'Download.......'}
                  </Button>
                </div>
              </form>
              {result ? (
                // Display the result here
                <Card className='mb-5 d-flex align-items-center justify-content-center flex-column'>
                  <video width='50%' height='auto' controls>
                    <source src={result.data.url} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>

                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      {result.data.username}
                    </Typography>

                    <Typography variant='body2' color='textSecondary'>
                      {result.data.desc}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleDownload()}
                      disabled={loading}
                    >
                      {loading ? 'Loading' : 'Download'}
                    </Button>
                  </CardActions>
                </Card>
              ) : error ? (
                <p className='video-not-found'>{error}</p>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Fragment>
  );
};
export default TiktokDL;
