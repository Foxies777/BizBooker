import { Button, Layout, Card, Row, Col, Spin } from "antd";
import { AppstoreAddOutlined, CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AddScheduleForm, AddStaff, Navbar, useGetBusinessStaffs } from "..";
import { useUnit } from "effector-react";
import { $currentBusiness } from "../../../../shared/business";
import BusinessNavbar from "../../../../components/BusinessNavbar";
import ModalStaffService from "./ModalStaffService";

const Staffs = () => {
    const [businessStaffs, loading] = useGetBusinessStaffs();
    const [modalState, setModalState] = useState<{ type: string | null, staffId: string | null }>({ type: null, staffId: null });
    const currentBusiness = useUnit($currentBusiness);

    const handleOpenModal = (type: string, staffId: string) => {
        setModalState({ type, staffId });
    };

    const handleCloseModal = () => {
        setModalState({ type: null, staffId: null });
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="4">
                <AddStaff />
                {loading ? (
                    <Spin />
                ) : (
                    <Row gutter={[16, 16]}>
                        {businessStaffs.map((staff) => (
                            <Col key={staff._id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    title={staff.name}
                                    actions={[
                                        <>
                                            <Button
                                                type="link"
                                                icon={<CalendarOutlined />}
                                                onClick={() => handleOpenModal('schedule', staff._id)}
                                                style={{ float: "right" }}
                                            ></Button>
                                            <Button
                                                type="link"
                                                icon={<AppstoreAddOutlined />}
                                                onClick={() => handleOpenModal('service', staff._id)}
                                                style={{ float: "right" }}
                                            ></Button>
                                        </>,
                                    ]}
                                >
                                    <p>Email: {staff.email}</p>
                                    <p>Телефон: {staff.phone}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                {modalState.type === 'schedule' && modalState.staffId && (
                    <AddScheduleForm
                        visible={true}
                        onClose={handleCloseModal}
                        staffId={modalState.staffId}
                        businessId={currentBusiness?._id}
                    />
                )}
                {modalState.type === 'service' && modalState.staffId && (
                    <ModalStaffService
                        visible={true}
                        onClose={handleCloseModal}
                        staffId={modalState.staffId}
                    />
                )}
            </BusinessNavbar>
        </Layout>
    );
};

export default Staffs;