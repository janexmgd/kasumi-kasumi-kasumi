import { Fragment } from 'react';
import Navbar from '../component/Navbar.jsx';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import '../assets/css/Home.css';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer.jsx';

const Home = () => {
  const handleRandomTransform = (event) => {
    const serviceItem = event.currentTarget;
    const randomTransform = `translateX(${getRandomNumber(50, 200)}px)`;
    serviceItem.style.transform = randomTransform;
  };
  const ResetTransform = (e) => {
    const serviceItem = e.currentTarget;
    const randomTransform = `translateX(0px)`;
    serviceItem.style.transform = randomTransform;
  };

  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  const services = [
    {
      id: 1,
      title: 'Tiktok downloader',
      description: 'For download tiktok photo and video, not supported story',
      link: '/tiktokdl', // Perhatikan penggunaan lowercase 'link'
    },
    {
      id: 2,
      title: 'Service 2',
      description: 'Apcb',
      link: '/home',
    },
    {
      id: 3,
      title: 'Service 3',
      description: 'wir',
      link: '/home',
    },
  ];

  return (
    <Fragment>
      <div>
        <Navbar />
        <Container
          className='services-container mt-2 h=100'
          maxWidth='md'
          style={{ minHeight: '70vh' }}
        >
          <Typography variant='h2' align='center' gutterBottom>
            List Service
          </Typography>
          <List>
            {services.map((service) => (
              <ListItem
                key={service.id}
                className='service-item mt-1 mb-1'
                onMouseEnter={handleRandomTransform}
                onMouseLeave={ResetTransform}
              >
                <Link
                  to={service.link}
                  className='text-decoration-none text-black'
                >
                  <ListItemText
                    primary={service.title}
                    secondary={service.description}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Container>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
