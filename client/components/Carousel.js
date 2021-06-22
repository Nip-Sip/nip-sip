import React from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import minibar from '../../public/minibar.jpg'

const DemoCarousel = () => {
  return (
    <Carousel>
      <div>
        <img src={minibar} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={minibar} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={minibar} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  )
}

export default DemoCarousel
