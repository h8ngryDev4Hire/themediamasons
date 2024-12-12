import { GenericCallback } from "@def/definitions"
import { useState } from "react"

type TransitionSpeed = 'trans-ease' | 'trans-ease-md' | 'trans-ease-lg'

enum Speed {
	fast = 300, 
	normal = 1000,
	slow = 2000
}

interface Options {
	speed? : TransitionSpeed
	callback? : GenericCallback
}


export interface UseTransition {
	transitionState: boolean
	startTransition: () => void
}


export default function useTransition(
	options : Options = {}
) : UseTransition {
	const { 
		speed = 'trans-ease',
		callback = undefined
	} = options

	// transitionState will be utilized by components to
	// track when a transition has started and ended to 
	// properly conduct component state transitions
	const [ transitionState, setTransitionState ] = useState(false)

	const startTimer = (speed : Speed) => {
		setTransitionState(true)
		const timer = setTimeout( () => {
			setTransitionState(false)
			typeof callback === 'function' && callback()	
		}, speed)

		return () => clearTimeout(timer)
	}

	const startTransition = () => {
		switch (speed) {
			case 'trans-ease': {
				startTimer(Speed.fast)
				break;
			}

			case 'trans-ease-md': {
				startTimer(Speed.normal)
				break;
			}

			case 'trans-ease-lg' : {
				startTimer(Speed.slow)
				break;
			}
		}
	}

	return { transitionState, startTransition }
}
