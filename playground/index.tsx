// import { useState } from 'react'

import { createRoot } from 'react-dom/client';


let state: any, setState: any;

function useState<State>(initialState: State) {
	if (state === undefined) {
		state = initialState;
		setState = (newState: State) => {
			state = newState;
			appRoot.render(<Counter />)
		}
	}

	return [state, setState] as [State, (newState: State) => void]
}
// an array of the state and a no-op function: () => {}
// 🦺 note you may need to ignore some typescript errors here. We'll fix them later.
// Feel free to make the `useState` a generic though!

function Counter() {

	const [count, setCount] = useState(0);
	console.log(count, 'inside counter');
	// 🦺 you'll get an error for this we'll fix that next
	const increment = () => setCount(count + 1)

	return (
		<div className="counter">
			<h1>Playground</h1>
			<button onClick={increment}>{count}</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const appRoot = createRoot(rootEl)
appRoot.render(<Counter />)
