import { createRoot } from 'react-dom/client'

const INITIALIZATION = Symbol('phase.initialization');
const UPDATE = Symbol('phase.update')
type Phase = typeof INITIALIZATION | typeof UPDATE
let phase: Phase
let state: any, setState: any

function useState<State>(initialState: State) {
	// 🐨 change this to check whether the phase is INITIALIZATION
	if (state === INITIALIZATION) {
		state = initialState
		setState = (newState: State) => {
			state = newState
			// 🐨 pass the UPDATE phase to render here
			render(UPDATE)
		}
	}
	return [state, setState] as [State, (newState: State) => void]
}

function Counter() {
	const [count, setCount] = useState(0)
	const increment = () => setCount(count + 1)

	const [enabled, setEnabled] = useState(true)
	const toggle = () => setEnabled(!enabled)

	return (
		<div className="counter">
			<button onClick={toggle}>{enabled ? 'Disable' : 'Enable'}</button>
			<button disabled={!enabled} onClick={increment}>
				{count}
			</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const appRoot = createRoot(rootEl)

// 🐨 accept a newPhase argument
function render(newPhase: Phase) {
	phase = newPhase;
	appRoot.render(<Counter />)
}

// 🐨 call this with the INITIALIZATION phase
render(INITIALIZATION)
