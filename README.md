# react-native-javascript-mobx-example
This is an essential example to build react-native app using Javascript and Mobx

Step to run
1. Checkou this respo
2. yarn install
3. react-native run-ios

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

if you see any issue, please do not hesitate to create an issue here or can contact me via email: cao.trung.thu@gmail.com or skype: diego.thu.cao

Give me A STAR if you see it is helpful for you.

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://mobx.js.org
4. https://www.tutorialspoint.com/es6

