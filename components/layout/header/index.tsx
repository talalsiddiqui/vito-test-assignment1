import { Avatar, Dropdown, MenuProps, Row } from "antd"
import Link from "next/link"
import { UserOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const HeaderElements = () => {
  return (
    <Row justify="space-between">
      <div className="logo">AAA</div>
      <Row>
        <Link href="/">
          <div className='headerLink'>
            Feedback
          </div>
        </Link>
        <Link href="/">
          <div className='headerLink'>
            Support
          </div>
        </Link>
        <Dropdown
          menu={{items}}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <div onClick={e => e.preventDefault()}>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </Row>
    </Row>
  )
}

export default HeaderElements;