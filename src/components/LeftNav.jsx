import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/contextApi';
import { categories } from '../utils/constants';
import LeftNavMenuItem from './LeftNavMenuItem';

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu } = useContext(Context);

  const navigate = useNavigate();

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
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 dark:bg-black absolute md:relative z-10 translate-x-[-240px]
     md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : "" }`}>
     <div className="flex px-5 flex-col">
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