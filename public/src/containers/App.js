import React, { Component } from 'react';
import Searchbox from '../components/Searchbox/Searchbox';
import AqiContent from '../components/AqiContent';
import './App.css'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas:[],
      CountyList: [],
      focusSite:'',
      County:'',
    };
  }
  componentDidMount(){
    const url = 'https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json';
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(datas=> {
        this.setState({datas});
        let countys = datas.map(data=> data.County);
        const singleCounty = countys.filter((element, index, arr) => {
          return arr.indexOf(element) === index;
        })
        this.setState({CountyList: singleCounty});
        let County = datas[0].County;
        this.setState({County});
        let focusSite = datas[0].SiteName;
        this.setState({focusSite});
      })
      .catch(error => console.log(error))
      
  }

  onchangeCountyAqi = (e) => {   //select事件
    let County = e.target.value;
    if(County !== '請選擇地區'){
      this.setState({ County }); 
      //找出選取的城市第一個地區 然後選取為關注地區
      let firstdata = this.state.datas.find(data=> data.County === County );
      this.setState({focusSite: firstdata.SiteName});
    }
  } 

  onChangeFocusSite = (e)=>{   //click事件
    let focusSite = e.target.textContent;
    if(focusSite){
      this.setState({focusSite});
    }
  }

  render() {
    const {datas, County, focusSite, CountyList} = this.state;  

    const filterdatas = datas.filter(data => data.County === County);//篩選相同城市的資料
    const filterCity = datas.filter(data => data.SiteName === focusSite); //選取點選的地區資料 
    return filterdatas.length === 0 || filterCity.length === 0 ?
      <h1>Loading</h1> :
      (
        <div className='wrap'>
          <Searchbox 
            CountyList={CountyList}
            onchangeCountyAqi={this.onchangeCountyAqi} 
          />
          <AqiContent 
            County={County} 
            datas={filterdatas} 
            filterCity={filterCity[0]}
            onChangeFocusSite = {this.onChangeFocusSite}
            />
        </div>
      )
  }  
}

export default App ;
