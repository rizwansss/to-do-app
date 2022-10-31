import {toast} from "react-toastify";
window.getRandomId = ()=>Math.random().toString(36).slice(2);
window.notify =(msg,type)=>{

    const opition= {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };
switch (type) {
    case 'success':
         toast.success(msg,opition)
        break;
        case 'error':
        toast.error(msg,opition)
       break;
       case 'info':
       toast.info(msg,opition)
      break;
      case 'warning':
      toast.warning(msg,opition)
     break;
    default:
        toast(msg,opition);
}

}
 