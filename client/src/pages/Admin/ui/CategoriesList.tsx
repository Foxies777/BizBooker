import React from 'react';
import { List, Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useGetCategory } from '../../AddBusiness/hooks/useGetCategory';

const CategoriesList = () => {
    const [categories, catLoading] = useGetCategory();

    if (catLoading) {
        return <Spin tip="Loading..." />;
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(item._id)} />
                    ]}
                >
                    <List.Item.Meta
                        title={item.name}
                    />
                </List.Item>
            )}
        />
    );
};

export default CategoriesList;