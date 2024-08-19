import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { SEARCH_SUGGESTION_API } from "../utils/constants";

import { SlMenu } from "react-icons/sl";
import {BiUserCircle} from "react-icons/bi"
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const navigate = useNavigate();

  // to use the cache we have to dispatch a action from reduxstore to appsite via useSelector
  const searchCache = useSelector((store) => store.search);
  
  useEffect(() => {
    // api call

    //make an api call after every key press
    //but if the diff. b/w two press/2 api call is <200ms decline api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        // cache is stored in redux store so when we back <- less api calls made
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const getSearchSuggestion = async () => {
    console.log("API call - " + searchQuery);
    const data = await fetch( SEARCH_SUGGESTION_API + searchQuery);
    //console.log(data,"data");
    const json = await data.json();
    console.log(json)
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const mobileMenuToggle = () => {
    // console.log(mobileMenu);
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5  dark:bg-black ">
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className="text-black dark:text-white text-xl" />
            ) : (
              <SlMenu className="text-black dark:text-white text-xl" />
            )}
          </div>
        )}
       <Link to={"/"} className="flex h-5 items-center">
       <img className="h-full hidden dark:md:block " src={ytLogo} alt="Youtube" />
       <img className="h-full hidden dark:hidden md:block"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1200px-YouTube_Logo_2017.svg.png"
        alt="Youtube" />
        <img className="h-full md:hidden" src={ytLogoMobile} alt="Youtube" />
       </Link>
      </div>
      <div className="flex flex-col">
      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                <IoIosSearch className="dark:text-white text-xl" />
            </div>
            <input 
              type="text"
              placeholder="Search bro"
              className="bg-transparent outline-none dark:text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => searchQueryHandler(e)} // Change from onKeyUp to onKeyDown for better reliability
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 500)} // setTimeout coz for the clicked suggestion list should update the value of input search bar before getting blurred
              value={searchQuery}
            />
        </div>
        <button onClick={() => searchQueryHandler('searchButton')}
         className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1] ">
                <IoIosSearch className="dark:text-white text-xl" /></button>
       </div>

       <div>
       {showSuggestions && (
          <div className="fixed top-12 z-10 md:pl-0 md:ml-5 bg-slate-300 w-44 md:w-64 lg:w-[541px] rounded-lg mt-1">
            <ul>
              {suggestions?.map((suggestion) => {
                return (
                  <li
                    key={suggestion}
                    onClick={() => { setSearchQuery(suggestion) 
                      navigate(`/searchResult/${suggestion}`) } }
                    className="shadow-sm py-2 px-3 flex items-center hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <IoIosSearch className="mx-2" />  {suggestion}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
       </div>
       
       </div>


       <div className="flex items-center">
        <div className="hidden md:flex">
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                <RiVideoAddLine  className="dark:text-white text-xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                <FiBell  className="dark:text-white text-xl cursor-pointer" />
            </div>
            
        </div>
        <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                <BiUserCircle className="dark:text-white text-xl cursor-pointer h-7 w-7" />
            </div>
       </div>
    </div>
  );
};

export default Header;
