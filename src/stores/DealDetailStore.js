import { observable, action } from 'mobx';
import ajax from '../util/ajax'

export default class DealDetailStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable deal = undefined

    @action setInitialDeal(data) {
        this.deal = data
        this.isLoading = false
    }

    @action async fetchDetail(dealId) {
        try {
            const data = await ajax.fetchDealDetail(dealId)     
                this.isLoading = false
                this.deal = data
        } catch (e) {
                this.isLoading = false
                this.isFailure = true
        }
    }
}