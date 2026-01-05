import Link from 'next/link'
import React from 'react'

function CarrerBg() {
  return (
    <div>
      <section>
        <section style={{
          backgroundImage: `url("/images/Newimage/career-1.webp")`,
          backgroundColor: "rgb(255, 255, 255)",
          height: "200px"
        }}
          className="sub-header position-relative">
          <div className="container">
            <div className="page-info ">
              <h2 className="heading-2" style={{ color: "Black", textAlign: "center" }}>Careers</h2>
              <h6 className="heading-6">
                <Link href="/" style={{ color: "Black" }}>Home / </Link><a href="#" style={{ color: "Black" }}>Careers</a>
              </h6>
            </div>
          </div>
        </section>
        {/* 
        <div className="fluid-container " style={{ marginTop: "5px" }}>
          <article className="expertise-banner-content">
            <h2 style={{fontSize:"40px"}}>Careers</h2>
            <p style={{fontSize:"20px"}}>Join Excerpt Technologies and embark on a journey of growth and excellence. As a leading technology company, we are always on the lookout for passionate and talented individuals. Sharing our vision through creativity. </p>
            <div className="button-container">
              <a href="" rel="">Get a Quote</a>
              {/* <a href="">Apply Now</a> */}
        {/* </div>
          </article>
        </div>  */}
      </section>
    </div>
  )
}

export default CarrerBg
