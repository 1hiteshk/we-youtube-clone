import { useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/contextApi';
import { categories } from '../utils/constants';
import LeftNavMenuItem from './LeftNavMenuItem';

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu } = useContext(Context);
  console.log("re-rendered");
  const navigate = useNavigate();

    const [theme, setTheme] = useState('dark');
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
      if( theme === 'dark'){
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },[theme]);
  
    const handleThemeSwitch = () => {
      setTheme( theme === 'dark' ? 'light' : 'dark');
      setDarkMode(!darkMode);
    };

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
          return setSelectedCategory(name);
      case "menu":
            return false;

      default:
          break;
    }
  }
  return (
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 dark:bg-black/[0.8] md:dark:bg-black bg-slate-50/[0.8] md:bg-white absolute md:relative z-10 translate-x-[-240px]
     md:translate-x-0 transition-all ${mobileMenu ? "translate-x-[0px]" : " "}`}>
     <div className="flex px-5 flex-col">
     <button  className='dark:text-white text-black text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]'
      onClick={handleThemeSwitch}> { darkMode ? <MdDarkMode className='mr-6 '/> : <MdLightMode className='mr-6' />} {theme} </button>
      { categories.map((item) => {
        return (
          <div key={item.name}>
           <LeftNavMenuItem 
             text={item.type === 'home' ? "Home" : item.name}
             icon={item.icon}
             action={() => {
              clickHandler(item.name, item.type);
              navigate("/");
             }}
             className={`${selectedCategory === item.name ? "bg-white/[0.15]" : "" }`}
           />
           {item.divider && 
            <hr className='my-5 border-white/[0.2]' />
           }
          </div>
        )
      })}
       <hr className='my-5 border-white/[0.2]' />
       <div className='dark:text-white/[0.5] text-[12px]'>
        hitu
       </div>
     </div>
    </div>
  )
}

export default LeftNav;