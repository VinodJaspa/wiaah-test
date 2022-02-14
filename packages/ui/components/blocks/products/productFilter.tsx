import React, { useState, useEffect } from "react";
import {FaChevronUp} from "react-icons/fa";
import {AiFillStar} from "react-icons/ai";
import Select from 'react-select';
import { Country, City }  from 'country-state-city';
import {Divider} from '../../../components'

interface ProductFilterProps {
    priceRange?: {min:number, max:number};
    shipping?: Array<{label:string, value:string}>;
    brands?: Array<{label:string, value:string}>;
    colors?: Array<string>
};

let countriesOptions = Array();
const countries = Country.getAllCountries();
countries.forEach(element => {
    countriesOptions.push({
        value: element.isoCode, label: element.name
    });
});

export const ProductFilter: React.FC<ProductFilterProps> = (
    {priceRange={min:0, max:1000},
    shipping=[
        {label:'Click and Collect', value:'click_and_collect'},
        {label:'Free', value:'free'},
        {label:'International', value:'international'}
    ], brands=[], colors=[],}) => {

    

    let [minPrice, setMinPrice] = useState(priceRange.min);
    let [maxPrice, setMaxPrice] = useState(priceRange.max);
    let [minPosition, setMinPosition] = useState(0);
    let [maxPosition, setMaxPosition] = useState(1000);
    let [sizeOne, setSizeOne] = useState('0');
    let [sizetwo, setSizeTwo] = useState('full');
    let [priceOpened, setPriceOpened] = useState<boolean | false>();
    let [shippingOpened, setShippingOpened] = useState<boolean | false>();
    let [brandOpened, setBrandOpened] = useState<boolean | false>();
    let [ratingOpened, setRatingOpened] = useState<boolean | false>();
    let [colorOpened, setColorOpened] = useState<boolean | false>();
    let [countryCode, setCountryCode] = useState('');
    let [cities, setCities] = useState([{ value: '', label: 'Select country first!'}]);

    
    useEffect(() => {
        const citiesArray = City.getCitiesOfCountry(countryCode);
        let index = 0;
        citiesArray?.forEach( element =>{
            cities[index] = {value: element.name, label: element.name};
            index++;
        });
    }, [countryCode]);

    useEffect(() =>{
        setMinPrice(priceRange.min + minPosition*(priceRange.max-priceRange.min)/1000.0);
        setMaxPrice(priceRange.min + maxPosition*(priceRange.max-priceRange.min)/1000.0);
        if(minPosition == 0){
            setSizeOne('0');
            if(maxPosition == 1000){
                setSizeTwo('full');
            }else{
                setSizeTwo((maxPosition/10)+'p');
            }
        }else{
            setSizeOne((minPosition/10)+'p');
            setSizeTwo(((maxPosition-minPosition)/10)+'p');
        }
    }, [minPosition,maxPosition]);

    function handleMaxPriceChange(value:any){
        if(value.target.value < (minPosition + 100)){
            setMaxPosition(minPosition + 100);
        }else{
            setMaxPosition(value.target.value - (value.target.value%100));
        }
    };

    function handleMinPriceChange(value:any){
        if(value.target.value > (maxPosition - 100)){
            setMinPosition(maxPosition - 100);
        }else{
            setMinPosition(value.target.value - (value.target.value%100));
        }
    };

    function handleCountryChange(value:any){
        setCountryCode(value.value);
    }
    return ( 
        <>            
            <div className={`${
                    priceOpened ? "" : "h-10"
                  } price-selector border md:border-solid border-none px-2 overflow-hidden transition-height ease-in-out duration-300`}>
                <div className="accordion-toggle mb-2 h-10 items-center flex justify-between" onClick={() => {setPriceOpened(!priceOpened);}}>
                    <span>Price ($)</span>
                    <FaChevronUp 
                    
                    className={`${
                        priceOpened ? "" : "rotate-180"
                    } `}
                    />
                </div>
                <div className="flex justify-left items-center mb-2">
                    <div className="w-full relative priceRangeSlider h-10 mt-2">
                        <input 
                            onChange={ (value) =>{
                                handleMinPriceChange(value);
                            }}
                            type="range"
                            value={minPosition}
                            min={0}
                            max={1000}
                            step={100}
                            className="w-full slider absolute left-0 top-0" />
                        <input
                            onChange={ (value) =>{
                                handleMaxPriceChange(value);
                            }} 
                            type="range" 
                            
                            value={maxPosition} 
                            min={0} 
                            max={1000} 
                            step={100}
                            className="w-full slider absolute left-0 top-0" />
                        <div className="w-full bg-gray-300 rounded-lg h-1 absolute left-0 top-0"></div>
                        <div>
                            <span className="absolute left-0 bottom-0 text-xs min-price">${minPrice}</span>
                            <span className="absolute right-0 bottom-0 text-xs max-price">${maxPrice}</span>
                        </div>
                        <div className="flex justify-start items-center">
                            <div
                                className={`${
                                    'w-'+sizeOne
                                } relative h-1 flex items-center justify-end`}
                            >
                                <div className="absolute right-0 translate-x-2  bg-green-700 h-3 w-3 rounded-full"></div>
                            </div>
                            <div
                                className={`${
                                    'w-'+sizetwo
                                } bg-green-700 h-1 flex items-center translate-x-1 justify-end`}
                            >
                                <div className="bg-green-700 h-3 w-3 rounded-full"></div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden block"><Divider /></div>
            <div 
                className={`${
                    shippingOpened ? "" : "h-10"
                  } shipping-selector border md:border-solid border-none px-2 overflow-hidden transition-height ease-in-out duration-300`}
            >
                <div className="accordion-toggle mb-3 h-10 flex items-center justify-between" onClick={() => {setShippingOpened(!shippingOpened);}}>
                    <span>Shipping</span>
                    <FaChevronUp 
                        
                        className={`${
                            shippingOpened ? "" : "rotate-180"
                        } `}
                    />
                </div>
                {shipping.map((item, i:number) => (
                    <div className="flex justify-left items-center mb-2" key={i}>
                        <input name="shipping" type="radio" value={item.value} className="rounded text-pink-500" />
                        <span className="text-xs ml-2">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="md:hidden block"><Divider /></div>
            {brands.length !== 0? (
                <div className={`${
                    brandOpened ? "" : "h-10"
                  } brand-selector border md:border-solid border-none px-2 overflow-hidden transition-height ease-in-out duration-300`}>
                    <div className="accordion-toggle mb-2 h-10 flex items-center justify-between" onClick={() => {setBrandOpened(!brandOpened);}}>
                        <span>Brand</span>
                        <FaChevronUp 
                        className={`${
                            brandOpened ? "" : "rotate-180"
                        } `}
                        />
                    </div>
                    {brands.map((item, i:number) =>(
                        <div key={i} className="flex justify-left items-center mb-2">
                            <input type="checkbox" value={item.value} className="rounded text-pink-500" />
                            <span className="text-xs ml-2">{item.label}</span>
                        </div>
                    ))}
                </div>
            ) : '' }
            
            <div className="md:hidden block"><Divider /></div>
            <div className={`${
                    ratingOpened ? "" : "h-10"
                  } rating-selector border md:border-solid border-none px-2 overflow-hidden transition-height ease-in-out duration-300`}>
                <div 
                    onClick={() => {setRatingOpened(!ratingOpened);}}
                    className="accordion-toggle mb-2 h-10 items-center flex justify-between"
                >
                    <span>Rating</span>
                    <FaChevronUp 
                        className={`${
                            ratingOpened ? "" : "rotate-180"
                        } `}
                    />
                </div>
                <div className="flex justify-left items-center mb-2">
                    <input type="checkbox" className="rounded text-pink-500" />
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                </div>
                <div className="flex justify-left items-center mb-2">
                    <input type="checkbox" className="rounded text-pink-500" />
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                </div>
                <div className="flex justify-left items-center mb-2">
                    <input type="checkbox" className="rounded text-pink-500" />
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                </div>
                <div className="flex justify-left items-center mb-2">
                    <input type="checkbox" className="rounded text-pink-500" />
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                </div>
                <div className="flex justify-left items-center mb-2">
                    <input type="checkbox" className="rounded text-pink-500" />
                    <AiFillStar className="inline text-orange-500 ml-2"/>
                </div>
            </div>
            <div className="md:hidden block my-5"></div>
            {colors.length !== 0?(
               <div className={`${
                    colorOpened ? "" : "h-10"
                  } color-selector border md:border-solid border-none px-2 overflow-hidden transition-height ease-in-out duration-300`}>
                    <div className="accordion-toggle mb-2 h-10 items-center flex justify-between" onClick={() => {setColorOpened(!colorOpened);}}>
                        <span>Color</span>
                        <FaChevronUp 
                        className={`${
                            colorOpened ? "" : "rotate-180"
                        } `}
                        />
                    </div>
                    <div className="flex justify-left items-center mb-2">
                        <input type="checkbox" className="rounded text-pink-500" />
                        <div className="inline-block bg-red-500 border w-4 h-4 ml-2"></div>
                    </div>
                    <div className="flex justify-left items-center mb-2">
                        <input type="checkbox" className="rounded text-pink-500" />
                        <div className="inline-block bg-green-500 border w-4 h-4 ml-2"></div>
                    </div>
                    <div className="flex justify-left items-center mb-2">
                        <input type="checkbox" className="rounded text-pink-500" />
                        <div className="inline-block bg-yellow-500 border w-4 h-4 ml-2"></div>
                    </div>
                    <div className="flex justify-left items-center mb-2">
                        <input type="checkbox" className="rounded text-pink-500" />
                        <div className="inline-block bg-gray-500 border w-4 h-4 ml-2"></div>
                    </div>
                    <div className="flex justify-left items-center mb-2">
                        <input type="checkbox" className="rounded text-pink-500" />
                        <div className="inline-block bg-white border w-4 h-4 ml-2"></div>
                    </div>
                </div> 
            ) : '' }
            

            <div className="country-selector">
                <div className=" w-full">
                    <Select 
                        id="countryselect"
                        instanceId='countryselect'
                        className='react-select-container' 
                        classNamePrefix="react-select" 
                        options={countriesOptions} placeholder={'Countries'}
                        onChange={(value) =>{ handleCountryChange(value);}}    
                    />
                </div>
            </div>
            <div className="city-selector">
                <div className="mb-2 w-full">
                    <Select 
                        id='cityselect'
                        instanceId='cityselect'
                        className='react-select-container' 
                        classNamePrefix="react-select" 
                        options={cities} placeholder={'Cities'} />
                </div>
            </div>
            <button className="flex mt-5 w-full h-10 p-3 text-white items-center justify-center rounded-lg bg-green-400 cursor-pointer">Clear</button>
        </>
    );
};

