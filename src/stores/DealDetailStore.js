import { observable, action } from 'mobx';
import ajax from '../util/ajax'

export default class DealDetailStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable deal = undefined

    @action async fetchDetail(data) {
        this.deal = data
        try {
            const data = await ajax.fetchDealDetail(data.key)     
                this.deal = data
        } catch (e) {
                this.isLoading = false
                this.isFailure = true
        }
    }
}