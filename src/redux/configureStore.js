import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';
import { Promo } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes : Dishes,
            comments : Comments,
            leaders : Leaders,
            promotions : Promo,
            ...createForms({
                feedback : InitialFeedback 
            })
        }),
        applyMiddleware(thunk,logger)
    );

    return store
}  