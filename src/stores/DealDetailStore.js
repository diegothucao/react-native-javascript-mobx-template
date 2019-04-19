import { observable, action } from 'mobx';
import ajax from '../util/ajax'

export default class DealDetailStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable deal = undefined

    @action async fetchDetail(data) {
        this.deal = data
        try {
            const result = await ajax.fetchDealDetail(data.key)     
                this.deal = result
        } catch (e) {
                this.isLoading = false
                this.isFailure = true
        }
    }
}