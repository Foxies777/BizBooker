import React, { useState } from "react";
import { Button, Layout, Card, Row, Col, Spin } from "antd";
import { AppstoreAddOutlined, CalendarOutlined } from "@ant-design/icons";
import { AddScheduleForm, Navbar, useGetBusinessStaffs } from "..";
import { useUnit } from "effector-react";
import { $currentBusiness } from "../../../../shared/business";
import BusinessNavbar from "../../../../components/BusinessNavbar";
import ModalStaffService from "./ModalStaffService";
import InviteStaff from "./InviteStaff";

interface Staff {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    status: "pending" | "active";
    services?: {
        id: string;
        name: string;
    }[]
}

const StaffCard: React.FC<{
    staff: Staff;
    onOpenModal: (type: "schedule" | "service", staffId: string) => void;
}> = ({ staff, onOpenModal }) => (
    <Col key={staff.id} xs={24} sm={12} md={8} lg={6}>
        <Card
            title={staff.name}
            actions={[
                <>
                    <Button
                        type="link"
                        icon={<CalendarOutlined />}
                        onClick={() => onOpenModal("schedule", staff.id)}
                        style={{ float: "right" }}
                    />
                    <Button
                        type="link"
                        icon={<AppstoreAddOutlined />}
                        onClick={() => onOpenModal("service", staff.id)}
                        style={{ float: "right" }}
                    />
                </>,
            ]}
        >
            <p>Email: {staff.email || "Не указано"}</p>
            <p>Телефон: {staff.phone || "Не указано"}</p>
            <p>Статус: {staff.status}</p>
            <p>
                Услуги:{" "}
                {staff.services && staff.services.length > 0
                    ? staff.services.map((service) => service.name).join(", ")
                    : "Нет услуг"}
            </p>
        </Card>
    </Col>
);


const Staffs: React.FC = () => {
    const [pendingStaff, activeStaff, loading] = useGetBusinessStaffs();
    const businessStaffs = [...pendingStaff, ...activeStaff];
    const [modalState, setModalState] = useState<{
        type: "schedule" | "service" | null;
        staffId: string | null;
    }>({ type: null, staffId: null });
    console.log(businessStaffs);
    
    const currentBusiness = useUnit($currentBusiness);

    const handleOpenModal = (type: "schedule" | "service", staffId: string) => {
        setModalState({ type, staffId });
    };

    const handleCloseModal = () => {
        setModalState({ type: null, staffId: null });
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="4">
                <InviteStaff businessId={currentBusiness?._id} />
                {loading ? (
                    <Spin />
                ) : (
                    <Row gutter={[16, 16]}>
                        {businessStaffs.map((staff: Staff) => (
                            <StaffCard
                                key={staff.id}
                                staff={staff}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </Row>
                )}
                {modalState.type === "schedule" && modalState.staffId && (
                    <AddScheduleForm
                        visible={true}
                        onClose={handleCloseModal}
                        staffId={modalState.staffId}
                        businessId={currentBusiness?._id}
                    />
                )}
                {modalState.type === "service" && modalState.staffId && (
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
