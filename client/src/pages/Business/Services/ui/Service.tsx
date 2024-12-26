import { Layout, Card, Row, Col, Spin } from "antd"
import BusinessNavbar from "../../../../components/BusinessNavbar"
import Navbar from "../../../../components/Navigation"
import ModalCreateService from "./ModalCreateService"
import { useGetBusinessService } from "../hooks/useGetBusinessService"
const Service = () => {
    const [businessServices, loading] = useGetBusinessService()
    console.log(businessServices);
    
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="2">
                <ModalCreateService />
                {loading? (
                    <Spin />
                ):
                <Row gutter={16}>
                    {businessServices.map((service) =>(
                        <Col key={service._id} xs={24} sm={12} md={8} lg={6}>
                            <Card title={service.name} bordered={false}>
                                <p>{service.description}</p>
                                <p>{service.duration}</p>
                                <p>{service.price}</p>
                            </Card>
                        </Col>
                    ))}
                    </Row>}
            </BusinessNavbar>
        </Layout>
    )
}

export default Service