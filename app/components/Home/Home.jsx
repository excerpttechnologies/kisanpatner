'use client';

import React from 'react'
import HomeCard from '../HomeCard'
import Homeabout from '../Homeabout'
import Homevideo from '../Homevideo'
import HomeProject from '../HomeProject'
import Slider from '../Slider'
import HomeArticle from '../HomeArticle'
// import Dashboard from './Dashboard'
import Popupform from '../PopupScroll/Popupform'
// NEXTJS: Removed react-helmet - use Next.js metadata API in layout/page instead
const Home = () => {
    return (
        <div style={{overflow:"hidden"}}>
            {/* NEXTJS: Metadata handled in app/page.tsx or layout.tsx */}

            <Slider />
            <br />
            <Popupform />
            <HomeCard />
            <Homeabout />
            <HomeProject />
            <Homevideo />
            <HomeArticle />
            {/*

             */}

            {/* <ResumeComponent/> */}
        </div>
    )
}

export default Home

