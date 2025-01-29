import { Col, Row, Spin } from "antd"
import Business from "./Business"
import { useBusinesses } from "../hooks/useBusinesses"
import Navbar from "../../../components/Navigation"
const BusinessList = () => {
    const [businesses, loading] = useBusinesses();

    if (loading) {
        return (
            <div className="spin">
                <Spin />
            </div>
        );
    }

    return (
        <Row
            gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 }, 
                { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
        >
            {businesses.map((business, index) => (
                <Col
                    key={index}
                    xs={24} 
                    sm={12} 
                    md={8}
                    lg={4}
                >
                    <Business title={business.name} {...business} />
                </Col>
            ))}
        </Row>
    );
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
    )
}

export default Home
