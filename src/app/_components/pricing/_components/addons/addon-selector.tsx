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
 		<>
 	 		<h1 
			 className={`
			 ${gudeaBold.className} 
			 text-white 
			 text-2xl lg:text-3xl xl:text-3xl
			`}>
 	 	      	Enhance Your Package 🚀
 	 	    	</h1>
 	 	    	<div className="flex items-center justify-center space-x-4">
 	 	      		<button
 	 	        	 onClick={() => handleCategoryChange('prev')}
				 className={`
				 text-white hover:text-orange-400
				 text-2xl rounded-full
				 trans-ease-all
				 bg-white bg-opacity-10
				 size-[2.5rem]
				 hover:scale-75
				`}>
 	 	        	←
 	 	      		</button>
 	 	      
 	 	      		<span className={`
 	 	      		  w-[14rem] h-[2.5rem] 
 	 	      		  bg-white bg-opacity-10 
 	 	      		  rounded-full
 	 	      		  flex items-center justify-center
 	 	      		  text-white
 	 	      		  ${gudeaBold.className}
 	 	      		`}>
 	 			{selectedCategory}
 	 	      		</span>

 	 	      		<button
 	 	        	 onClick={() => handleCategoryChange('next')}
				 className={`
				 text-white hover:text-orange-400
				 text-2xl rounded-full
				 trans-ease-all
				 bg-white bg-opacity-10
				 size-[2.5rem]
				 hover:scale-75
				`}>
 	 	        	→
 	 	      		</button>
 	 	    	</div>
 		</>
	)
}
