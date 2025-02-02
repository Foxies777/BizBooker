import React, { useState } from "react";
import Navbar from "../../../components/Navigation";
import { Button, Spin, List } from "antd";
import { useProfile } from "../../../context/ProfileContext";
import { useGetInvites } from "../hooks/useGetInvites";
import VerificationModal from "./VerificationModal";
import { sendCodeFx } from "../../../shared/invite";
import { Invitations } from "../../../shared/api/invite/model";
import { useCreateStaff } from "../hooks/useCreateStaff";
import UserBookings from "./UserBookings";
import "../styles/Profile.css"

const Profile = () => {
    const { user, loading: userLoading } = useProfile();
    const [invites, invitesLoading] = useGetInvites();
    const [handleUpdateStaff] = useCreateStaff();
    const [visible, setVisible] = useState(false);
    const [selectedInvite, setSelectedInvite] = useState<any | null>(null);

    const handleVerifyClick = async (invite: Invitations) => {
        try {
            await sendCodeFx({ userId: invite.userId });
            setSelectedInvite(invite);
            setVisible(true);
        } catch (error) {
            console.error("Ошибка при отправке кода:", error);
        }
    };

    const handleClickStaff = () => {
        const userId = user?._id;
        handleUpdateStaff(userId ?? "", "staff");
    };

    const handleCloseModal = () => {
        setSelectedInvite(null);
        setVisible(false);
    };

    if (userLoading) {
        return (
            <div className="spin-container">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="profile-container">
            <Navbar />
            {user ? (
                <>
                    <div className="profile-header">
                        <h1>
                            Welcome, {user.name} {user.surname}
                        </h1>
                    </div>
                    <div className="profile-info">
                        <p>
                            Role: <span className="role">{user.role}</span>
                        </p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        {user.role === "client" && (
                            <Button type="primary" onClick={handleClickStaff}>
                                Стать сотрудником
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <div className="no-data">
                    <h1>Профиль</h1>
                    <p>Нет доступных пользовательских данных.</p>
                </div>
            )}
            {user?.role === "staff" && (
                <div className="invitations-section">
                    <h2>Приглашения</h2>
                    {invitesLoading ? (
                        <div className="spin-container">
                            <Spin size="large" />
                        </div>
                    ) : invites.length > 0 ? (
                        <div className="invitations-list">
                            <List
                                dataSource={invites}
                                renderItem={(invite) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                type="link"
                                                onClick={() =>
                                                    handleVerifyClick(invite)
                                                }
                                            >
                                                Принять
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={invite.businessId.name}
                                            description={`Приглашение от бизнеса: ${invite.businessId.name}`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    ) : (
                        <p className="no-data">Нет активных приглашений.</p>
                    )}
                </div>
            )}

            {selectedInvite && (
                <VerificationModal
                    visible={visible}
                    onClose={handleCloseModal}
                    userId={user?._id || ""}
                    businessId={selectedInvite.businessId}
                />
            )}
            {user && <UserBookings />}
        </div>
    );
};

export default Profile;