"use client"
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import Styles from './Styles.module.scss'
import { navBarOption } from '@/data/navbar';
import Image from 'next/image';
import { Dropdown } from 'primereact/dropdown';
import { cities, start } from './data';

type Props = {}

const MainSection = ({ }: Props) => {

  const [selectedCity, setSelectedCity] = useState(null);

  const end = (
    <div className={Styles.navbar_container_div2}>

      <div className={Styles.nabbar_icon_container}>
        {
          navBarOption.map((item) => (
            <div key={item.tabName}>
              <item.icon />
            </div>
          ))
        }
      </div>

      <div className={`card ${Styles.navbar_container_div2_User}`}>
        <div>
          <Image
            src="/User2.jpeg"
            width={30}
            height={30}
            className={Styles.UserImage}
            alt="User_Image"
          />
        </div>
        {/* <span>Praveen Vasireddy</span> */}
        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" placeholder='Praveen Vasireddy'
          className={Styles.dropdown_size}
          tooltip="user Info"
        />
      </div>

    </div>
  );

  return (
    <div className={`card  ${Styles.navbar_container}`}>
      <Menubar start={start} end={end} className={`${Styles.navbar}`} />
    </div>
  )
}

export default MainSection