import React, { useReducer, useEffect, useRef } from 'react';

const initialState = { time: 0, isRunning: false };

const StopWatch = () => {
	const idRef = useRef(0);
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		if (!state.isRunning) {
			return;
		}
		idRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000);
		return () => {
			clearInterval(idRef.current);
			idRef.current = 0;
		};
	}, [state.isRunning]);

	return (
		<React.Fragment className="">
			{state.time} seconds
			<div>
				<button onClick={() => dispatch({ type: 'start' })}> Start </button>
				<button onClick={() => dispatch({ type: 'stop' })}> Stop </button>
				<button onClick={() => dispatch({ type: 'reset' })}> Reset </button>
			</div>
		</React.Fragment>
	);
};
export default StopWatch;
const reducer = (state, action) => {
	switch (action.type) {
		case 'start':
			return { ...state, isRunning: true };
		case 'stop':
			return { ...state, isRunning: false };
		case 'reset':
			return { time: 0, isRunning: false };
		case 'tick':
			return { ...state, time: state.time + 1 };
		default:
			throw new Error();
	}
};
