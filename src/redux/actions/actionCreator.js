import {http} from '@/common/http'
import url from '@/common/apiServer'
import * as types from '../actionTypes/'

function makeActionCreator(type, ...argNames) {
    return function (...args) {
        let action = {type}
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}
function makeAsyncActionCreator(params) {
    let {url,callback} = params
    return async dispatch => {
        try {
            let result = await http(url)
            callback()
        } catch (err) {
            console.log(err)
        }
    }
}
export {makeActionCreator,makeAsyncActionCreator}