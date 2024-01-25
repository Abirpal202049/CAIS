import MainSection from '@/components/common/Navbar/MainSection'
import React from 'react'
import Styles from './Styles.module.scss'
import Custom_Tab from '@/components/common/Custom_Tab'
import Custom_Table from '@/components/common/Custom_Table'

const Page = () => {
  return (
    <div className={Styles.alert_main_section}>
      {/*  Top Navbar */}
      <MainSection/>
      
      {/*  Custom Tab */}
      <Custom_Tab/>

      {/*  Custom Table */}
      <Custom_Table  tableType="alerts" select={true} columnFilter={true}/>

    </div>
  )
}

export default Page