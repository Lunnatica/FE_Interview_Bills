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

  removeBill(id) {
    // remove bill from bills list and adding it to potential bills
    const billToRemove = this.state.filter(item => item.id === id)
    const newBillsList = this.state.filter(item => item.id !== id)
    fetch("http://localhost:3000/bills/:" + id,
        {
        method: "PATCH",
        body: JSON.stringify(billToRemove),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
        }
      ).then(response => response.json())
       .then(json => console.log(json))
}

addAsBill(id) {
    alert(id)
}

  
  componentDidMount() {
    this.getBillsData()
  }

  render() {
    return (
     <>
       {this.state.isLoaded ? 
          <>
            <NavBar className="navBar" callback={this.chooseTab}/>
            <Tab 
                title={this.state.currentTab} 
                data={this.getCurrentTabData()} 
                categories={this.state.categories}
                removeBillCallback={this.removeBill}
                addAsBillCallback={this.addAsBill}
            /> 
          </>
          : <Loader/>
       }
       <Footer />
    </>
    );
  }
}

export default App;
