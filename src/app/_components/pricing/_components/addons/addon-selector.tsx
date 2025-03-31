import { useContext, ChangeEvent, useEffect } from 'react'
import { AddonsContext, AddonsMasterContext } from './addons'
import { gudeaBold } from '@ui/fonts'

const TIMER = 5000

export default function AddonSelector() {
	const { 
		categoriesContext, 
		selectedCategoryContext, 
		transitionContext
	} : AddonsMasterContext = useContext(AddonsContext)
	const [ categories ] = categoriesContext
	const [ selectedCategory, setSelectedCategory ] = selectedCategoryContext
	const { startTransition } = transitionContext


	const handleCategoryChange = (direction: 'next' | 'prev') => {
		startTransition()
    		const currentIndex = categories.indexOf(selectedCategory)

    		if (direction === 'next') {
      			const nextIndex = (currentIndex + 1) % categories.length
      			setSelectedCategory(categories[nextIndex])
    		} else {
      			const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1
      			setSelectedCategory(categories[prevIndex])
    		}
  	}


	useEffect(()=>{
		const timer = setTimeout(()=> handleCategoryChange('next'), TIMER)

		return () => clearTimeout(timer)
	},[selectedCategory])

	return (
 		<div 
		 className={`
		 w-full
		 max-sm:flex-col sm:flex-row
		 flex items-center
		 max-sm:space-y-2 sm:justify-between
		 overflow-hidden
		`}>
 	 		<h1 
			 className={`
			 ${gudeaBold.className} 
			 text-white 
			 text-xl sm:text-2xl lg:text-3xl
			 max-sm:text-center
			 truncate
			`}>
 	 	      	Enhance Your Package
 	 	    	</h1>
 	 	    	<div 
			 className={`
			 flex 
			 items-center justify-center space-x-2 sm:space-x-3 md:space-x-4
			 flex-shrink-0
			`}>
 	 	      		<button
 	 	        	 onClick={() => handleCategoryChange('prev')}
				 className={`
				 text-white hover:text-orange-400
				 text-xl sm:text-2xl rounded-full
				 trans-ease-all
				 bg-white bg-opacity-10
				 w-8 h-8 sm:w-10 sm:h-10
				 flex items-center justify-center
				 hover:scale-90
				`}>
 	 	        	←
 	 	      		</button>
 	 	      
 	 	      		<span className={`
 	 	      		  w-[10rem] sm:w-[12rem] md:w-[14rem] h-8 sm:h-10 
 	 	      		  bg-white bg-opacity-10 
 	 	      		  rounded-full
 	 	      		  flex items-center justify-center
 	 	      		  text-white text-sm sm:text-base
 	 	      		  px-2 truncate
 	 	      		  ${gudeaBold.className}
 	 	      		`}>
 	 			{selectedCategory}
 	 	      		</span>

 	 	      		<button
 	 	        	 onClick={() => handleCategoryChange('next')}
				 className={`
				 text-white hover:text-orange-400
				 text-xl sm:text-2xl rounded-full
				 trans-ease-all
				 bg-white bg-opacity-10
				 w-8 h-8 sm:w-10 sm:h-10
				 flex items-center justify-center
				 hover:scale-90
				`}>
 	 	        	→
 	 	      		</button>
 	 	    	</div>
 		</div>
	)
}
