import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import img from './assets/LOGO.png'
import './index.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './inventory/auth'

const Head = () => {
    return (
        <>
        <div className="top">
            <div className='headInfo'>
                <p><b>BRAND NEW ELECTRIC, INC.</b></p>
                <p>4334 E Winslow Ave</p>
                <p>Phoenix, AZ 85040</p>
                <p></p>
                <p >O  (480) 361-1532 </p>
                <p >F  (480) 361-2921</p>
                <p></p>
                <p ><a href="mailto: sales@brandnewelec.com">sales@brandnewelec.com</a></p>
                <p></p>
            </div>
            <img src={img} alt="Brand New Electric Phoenix" style={{"aspectRatio":"1", height:"content-height"}} />
        </div>
        <div className="nav">
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/policies'>Policies</Link>
            <Link to='/inventory'>Item List</Link>
            <Link to='/authorize'></Link>
        </div>
        <div className="hl"></div>
        </>

    )
}
const Foot = () => {
    return (
        <div className="footer">
            <p >OFFICE HOURS: <b>Monday-Friday &nbsp; &bull; &nbsp; 7AM to 4PM</b></p>  
            <p >EMERGENCY SERVICE AVAILABLE: <b>call (480) 361-1532 &nbsp; &bull; &nbsp; text (602) 803-5647</b></p>

        </div>
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
                <div className="hl" />
                <Foot />
            </div>
        </>
    )
}
import { createContext } from 'react'
function MetaProvider() {
    const {Head} = createContext(Head)
}


import Policies from './policies/policies'
import Show from './inventory/inventory'
import { Form } from './inventory/auth'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/policies' element={<Policies Head={Head} Foot={Foot} />} />
                <AuthProvider>
                    <Route path='/inventory' element={<Show props={{Head, Foot}} />} />
                    <Route path='/login' element={<Form props={{Head, Foot}} />} />
                </AuthProvider>

            </Routes>
        </BrowserRouter>
    </StrictMode>,

)

