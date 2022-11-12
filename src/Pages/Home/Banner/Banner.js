import React from 'react';
import chair from '../../../assets/images/chair.png';

const Banner = () => {
    return (
        <div className="hero my-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold text-accent">Your New Smile Starts Here!</h1>
                    <p className="py-6 text-accent">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className='btn btn-primary text-white'>Getting Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;