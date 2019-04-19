import { observable, action, runInAction, computed } from 'mobx'
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