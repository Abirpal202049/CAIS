import MainSection from '@/components/common/Navbar/MainSection'
import React from 'react'
import Styles from './Styles.module.scss'

const Page = () => {
  return (
    <div className={Styles.alert_main_section}>
      {/*  Top Navbar */}
      <MainSection/>
      
    </div>
  )
}

export default Page