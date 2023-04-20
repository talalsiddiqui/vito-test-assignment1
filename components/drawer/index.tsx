import { Drawer, Image, Typography } from 'antd';

const { Title } = Typography;

export default function CheckinDrawer({open, onClose, data}) {
  return (
    <Drawer
      title="Details"
      placement="right"
      width={430}
      onClose={onClose}
      open={open}
    >
      <Title level={2}>
        {data.name}
      </Title>
      <Image  alt='' src={data.image_url} />
    </Drawer>
  )
}