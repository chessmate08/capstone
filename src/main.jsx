import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import img from './assets/BNE_logo.svg'
import './index.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './inventory/auth'

const Head = () => {
    return (
        <>
        <div className="top">
            <div className='headInfo'>
                <p><b>BRAND NEW ELECTRIC, INC.</b></p>
                <br />
                <p>4237 E Magnolia St</p>
                <p>Phoenix, AZ 85034</p>
                <br />
                <p >O  (480) 361-1532 </p>
                <p >F  (480) 361-2921</p>
                <br />
                <a href="mailto: sales@brandnewelec.com">sales@brandnewelec.com</a>
                <br />
            </div>
            <img src={img} alt="Brand New Electric Phoenix" style={{"aspectRatio":"1", width: '210px'}} />
        </div>
        <div className="nav">
            <Link to='/'>HOME</Link>
            <Link to='/policies'>POLICIES</Link>
            <Link to='/inventory'>ITEM LIST</Link>
            <Link to='/login'>LOGIN</Link>
        </div>
        </>

    )
}
const Foot = () => {
    return (
        <>
            <div className="hl"></div>
            <div className="footer">
                <p >OFFICE HOURS: <b>Monday-Friday &nbsp; &bull; &nbsp; 7AM to 4PM</b></p>  
                <p >EMERGENCY SERVICE AVAILABLE: <b>call (480) 361-1532 &nbsp; &bull; &nbsp; text (602) 803-5647</b></p>

            </div>
            
        </>

    )
}
import scr from './assets/shop.jpg'
function App() {

    return (
        <>

            <div className="all">
                <Head />
                <div className="middle">
                    <center><img src={scr} alt="Shop image" style={{"width": `100%`}}/></center>
                </div>
                
                <Foot />
            </div>
        </>
    )
}



import {Policies} from './policies/policies'
import {Show} from './inventory/inventory'
import { Form } from './inventory/auth'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/policies' element={<Policies Head={Head} Foot={Foot} />} />
                
                <Route path='/inventory' element={<Show Head={Head} Foot={Foot} />} />
                <Route path='/login' element={<Form Head={Head} Foot={Foot} />} />
                

            </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,

)

