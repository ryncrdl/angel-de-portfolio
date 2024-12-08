import React from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const QualificationExperiences = () => {
  AOS.init({
    delay: 500,
    duration: 1000,
    offset: 120,
    mirror: false,
    anchorPlacement: "top-bottom",
  })

  return (
    <div className="progress-journey   transition-all">

      <ul className="journey-description">
        <li data-aos="fade-right" className="mb-4">
          <h2 className="text-md">
            Colegio De Montalban
          </h2>
          <h5>Bachelor of Science in Information Technology</h5>
          <h6>| Rodriguez(Montalban) Rizal Philippines</h6>
          <span className="text-sm f-gray">| April 2020 - June 2024</span>
        </li>
   
        <li data-aos="fade-right" className="mb-4">
          <h2 className="text-lg">
          Nuestra Señora De Guia Academy of Marikina City <br/>
          </h2>
          <h6>| Marikina City Philippines</h6>
          <span className="text-xs f-gray">| July 2018 - March 2020</span>
        </li>

        <li data-aos="fade-right" className="mb-4">
          <h2 className="text-lg">
          Guinayang National High School <br/>
          </h2>
          <h6>| San Mateo Rizal Philippines</h6>
          <span className="text-xs f-gray">| July 2014 - March.2018</span>
        </li>

        <li data-aos="fade-right" className="mb-4">
          <h2 className="text-lg">
          Maly Elementary School <br/>
          </h2>
          <h6>| San Mateo Rizal Philippines</h6>
          <span className="text-xs f-gray">| July 2008 - March 2014</span>
        </li>
       
  
      </ul>
   
    </div>
   

  )
}

export default QualificationExperiences
