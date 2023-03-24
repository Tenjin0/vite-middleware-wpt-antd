import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import {
	emit, fastprinter, universalTerminal, msrreader,
	logs, configuration,
	cashkeeper, cashdrawer, balance, WPTController, linedisplay, system, wpsManager, printer, RWMEnum
} from "@wynd/redux-wps-middleware"

import store from "./store"

import App from "./App"

import "./styles/index.less";


export interface ISize {
	width: number
	height: number
}

export interface IOpenBrowserViewOpts extends ISize {

}
interface IMyWindow extends Window {
	store: typeof store;
	emit: typeof emit;
	Balance: WPTController
	Configuration: WPTController
	Fastprinter: WPTController
	UniversalTerminal: WPTController
	MsrReader: WPTController
	Cashkeeper: WPTController
	CashDrawer: WPTController
	LineDisplay: WPTController
	Logs: WPTController
	System: WPTController
	RfidUpos: WPTController
	Printer: WPTController
	send: Function
	electron: {
		getSize: () => Promise<ISize>
		openBrowserView: (url: string, opts: IOpenBrowserViewOpts) => Promise<void>
		closeBrowserView: () => Promise<void>
	}
}

declare var window: IMyWindow;

window.store = store
window.emit = emit

window.Balance = balance
window.Configuration = configuration
window.Fastprinter = fastprinter
window.UniversalTerminal = universalTerminal
window.MsrReader = msrreader
window.Cashkeeper = cashkeeper
window.CashDrawer = cashdrawer
window.LineDisplay = linedisplay
window.Logs = logs
window.System = system
window.RfidUpos = wpsManager.getController(RWMEnum.EPluginName.RFIDUPOS)
window.Printer = printer

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
)


setTimeout(async () => {
	wpsManager.log.info("test from app",["apple", "orange"])
	wpsManager.log.info("test from app 2")
	// const result = await window.electron.getSize()
	// console.log(result)
	// await window.electron.openBrowserView("https://www.google.com", { width: result.width /2, height: result.height / 2})
}, 1000)
