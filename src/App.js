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


  patchData(id, isBill) {
    return fetch("http://localhost:3002/bills/" + id,
          {
          method: "PATCH",
          body: JSON.stringify({ isBill }),
          headers: {'Content-type': 'application/json; charset=UTF-8'}
          }
        )
  }

  moveElement(id, isBill, arrayFrom,arrayTo) {
    // find element to move
    let element = arrayFrom.find(item => item.id === id)
    element.isBill = isBill
  
    // move element to new array
    let updatedArrayTo = [...arrayTo]
    updatedArrayTo.push(element)
  
    // filter out element from old array
    const updateArrayFrom = arrayFrom.filter(item => item.id !== id)
    return {
      updatedArrayTo,
      updateArrayFrom
    }
  }

  removeBill(id) {
    // remove bill from bills list and adding it to potential bills
    this.patchData(id,false).then(response => {
        const updatedLists = this.moveElement(id, false, this.state.bills, this.state.potentialBills)
        this.setState({
          bills:  updatedLists.updateArrayFrom,
          potentialBills: updatedLists.updatedArrayTo
        })
      }   
      ).catch(response => alert(response,"There was an error with your request - please try again")) // possibly show a warning component in the page instead
       
  }

addAsBill(id) {
  // remove bill from bills list and adding it to potential bills
  this.patchData(id,true).then(response => {
      const updatedLists = this.moveElement(id, true, this.state.potentialBills, this.state.bills)

      this.setState({
        bills: updatedLists.updatedArrayTo,
        potentialBills: updatedLists.updateArrayFrom
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
            <NavBar callback={this.chooseTab} currentTab={this.state.currentTab}/>
            <Tab 
                title={this.state.currentTab} 
                data={this.getCurrentTabData()} 
                categories={this.state.categories}
                removeBillCallback={this.removeBill}
                addAsBillCallback={this.addAsBill}
            /> 
            <Footer />
          </>
          : <Loader/>
       }
    </>
    );
  }
}

export default App;
