import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    return (        
    <div class="mt-10">
        <div className="flex justify-around footerFlex">
          <div>
              <h1 class="text-xl font-bold tracking-tight text-gray-200 sm:text-3xl">Contact Us</h1>

          </div>
          <a href="#home"><h1 class="text-xl ml-64 font-bold tracking-tight text-gray-200 sm:text-xl">HOME</h1></a>
          <a href="#form"><h1 class="text-xl font-bold tracking-tight text-gray-200 sm:text-xl">FORM</h1></a>

          <Link to="/login"><button class="hover:bg-indigo-500 border border-indigo-300 text-white font-bold py-0.5 px-4 rounded-full max-h-8">Log in <span aria-hidden="true">&rarr;</span></button></Link>
          
        </div>
        <p class="mt-6 text-lg text-center leading-8 text-gray-300">Disclaimer: the companies and prices listed are not factual, as this is a demo website.</p>
        <hr class="footerLine"></hr>
        <p class="mt-20 pb-10 text-sm text-center leading-8 text-gray-300">© 2025, All rights reserved.</p>
      </div>
    );
}

export default Footer;