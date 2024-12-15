import addonPricingData from '@data/json/addonPricingData.json';
import AddonBlock from './addon-block';
import { createContext, useEffect, useState } from 'react';
import AddonSelector from './addon-selector';
import useTransition from '@hooks/useTransition';
export var AddonsContext = createContext(undefined);
export default function Addons() {
    var addonSuite = addonPricingData.addons;
    var _a = useState([]), addons = _a[0], setAddons = _a[1];
    var MasterContext = {
        categoriesContext: useState([]),
        selectedCategoryContext: useState(''),
        transitionContext: useTransition({ speed: 'trans-ease' }),
        functions: {}
    };
    var _b = MasterContext.selectedCategoryContext, selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = MasterContext.categoriesContext, categories = _c[0], setCategories = _c[1];
    var transitionState = MasterContext.transitionContext.transitionState;
    var extractAndTransform = function (addonSuite) {
        var categorySet = [];
        var addonSet = [];
        addonSuite.forEach(function (addon) {
            var _a = Object.entries(addon), _b = _a[0], category = _b[1], _c = _a[1], options = _c[1];
            var addons = options.map(function (opt) {
                opt.category = category;
                return opt;
            });
            categorySet.push(category);
            addonSet.push.apply(addonSet, addons);
        });
        setCategories(categorySet);
        setAddons(addonSet);
    };
    useEffect(function () { return extractAndTransform(addonSuite); }, []);
    useEffect(function () {
        if (categories.length > 0) {
            setSelectedCategory(categories[1]);
        }
    }, [categories]);
    return (<section id="addons-section" className={"\n\t\t w-full h-[25rem] \n\t\t flex flex-col items-center justify-center\n\t\t rounded-xl\n\t\t bg-white bg-opacity-10\n\t\t p-[1.5rem] space-y-[2rem]\n\t\t"}>
		<AddonsContext.Provider value={MasterContext}>
			<section id="addon-category-selection" className={"\n\t\t\t flex items-center justify-between\n\t\t\t w-full\n\t\t\t"}>
				<AddonSelector />
			</section>
			<section id="addon-display" className={"\n\t\t\t flex items-center justify-center\n\t\t\t space-x-[3rem]\n\t\t\t"}>
			{addons.map(function (addon, key) {
            if (addon.category === selectedCategory)
                return (<AddonBlock key={key} name={addon.name} description={addon.description} svg={addon.svg}/>);
        })}
			</section>
		</AddonsContext.Provider>
		</section>);
}
