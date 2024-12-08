import { Form, TimePicker, Space, Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const BreaksPicker: React.FC = () => {
  return (
    <Form.List name="breaks">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'startBreak']}
                rules={[{ required: true, message: 'Укажите время начала перерыва' }]}
              >
                <TimePicker placeholder="Начало перерыва" format="HH:mm" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'endBreak']}
                rules={[{ required: true, message: 'Укажите время окончания перерыва' }]}
              >
                <TimePicker placeholder="Окончание перерыва" format="HH:mm" />
              </Form.Item>
              <DeleteOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          {fields.length < 5 && (
            <Button type="dashed" onClick={() => add()}>
              Добавить перерыв
            </Button>
          )}
        </>
      )}
    </Form.List>
  )
}

export default BreaksPicker
