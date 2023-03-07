import React from "react"

import { Tabs } from "antd"
import { getInitialState, RWMEnum } from "@wynd/redux-wps-middleware"

import UniversalTerminalContainer from "./containers/universalterminal"

function callback(key: any) {
	console.log(key)
}

export interface IAppComponentProps { }

const AppComponent: React.FC<IAppComponentProps> = (props) => {
	const { plugins } = getInitialState()

	const items = [
		{ label: 'UniversalTerminal', key: 'item-1', children: (
			<UniversalTerminalContainer/>
		  ) }, // remember to pass the key prop
		{ label: 'Tab 2', key: 'item-2', children: 'Content 2 titi' },
	];
	return (
		<Tabs defaultActiveKey="universalterminal" items={items} onChange={callback} />
	)
}

export default AppComponent
