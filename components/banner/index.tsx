import { Button, Typography } from 'antd';
import styles from './banner.module.scss';
import { IBannerProps } from './banner';

const { Title, Paragraph } = Typography;

export default function Banner ({onClick}: IBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div>
          <Title level={2}>CheckIns</Title>
          <Paragraph className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Paragraph>
        </div>
        <div>
          <Button className={styles.checkinBtn} onClick={onClick} type="primary">
            Add Check In
          </Button>
        </div>
      </div>
    </div>
  )
}