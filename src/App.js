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
    this.removeBill = this.removeBill.bind(this)
    this.addAsBill = this.addAsBill.bind(this)
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
    fetch("http://localhost:3002/bills/" + id,
        {
        method: "PATCH",
        body: JSON.stringify({isBill:false}),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
        }
      ).then(response => {
        // update bills and potential bills lists
        let billToRemove = this.state.bills.find(item => item.id === id)
        billToRemove.isBill = false

        // update potentialBills list by adding the removed bill
        let newPotentialBillsList = [...this.state.potentialBills]
        newPotentialBillsList.push(billToRemove)

        // update billsLists by filtering out the removed bill 
        const newBillsList = this.state.bills.filter(item => item.id !== id)
        
        this.setState({
          bills: newBillsList,
          potentialBills: newPotentialBillsList
        })
      }   
      ).catch(response => alert(response,"There was an error with your request - please try again")) // possibly show a warning component in the page instead
       
}

addAsBill(id) {
  // remove bill from bills list and adding it to potential bills
  fetch("http://localhost:3002/bills/" + id,
      {
      method: "PATCH",
      body: JSON.stringify({isBill:true}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
      }
    ).then(response => {
      // update bills and potential bills lists
      let billToRemove = this.state.potentialBills.find(item => item.id === id)
      billToRemove.isBill = true

      // update potentialBills list by adding the removed bill
      let newBillsList = [...this.state.bills]
      newBillsList.push(billToRemove)

      // update billsLists by filtering out the removed bill 
      const newPotentialBillsList = this.state.potentialBills.filter(item => item.id !== id)
      
      this.setState({
        bills: newBillsList,
        potentialBills: newPotentialBillsList
      })
    }   
    ).catch(response => alert(response,"There was an error with your request - please try again")) // possibly show a warning component in the page instead
     
}

  
  componentDidMount() {
    this.getBillsData()
  }

  render() {
    return (
     <>
       {this.state.isLoaded ? 
          <>
            <NavBar className="navBar" callback={this.chooseTab} currentTab={this.state.currentTab}/>
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
