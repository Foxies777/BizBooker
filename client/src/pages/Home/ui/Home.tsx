import { useState } from "react";
import "../styles/Home.css";
import Business from "./Business";
import { useBusinesses } from "../hooks/useBusinesses";
import Navbar from "../../../components/Navigation";
import { useGetCategory } from "../../AddBusiness/hooks/useGetCategory";
import { SmileOutlined } from "@ant-design/icons";

interface BusinessListProps {
    businesses: any[];
    loading: boolean;
}

const BusinessList = ({ businesses, loading }: BusinessListProps) => {
    if (loading) {
        return (
            <div className="spin">
                <div className="loader"></div>
            </div>
        );
    }
    console.log(businesses[0].category.name);
    
    return (
        <div className="business-list">
            {businesses.map((business, index) => (
                <div key={index} className="business-card">
                    <Business title={business.name} {...business} />
                </div>
            ))}
        </div>
    );
};

const Home = () => {
    const [businesses, loading] = useBusinesses();
    const [categories, catLoading] = useGetCategory();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Фильтрация бизнесов по категории и поисковому запросу
    const filteredBusinesses = businesses.filter((business) => {
        const matchesCategory =
            !selectedCategory || business.category._id === selectedCategory;

        const matchesSearch = business.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Получение названия выбранной категории
    const selectedCategoryName = selectedCategory
        ? categories.find((category) => category._id === selectedCategory)?.name
        : null;

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-header">
                <h1>Добро пожаловать в BizBooker</h1>
                <h2>Откройте для себя лучшие компании в вашем регионе</h2>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button">Поиск</button>
            </div>
            <div className="filter-container">
                <label htmlFor="category-filter">Фильтровать по категориям:</label>
                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCategoryName ? (
                <h1 className="category-title">{selectedCategoryName}</h1>
            ) : (
                <h1 className="category-title">Все категории</h1>
            )}
            {filteredBusinesses.length >= 1 ? (
                <BusinessList
                    businesses={filteredBusinesses}
                    loading={loading}
                />
            ) : (
                <p className="no-businesses-message">
                    <SmileOutlined style={{ marginRight: 8 }} />
                    По данной категории нету бизнесов
                </p>
            )}
        </div>
    );
};

export default Home;
