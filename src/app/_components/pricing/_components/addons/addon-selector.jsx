import { useContext, useEffect } from 'react';
import { AddonsContext } from './addons';
import { gudeaBold } from '@ui/fonts';
var TIMER = 5000;
export default function AddonSelector() {
    var _a = useContext(AddonsContext), categoriesContext = _a.categoriesContext, selectedCategoryContext = _a.selectedCategoryContext, transitionContext = _a.transitionContext;
    var categories = categoriesContext[0];
    var selectedCategory = selectedCategoryContext[0], setSelectedCategory = selectedCategoryContext[1];
    var startTransition = transitionContext.startTransition;
    var handleCategoryChange = function (direction) {
        startTransition();
        var currentIndex = categories.indexOf(selectedCategory);
        if (direction === 'next') {
            var nextIndex = (currentIndex + 1) % categories.length;
            setSelectedCategory(categories[nextIndex]);
        }
        else {
            var prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
            setSelectedCategory(categories[prevIndex]);
        }
    };
    useEffect(function () {
        var timer = setTimeout(function () { return handleCategoryChange('next'); }, TIMER);
        return function () { return clearTimeout(timer); };
    }, [selectedCategory]);
    return (<>
 	 		<h1 className={"".concat(gudeaBold.className, " text-white text-3xl")}>
 	 	      	Enhance Your Package 🚀
 	 	    	</h1>
 	 	    	<div className="flex items-center justify-center space-x-4">
 	 	      		<button onClick={function () { return handleCategoryChange('prev'); }} className={"\n\t\t\t\t text-white hover:text-orange-400\n\t\t\t\t text-2xl rounded-full\n\t\t\t\t trans-ease-all\n\t\t\t\t bg-white bg-opacity-10\n\t\t\t\t size-[2.5rem]\n\t\t\t\t hover:scale-75\n\t\t\t\t"}>
 	 	        	←
 	 	      		</button>
 	 	      
 	 	      		<span className={"\n \t \t      \t\t  w-[14rem] h-[2.5rem] \n \t \t      \t\t  bg-white bg-opacity-10 \n \t \t      \t\t  rounded-full\n \t \t      \t\t  flex items-center justify-center\n \t \t      \t\t  text-white\n \t \t      \t\t  ".concat(gudeaBold.className, "\n \t \t      \t\t")}>
 	 			{selectedCategory}
 	 	      		</span>

 	 	      		<button onClick={function () { return handleCategoryChange('next'); }} className={"\n\t\t\t\t text-white hover:text-orange-400\n\t\t\t\t text-2xl rounded-full\n\t\t\t\t trans-ease-all\n\t\t\t\t bg-white bg-opacity-10\n\t\t\t\t size-[2.5rem]\n\t\t\t\t hover:scale-75\n\t\t\t\t"}>
 	 	        	→
 	 	      		</button>
 	 	    	</div>
 		</>);
}
