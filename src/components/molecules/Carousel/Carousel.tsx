import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.scss';

const CustomCarousel = ({
  children,
  centerSlidePercentage,
  centerMode,
  showIndicators,
  showThumbs,
  showStatus,
}) => {
  return (
    <Carousel
      centerSlidePercentage={centerSlidePercentage}
      centerMode={centerMode}
      showIndicators={showIndicators}
      showThumbs={showThumbs}
      showStatus={showStatus}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
