import React from 'react'
import {Link} from 'react-router-dom'
import logo from "../../img/9cf823124728831.Y3JvcCwzNDA5LDI2NjcsMjk1LDA.png"

export default function Home() {
  return(<>
  <div className='py-5'>
 <div className="container">
  <div className="row">
    <div className="text-center">
       <Link to='/' className='btn btn-info db mb-2 w-25'>Home</Link>
       <div className="imag">
  <img src={logo}/>
  </div>
    </div>
  </div>
 </div>
  </div>
   </>)
}
