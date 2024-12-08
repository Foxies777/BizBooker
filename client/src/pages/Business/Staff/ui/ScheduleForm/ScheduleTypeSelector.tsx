import { Button } from "antd"

interface ScheduleTypeSelectorProps {
  onChange: (type: "temporary" | "permanent" | "recurring") => void
  currentType: "temporary" | "permanent" | "recurring"
}

const ScheduleTypeSelector: React.FC<ScheduleTypeSelectorProps> = ({ onChange, currentType }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Button type={currentType === 'temporary' ? 'primary' : 'default'} onClick={() => onChange('temporary')}>Срочный</Button>
      <Button type={currentType === 'permanent' ? 'primary' : 'default'} onClick={() => onChange('permanent')}>Бессрочный</Button>
      <Button type={currentType === 'recurring' ? 'primary' : 'default'} onClick={() => onChange('recurring')}>Ежедневное</Button>
    </div>
  )
}

export default ScheduleTypeSelector
