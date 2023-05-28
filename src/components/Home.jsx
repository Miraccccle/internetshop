import React from 'react';
import Products from "./Products";

// Home component
const Home = () => {
    return (
        <div className="hero">
            {/* Hero card with background image */}
            <div className="card bg-dark text-white border-0">
                <img src="/assets/hero.png" className="card-img" alt="Background"/>
                <div className="card-img-overlay d-flex flex-column">
                    <div className="container mt-5">
                        <h5 className="card-title display-4 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                        <p className="card-text lead fs-8">
                            CHECK OUT ALL THE TRENDS
                        </p>
                    </div>
                </div>
            </div>
            {/* Render Products component */}
            <Products />
        </div>
    );
};

export default Home;
