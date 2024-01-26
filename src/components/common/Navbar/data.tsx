import Styles from './Styles.module.scss'
import { InputText } from 'primereact/inputtext';
import { Search } from '@/data/svgr/navbar'

export const start = (
    <div className={Styles.navbar_container_div}>

      <span className={`p-input-icon-left ${Styles.navbar_search_container}`}>
        <Search className={Styles.search_icon} />
        <InputText type="text" placeholder="Search in “Alerts”" className={Styles.input_Filed}
        />
      </span>

    </div>
  );

export const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];