import { useEffect, useState } from "react";
import Header from "../components/Header";
import Slogan from "../components/Slogan";
import FeedbackPage from "./FeedbackPage";



const HomePage = () => {

    const [items, setItems] = useState([]);

    const [query, setQuery] = useState([]);
  

    const onChangeQuery = (event) => {
        setQuery(event.target.value.toLowerCase());
    }
    const filteredProducts = items.filter((item) => item.name.toLowerCase().includes(query));
    const fetchServices = async() => {
        const response = await fetch('https://flowers.avavion.ru/api/products');
        
        const data = await response.json();

        setItems(data.data);
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="home">
            <Header />
            <Slogan />
            <section id="catalog" className="catalog">
                <div className="catalog_container container">
                    <div className="catalog_header">
                        <h1>Каталог</h1>
                        <div className="filter">
                            {/* <Filter setItems={setItems} setCategory={setCategory}/> */}
                            {/* <a href="#" className="link-style">Игры</a>
                            <a href="#" className="link-style">Программы</a> */}
                        </div>
                        <div className="\">
                            <div className="search-box-img image-box">
                            </div>
                            <input 
                            value={query}
                            onChange={(e) => onChangeQuery(e)}
                            type="text" 
                            placeholder="Поиск..." 
                            className="search-box_input" />
                        </div>
                    </div>
                    <div className="catalog_content">
                        {
                             filteredProducts.length ? 
                             (
                                filteredProducts.map((product) => {
                                    return (
                                        <div className="filter" key={product.id}>
                                            <img src={product.preview_image} alt="" />
                                            <h2>{product.name}</h2>
                                            <p className="product_text">{product.text}</p>
                                            <p className="price">Цена: {product.price}</p>
                                        </div>
                                    );
                                })
                             ):
                             <h2>По вашему запросу {query} ничего не найдено</h2>
                        }
                        {/* <Product setItems={setItems} items={items} category={category}/> */}
                    </div>
                </div>
            </section>

            <section id="feedback" className="feedback">
                <FeedbackPage />
            </section>
        </div>
    )
}

export default HomePage;