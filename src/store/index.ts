import { applyMiddleware, compose, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createWpsMiddleware } from "@wynd/redux-wps-middleware"

import reducer from "./reducers"

const ip = 'http://localhost:9963'

const wpsMiddleware = createWpsMiddleware(ip, {rejectUnauthorized: false,
	reconnection: true,
	transports: ["websocket"]});

const middlewares: any[] = [wpsMiddleware]

const enhancers: any[] = []

const composedEnhancers = compose(
	composeWithDevTools(applyMiddleware(...middlewares)),
	...enhancers
)

const store: Store = createStore(
	reducer,
	composedEnhancers
)
export default store
