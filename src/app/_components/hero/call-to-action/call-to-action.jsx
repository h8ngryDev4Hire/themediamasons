'use client';
import { useState, useEffect } from 'react';
import ctaData from '@data/json/ctaData.json';
import TextStream from './text-stream.tsx';
import FadeIntoText from './fade-into-text.tsx';
import AppTitle from '@components/common/app-title/app-title.tsx';
import CtaButton from '@components/common/call-to-action/call-to-action-btn.tsx';
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx';
var SHOW_QUESTION_TIMER = 1000;
var SHOW_ANSWER_TIMER = 2000;
var CTA_CYCLE_TIMER = 1000;
var SHOW_CTA_TIMER = 2000;
var INTERVAL_TIMER = SHOW_QUESTION_TIMER + SHOW_ANSWER_TIMER + CTA_CYCLE_TIMER + SHOW_CTA_TIMER + 500;
export default function CallToAction() {
    var _a = useState(0), ctaIndex = _a[0], setCtaIndex = _a[1];
    var _b = useState(true), ctaVisible = _b[0], setCtaVisible = _b[1];
    var _c = useState(false), questionVisible = _c[0], setQuestionVisible = _c[1];
    var _d = useState(false), answerVisible = _d[0], setAnswerVisible = _d[1];
    var _e = useState(false), introEffect = _e[0], setIntroEffect = _e[1];
    var callToActions = ctaData.callToActions;
    useEffect(function () {
        var showCallToAction = function () {
            setCtaVisible(true);
            setTimeout(showQuestion, SHOW_QUESTION_TIMER); // Short delay before showing next question
        };
        var showQuestion = function () {
            setQuestionVisible(true);
            setTimeout(function () { setAnswerVisible(true); }, SHOW_ANSWER_TIMER); // Show answer 2 seconds after question
        };
        var cycleToNextCTA = function () {
            setCtaVisible(false);
            setTimeout(function () {
                setQuestionVisible(false);
                setAnswerVisible(false);
                setCtaIndex(function (prevIndex) { return (prevIndex + 1) % callToActions.length; });
            }, CTA_CYCLE_TIMER);
        };
        showQuestion();
        var cycleInterval = setInterval(function () {
            cycleToNextCTA();
            setTimeout(showCallToAction, SHOW_CTA_TIMER);
        }, INTERVAL_TIMER); // Cycle every 5 seconds
        return function () { return clearInterval(cycleInterval); };
    }, [ctaIndex]);
    useEffect(function () { setTimeout(function () { return setIntroEffect(true); }, 1500); }, []);
    var currentCTA = callToActions[ctaIndex];
    return (<div id="call-to-action" className={"flex flex-col space-y-[2rem]"}>
			<div id="cta-action" className={"flex items-center justify-center space-x-[2rem]"}>
				<span id="app-title-container" className={"trans-ease-lg ".concat(introEffect ? "opacity-100" : "opacity-0", "\n\t\t\t\t")}>
					<AppTitle animated={true}/>
				</span>
				<span id="divider" className="w-[.25rem] h-[4rem] bg-white bg-opacity-50 rounded-xl"/>
				<CtaButton message={"Start Here!"} modalId={SIGNATURE} metadata={"cta"}/>
			</div>

	        	<div id="cta-message" className={"\n\t\t\t\t transform transition-all duration-1000 ease-in-out \n\t\t\t\t ".concat(ctaVisible ? "opacity-100" : "opacity-0 translate-y-[25%]", " \n\t\t\t\t flex flex-col items-center justify-center space-x-5\n\t\t\t")}>
	            		<div id="question-handler" className="flex h-16 items-center justify-center">
	                	{questionVisible && <FadeIntoText text={currentCTA.question}/>}
	            		</div>
	
	
	           	 	<div id="answer-handler" className="flex h-16 items-center justify-center">
	           	     	{answerVisible && <TextStream text={currentCTA.action}/>}
	           	 	</div>
	        	</div>

		</div>);
}
