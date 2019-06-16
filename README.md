# React Native, Javascript and Mobx
This is an essential example to build React-native app using Javascript and Mobx

1. Clone the [repo](https://github.com/diegothucao/react-native-javascript-mobx-template)
2. `yarn install` OR `npm install`
3. `react-native eject`
4. `react-native run-ios` OR `react-native run-android`

Define store:
```javascript
import { observable, action, runInAction, computed, autorun } from 'mobx';
import ajax from '../util/ajax'

export default class AppStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable searchTerm = observable.box("")
    @observable deals = []
    @observable currentDealId = null

    constructor() {
        this.searchTerm.observe( (value) => {
            this.fetchDeals(value.newValue)
        }, true)
    }

    async fetchDeals() {
        ajax.fetchDealSearchResults(this.searchTerm).then(data => {
            runInAction(() => {
                this.isLoading = false
                this.deals = data
            })
        })
    }

    @action setSearchTerm(searchStr) {
        this.searchTerm.set(searchStr)
    }

    @action
    setCurrentDeal(dealId) {
        this.currentDealId = dealId
    }

    @action
    unsetCurrentDeal() {
        this.currentDealId = null
    }

    @computed get currentDeal() {
        return this.deals.find((deal) => deal.key === this.currentDealId)
    }
}
```

Call in components:

```javascript 
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
}
}
```
If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://mobx.js.org
4. https://www.tutorialspoint.com/es6

