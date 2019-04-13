import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import DealList from './DealList'
import DealDetail from './DealDetail'
import SearchBar from './SearchBar'
import { observer, inject } from "mobx-react"

@inject("appStore") @observer
class App extends React.Component {

  searchDeals = (searchTerm) => {
    this.props.appStore.setSearchTerm(searchTerm)
  }

  setCurrentDeal = (dealId) => {
    this.props.appStore.setCurrentDeal(dealId)
  }

  unsetCurrentDeal = () => {
    this.props.appStore.unsetCurrentDeal()
  }

  render() {
    const appStore = this.props.appStore
    if (appStore.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={appStore.currentDeal}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      )
    }
    const dealsToDisplay =
      appStore.deals.length > 0
        ? appStore.deals
        : []
    return (
      <View style={styles.main}>
        <SearchBar searchDeals={this.searchDeals} searchTerm={appStore.searchTerm.get()}/>
        <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
})

export default App
