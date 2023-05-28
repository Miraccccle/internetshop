import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

// Products component
const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const inputRef = useRef(null); // Create a ref for the input field

    // Fetch products data
    useEffect(() => {
        let componentMounted = true;

        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            if (componentMounted) {
                setData(products);
                setFilter(products);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, []);

    // Filter products based on category and search query
    const filterProduct = (cat) => {
        setSelectedCategory(cat);
        const updatedList = data.filter((x) => {
            if (cat === 'All') {
                return x.title.toLowerCase().includes(searchQuery.toLowerCase());
            } else {
                return (
                    x.category === cat &&
                    x.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
        });
        setFilter(updatedList);
    };

    // Handle search input
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        filterProduct(selectedCategory);
    };

    // Set focus on input field
    useEffect(() => {
        inputRef.current.focus();
    }, [searchQuery]);

    // Loading skeleton component
    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        );
    };

    // Render products
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button
                        className={`btn btn-outline-dark me-2 ${
                            selectedCategory === 'All' ? 'active' : ''
                        }`}
                        onClick={() => filterProduct('All')}
                    >
                        All
                    </button>
                    <button
                        className={`btn btn-outline-dark me-2 ${
                            selectedCategory === "men's clothing" ? 'active' : ''
                        }`}
                        onClick={() => filterProduct("men's clothing")}
                    >
                        Men's Clothing
                    </button>
                    <button
                        className={`btn btn-outline-dark me-2 ${
                            selectedCategory === "women's clothing" ? 'active' : ''
                        }`}
                        onClick={() => filterProduct("women's clothing")}
                    >
                        Women's Clothing
                    </button>
                    <button
                        className={`btn btn-outline-dark me-2 ${
                            selectedCategory === 'jewelery' ? 'active' : ''
                        }`}
                        onClick={() => filterProduct('jewelery')}
                    >
                        Jewelry
                    </button>
                    <button
                        className={`btn btn-outline-dark me-2 ${
                            selectedCategory === 'electronics' ? 'active' : ''
                        }`}
                        onClick={() => filterProduct('electronics')}
                    >
                        Electronics
                    </button>
                </div>
                {filter.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card h-100 text-center p-4">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                                height="250px"
                            />
                            <div className="card-body">
                                <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                                <p className="card-text lead fw-bold">${product.price}</p>
                                <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                                    See More
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="mx-auto col-10 col-md-8 col-lg-6">
                        <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                        <form style={{ width: 636 }}>
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearch}
                                ref={inputRef}
                            />
                        </form>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;
