import React, { useState } from "react"
import { Button, Form, Input } from "antd"
import { universalTerminal, UniversalTerminal } from "@wynd/redux-wps-middleware"
import { IUniversalTerminalContainerProps } from "../containers/universalterminal"
import { useSelector } from "react-redux"
import { IAppContainer } from "@wynd/redux-wps-middleware/dist/constants/enum_and_interface"
import { IRootState } from "../utils/interface"

export interface IUniversalTerminalState {
	amount: number
	showAsk: boolean
	display: string
}
const UniversalTerminaComponent: React.FunctionComponent<IUniversalTerminalContainerProps> = (
	props,
) => {

	const [utState, setUtState] = useState<IUniversalTerminalState>({
		amount: 100,
		display: "",
		showAsk: false
	})

	const container = useSelector<IRootState, IAppContainer | null>((state: IRootState) => state.wyndpostools.container)

	const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log(container)
		const choice = e.currentTarget.dataset && e.currentTarget.dataset.choice
		switch (choice) {
			case "confirm":
				props.keyboardConfirm(true)
				break
			case "abort":
				props.keyboardConfirm(false)
				break
			default:
				const total: UniversalTerminal.ITransaction = {
					amount: utState.amount,
					currency: 978,
					transactionid: "000000001",
					operatorid: "02",
				}
				universalTerminal.input(total)
				break
		}
	}

	const onFinish = (values: any) => {
		console.log("Success:", values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo)
	}

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Amount"
				name="ut_amount"
				rules={[{ required: true, message: "amount to debit" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Display"
				name="ut_display"
				rules={[{ required: true, message: "message from TPE" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				{!utState.showAsk && <Button onClick={onClickHandler}>Submit</Button>}
				{utState.showAsk && (
					<div>
						<Button
							color="success"
							data-choice="confirm"
							onClick={onClickHandler}
						>
							Confirm
						</Button>
						<Button
							color="danger"
							data-choice="abort"
							onClick={onClickHandler}
						>
							Abort
						</Button>
					</div>
				)}
			</Form.Item>
		</Form>
	)
}

export default UniversalTerminaComponent

// export class UniversalTerminaComponent2 extends React.Component<
// 	IUniversalTerminalContainerProps,
// 	IUniversalTerminalState
// > {
// 	constructor(props: any) {
// 		super(props)
// 		this.state = {
// 			amount: 100,
// 			showAsk: false,
// 			display: "",
// 		}
// 	}

// 	onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
// 		const choice = e.currentTarget.dataset && e.currentTarget.dataset.choice
// 		switch (choice) {
// 			case "confirm":
// 				this.props.keyboardConfirm(true)
// 				break
// 			case "abort":
// 				this.props.keyboardConfirm(false)
// 				break
// 			default:
// 				const total: UniversalTerminal.ITransaction = {
// 					amount: this.state.amount,
// 					currency: 978,
// 					transactionid: "000000001",
// 					operatorid: "02",
// 				}
// 				universalTerminal.input(total)
// 				break
// 		}
// 	}

// 	onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const amount = parseFloat(e.target.value)
// 		this.setState({
// 			...this.state,
// 			amount: amount,
// 		})
// 	}

// 	componentWillReceiveProps(nextProps: IUniversalTerminalContainerProps) {
// 		const newState: IUniversalTerminalState = {
// 			...this.state,
// 		}

// 		if (
// 			nextProps.universalTerminalRequest &&
// 			nextProps.universalTerminalRequest.status === RWMEnum.ERequestStatus.ERROR
// 		) {
// 			newState.display = nextProps.universalTerminalRequest.error.message
// 		} else if (
// 			nextProps.universalTerminalAsk &&
// 			nextProps.universalTerminalAsk.currentEventAction
// 		) {
// 			newState.display = nextProps.universalTerminalAsk.parameters.data
// 		} else if (nextProps.universalTerminalPush && nextProps.universalTerminalPush.display) {
// 			newState.display = nextProps.universalTerminalPush.display
// 		} else {
// 			newState.display = ""
// 		}
// 		newState.showAsk =
// 			nextProps.universalTerminalAsk && nextProps.universalTerminalAsk.currentEventAction
// 				? true
// 				: false

// 		this.setState(newState)

// 		if (
// 			nextProps.universalTerminalAsk &&
// 			(nextProps.universalTerminalAsk.status === RWMEnum.EAskSTatus.CONFIRMED ||
// 				nextProps.universalTerminalAsk.status === RWMEnum.EAskSTatus.ABORTED)
// 		) {
// 			this.props.clearPluginAskState()
// 		}
// 	}



			// <AppFieldSet name={this.props.name} started={this.props.started} status={this.props.universalTerminalRequest ? this.props.universalTerminalRequest.status : RWMEnum.ERequestStatus.NONE}>
			//     <Form>
			//         <FormGroup>
			//             <Label for="utAmount">Amount</Label>
			//             <Input onChange={this.onChangeAmount} type="number" name="ut_amount" id="utAmount" placeholder="amount to debit" value={this.state.amount} />
			//         </FormGroup>
			//         <FormGroup>
			//             <Label for="utDisplay">Display</Label>
			//             <Input type="text" disabled={true} name="ut_display" id="utDisplay" placeholder="message from TPE" value={this.state.display} />
			//         </FormGroup>
			//         <div>

			//             {!this.state.showAsk && <Button onClick={this.onClickHandler}>Submit</Button> }
			//             {this.state.showAsk && <div>
			//                 <Button color="success" data-choice="confirm" onClick={this.onClickHandler}>Confirm</Button>
			//                 <Button color="danger" data-choice="abort" onClick={this.onClickHandler}>Abort</Button>
			//             </div>}

			//         </div>

			// </Form>
			// </AppFieldSet>
// 		)
// 	}
// }
