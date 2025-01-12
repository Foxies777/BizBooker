import { Button } from "antd";
import { useState } from "react";
import InviteModal from "./InviteModal";

const InviteStaff = ({ businessId }: { businessId: string }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Пригласить сотрудника
            </Button>
            <InviteModal visible={visible} onClose={() => setVisible(false)} businessId={businessId} />
        </>
    );
};

export default InviteStaff;
