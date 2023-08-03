import { createContext } from "react";
import { fetchDataFromApi } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory)
    },[selectedCategory]);

    const fetchSelectedCategoryData = (query) => {
       setLoading(true);
       fetchDataFromApi(`search/?q=${query}`).then(({contents}) => {
        console.log(contents);
        setSearchResults(contents);
        setLoading(false);
       })
    }

    return(
        <Context.Provider value={{
            loading,setLoading,searchResults,
            selectedCategory,setSelectedCategory,
            mobileMenu,setMobileMenu,
        }}>
          {props.children}
        </Context.Provider>
    )
}