import React from 'react'
import { Link } from 'react-router-dom'
import '../../template/index.sass'


export default function() {

    return <section>
       
        <section className="logo">
        <img className="logo__image" src="./images/ski_silouette_white_shadow.png" alt="skier silouette"/>
        </section>
    
        <section className="landing">

        <h1 className="landing__title">pyrene</h1>
        <h2 className="landing__subtitle">ski</h2>
        </section>

        <section className="landing">
        <h3 className="landing__options">{/* Please, proceed to */} <Link  className="landing__login" to="/login">LOGIN</Link> or <Link className="landing__register" to="/register" >REGISTER</Link></h3>
        </section>

       {/*  <figure className="picture">
            <img className="picture__image" src="./images/7Np69-pW-1380x690.jpeg" alt="snow_mountain_landscape"/>

        </figure> */}


    </section>
}
