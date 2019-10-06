import {createStore, combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';
import { Promo } from './promotions';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes : Dishes,
            comments : Comments,
            leaders : Leaders,
            promotions : Promo
        })
    );

    return store
}  