import { Fragment, useState } from 'react';
import axios from 'axios';
import '../assets/css/TiktokDL.css';
import Navbar from '../component/Navbar.jsx';

const TiktokDL = () => {
  const [urlTiktok, setUrlTiktok] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
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
                <button
                  type='submit'
                  disabled={loading}
                  className='download-bt mt-2'
                >
                  {loading ? 'Loading......' : 'Download.......'}
                </button>
              </div>
            </form>
            {result ? (
              // Display the result here
              <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
                <p>{result.data.username}</p>
                <p>{result.data.desc}</p>
                <div className='d-flex w-100 flex-column justify-content-center align-items-center'>
                  <h3>Video Player</h3>
                  <div className='d-flex w-100 flex-column justify-content-center align-items-center'>
                    <iframe
                      title='Embedded Video'
                      width='360'
                      height='auto'
                      src={result.data.url}
                      frameBorder='0'
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <button
                  className='download-bt mt-5'
                  onClick={() => handleDownload()}
                >
                  Download Video
                </button>
              </div>
            ) : error ? (
              <p className='video-not-found'>{error}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default TiktokDL;
