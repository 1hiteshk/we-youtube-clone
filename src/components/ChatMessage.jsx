import {BiUserCircle} from "react-icons/bi"

const ChatMessage = ({name , message}) => {
    return (
      <div className='flex items-center shadow-sm p-2 dark:bg-black'>
         < BiUserCircle className="h-6 w-6 dark:text-white " />
          <span className='font-semibold px-2 dark:text-gray-300'>{name}</span>
          <span className="dark:text-white">{message}</span>
      </div>
    )
  }
  
  export default ChatMessage;