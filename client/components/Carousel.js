import React from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import minibar from '../../public/minibar.jpg'
import cheers from '../../public/cheers.jpeg'
import youngPeopleDrink from '../../public/young-people-drinking.jpeg'
import groupDrink from '../../public/Group-Of-Happy-People-Drinking-And-Cheering-Alcohlic-Beverages.jpeg'

const s = {
  padding: '.5rem',
  fontSize: '2rem',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,.5)'
}

const BarCarousel = () => {
  return (
    <Carousel>
      <div>
        <img id="carouselImg" src={youngPeopleDrink} />
        <p style={s} className="legend">
          Bar!
        </p>
      </div>
      <div>
        <img id="carouselImg" src={cheers} />
        <p style={s} className="legend">
          Legendary Experience!
        </p>
      </div>
      <div>
        <img id="carouselImg" src={groupDrink} />
        <p style={s} className="legend">
          Woohoo!
        </p>
      </div>
    </Carousel>
  )
}

export default BarCarousel
