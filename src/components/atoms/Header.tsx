import { Switch, Row, Col, Avatar, Dropdown, Menu } from 'antd';
import { useThemeStore } from '../../store/themeStore';
import { useUserStore } from '../../store/userStore';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const Header = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const setIsDark = useThemeStore((state) => state.setIsDark);
  const isLogin = useUserStore((state) => state.isLogin);
  const logout = useUserStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Row align="middle" justify="end" style={{ marginBottom: 16,marginRight: '30px' }}>
      <Col style={{ marginRight: 'auto' }}>
        <Switch
          checked={isDark}
          onChange={setIsDark}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </Col>
      <Col>
        {isLogin && (
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Avatar
              style={{ backgroundColor: '#222', cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        )}
      </Col>
    </Row>
  );
};

export default Header; 