'use client'

import { useState, useEffect } from 'react'
import ctaData from '@data/json/ctaData.json'
import TextStream from './text-stream.tsx'
import FadeIntoText from './fade-into-text.tsx'
import AppTitle from '@components/common/app-title/app-title.tsx'
import CtaButton from '@components/common/call-to-action/call-to-action-btn.tsx'
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'
import { FetchRequest, HeroCtaArray, ServicePackage, UnknownResponse } from '@def/definitions.ts'

const SHOW_QUESTION_TIMER = 1000
const SHOW_ANSWER_TIMER = 2000
const CTA_CYCLE_TIMER = 1000
const SHOW_CTA_TIMER = 2000
const INTERVAL_TIMER = SHOW_QUESTION_TIMER + SHOW_ANSWER_TIMER + CTA_CYCLE_TIMER + SHOW_CTA_TIMER + 500




export default function CallToAction() {
	const [ ctaIndex, setCtaIndex ] = useState<number>(0)
	const [ ctaVisible, setCtaVisible ] = useState(true)
    	const [ questionVisible, setQuestionVisible ] = useState(false)
	const [ answerVisible, setAnswerVisible ] = useState(false)
	const [ introEffect, setIntroEffect ] = useState(false)
	const [ heroCta, setHeroCta ] = useState<HeroCtaArray>([])

	useEffect(()=> {
		( async () => {
			try {
				const payload : FetchRequest = {
					content: 'heroCta'
				}

				const response = await fetch('/api/fetch/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				})

				const data : UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error)
				}

				const ctaData : HeroCtaArray = data.data

				if (!ctaData) {
					throw new Error('Request successful yet no data was recieved.')
				} else {
					setHeroCta(ctaData)
				}
			} catch (error: unknown) {

			}
		})()
	},[])


	useEffect(() => {
		if (heroCta.length > 0) {
			const showCallToAction = () => {
				setCtaVisible(true)
        	    		setTimeout(showQuestion, SHOW_QUESTION_TIMER) // Short delay before showing next question
			}

        		const showQuestion = () => {
        			setQuestionVisible(true)
        	    		setTimeout(() => { setAnswerVisible(true) }, SHOW_ANSWER_TIMER) // Show answer 2 seconds after question
        		}

        		const cycleToNextCTA = () => {
				setCtaVisible(false)

				setTimeout(()=>{
		        	   	setQuestionVisible(false)
        		    		setAnswerVisible(false)
        	    			setCtaIndex((prevIndex) => (prevIndex + 1) % heroCta.length)
				}, CTA_CYCLE_TIMER)
        		}

        		showQuestion()

        		const cycleInterval = setInterval(() => {
        	    		cycleToNextCTA()
				setTimeout(showCallToAction, SHOW_CTA_TIMER)
        		}, INTERVAL_TIMER) // Cycle every 5 seconds

        		return () => clearInterval(cycleInterval)
		}
    	}, [ctaIndex, heroCta.length])



	useEffect(()=> { setTimeout( () => setIntroEffect(true), 1500 ) },[])

    	const currentCTA = heroCta[ctaIndex]

    	return (
		<div 
		 id="call-to-action" 
		 className={`
		 flex flex-col 
		 max-sm:space-y-[1rem] space-y-[2rem]
		`}>
			<div 
			 id="cta-action" 
			 className={`
			 flex items-center justify-center 
			 max-sm:flex-col
			 max-sm:space-x-0 space-x-[2rem]
			 max-sm:space-y-[1rem] space-y-0
			`}>
				<span 
				 id="app-title-container" 
				 className={`
				 trans-ease-lg ${introEffect ? "opacity-100" : "opacity-0"}
				`}>
					<AppTitle animated={true}/>
				</span>
				<span 
				 id="divider" 
				 className={`
				 max-sm:w-[15rem] w-[.25rem] 
				 max-sm:h-[.25rem] h-[4rem] 
				 bg-white bg-opacity-50 rounded-xl
				 trans-ease-all-md
				 ${ introEffect 
				 ? "max-sm:scale-x-100 scale-y-100" 
				 : "max-sm:scale-x-0 scale-y-0" }
				`}/>
				<CtaButton 
				 message={"Start Here!"}
				 modalId={SIGNATURE}
				 metadata={"cta" as ServicePackage}
				/>
			</div>

	        	<div 
			 id="cta-message" 
			 className={`
				 transform transition-all duration-1000 ease-in-out 
				 ${ ctaVisible ? "opacity-100" : "opacity-0 translate-y-[25%]" } 
				 flex flex-col items-center justify-center 
				 max-sm:space-x-0 space-x-5
			`}>
	            		<div 
				 id="question-handler" 
				 className={`
				 flex h-16 items-center justify-center
				 max-sm:w-[75%] w-full
				`}>
	                	{questionVisible && <FadeIntoText text={currentCTA?.question || ''} />}
	            		</div>
	
	
	           	 	<div id="answer-handler" className="flex h-16 items-center justify-center">
	           	     	{answerVisible && <TextStream text={currentCTA?.action || ''} />}
	           	 	</div>
	        	</div>

		</div>
	)
}


