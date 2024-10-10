
import { Spin } from "antd";
import Business from "./Business";
import { useBusinesses } from "../hooks/useBusinesses";
import Navbar from "../../../components/Navigation";
const BusinessList = () => {
    const [businesses, loading] = useBusinesses();

    if (loading) {
        return (
            <div className="spin">
                <Spin />
            </div>
        );
    }
    
    return businesses?.map((business: any) => (
        <Business
            key={business.id}
            id={business.id}
            title={business.title}
            description={business.description}
        />
    ));
};

const Home = () => {
    return (
        <>
            <Navbar />
            <h1>Welcome to BizBooker</h1>
            <h2>Discover the best businesses in your area</h2>
            <div>
                <input type="text" placeholder="Поиск" />
                <button type="button">Поиск</button>
            </div>
            <BusinessList />
        </>
    );
};

export default Home;
