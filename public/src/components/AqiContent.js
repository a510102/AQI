import React from 'react';
import FocusCity from './FocusCity';
import './AqiContent.css'

const AqiContent = ({onChangeFocusSite, filterCity, County, datas})=>{
  return (
    <div>
      <div className="aqi-content-title flex">
        <h2>{ County }</h2>
        <p>{ filterCity.PublishTime } 更新</p>
      </div>
      <div className="aqi-content-main flex">
        <FocusCity  filterCity= {filterCity} />
        <div className='aqi-content-list'>
          { 
            datas.map((data, i)=>{
              let color = '';
              let AQI = data.AQI;
              if(AQI >= 0 && AQI <= 50){
                color = 'bg-ligth-green';
              } if (AQI >= 51 && AQI <= 100 ){
                color = 'bg-light-yellow';
              } if(AQI >= 101 && AQI <= 150){
                color = 'bg-light-orange';
              } if(AQI >= 151 && AQI <= 200){
                color = 'bg-light-red';
              } if(AQI >= 201 && AQI <= 300){
                color = 'bg-light-purple';
              } if(AQI >=300 && AQI <=400){
                color = 'bg-dangerous';
              }

              return (
                <div 
                  className="aqi-box bg-white"
                  key={i}
                  >
                    <p onClick={ onChangeFocusSite } >
                      { data.SiteName }
                    </p>
                    <p className={color}>{ data.AQI }</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AqiContent;