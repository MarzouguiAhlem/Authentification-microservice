import { useDispatch } from "react-redux";
import { ThreeDots } from  'react-loader-spinner';
import "./Loader.css"
const Loader = () => {
  const dispatch = useDispatch()

//   const handelConfirm = () =>{
//     dispatch(clearCart())
//     dispatch(closeModal())
//   }
    return (
      <aside className='modal-container'>
        <ThreeDots 
          height="100" 
          width="100" 
          radius="9"
          color="#1abc9c" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </aside>
    );
  };
  export default Loader;