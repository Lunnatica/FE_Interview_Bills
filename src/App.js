import React, { Component } from 'react';
import NavBar from "./components/NavBar"
import Tab from "./components/Tab"
import Footer from "./components/Footer"
import Loader from "./components/Loader"

const urlBills = "http://localhost:3002/bills/"
const urlCategories = "http://localhost:3002/categories/"


class App extends Component {
  constructor() {
    super()
    this.state = {
      bills: {},
      potentialBills: {},
      currentTab: "Bills",
      categories: {},
      isLoaded: false
    }
    this.chooseTab = this.chooseTab.bind(this)
  }
  
  chooseTab(tab) {
    this.setState({
      currentTab: tab
    })
  }

  getCurrentTabData() {
    if(this.state.currentTab === "Bills") return this.state.bills
    else return this.state.potentialBills
  }

  getDataFromAPI(url) {
    console.log("hola")
    return fetch(url)
          .then(res => res.json())   
  }

  async getBillsData() {
    const allBills = await this.getDataFromAPI(urlBills)
    const categories = await this.getDataFromAPI(urlCategories)
    const potentialBills = allBills.filter(item => item.isBill === false)
    const bills = allBills.filter(item => item.isBill === true)
    this.setState({
      potentialBills: potentialBills,
      bills: bills,
      isLoaded: true,
      categories: categories
    })   
  }

  
  componentDidMount() {
    this.getBillsData()
  }

  render() {
    return (
     <>
       <NavBar callback={this.chooseTab}/>
       {this.state.isLoaded ? 
          <Tab title={this.state.currentTab} data={this.getCurrentTabData()} categories={this.state.categories}/> 
          : <Loader/>
       }
       <Footer />
    </>
    );
  }
}

export default App;
