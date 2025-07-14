import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  DownOutlined,
  SwapOutlined
} from '@ant-design/icons';
import PermissionManager from './components/PermissionManager';
import RoleManager from './components/RoleManager';
import CPEmployeeManager from './components/CPEmployeeManager';
import CPSettings from './components/CPSettings';
import IPEmployeeManager from './components/IPEmployeeManager';
import IPSettings from './components/IPSettings';
import InternalEmployeeManager from './components/InternalEmployeeManager';
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;

// 账号类型
type AccountType = 'admin' | 'cp-leader' | 'cp' | 'ip-leader' | 'ip';

// 主应用组件
const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('permission'); // 当前选中的菜单
  const [accountType, setAccountType] = useState<AccountType>('admin'); // 当前账号类型

  // 账号信息
  const accountInfo = {
    admin: { email: 'yu.bin@ctw.inc', name: '管理员' },
    'cp-leader': { email: 'cp.leader@ctw.inc', name: 'CP Leader' },
    cp: { email: 'cp.user@ctw.inc', name: 'CP' },
    'ip-leader': { email: 'ip.leader@ctw.inc', name: 'IP Leader' },
    ip: { email: 'ip.user@ctw.inc', name: 'IP' }
  };

  // 菜单点击处理
  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  // 账号切换处理
  const handleAccountSwitch = (type: AccountType) => {
    setAccountType(type);
    // 根据账号类型设置默认页面
    if (type === 'cp-leader' || type === 'cp') {
      setSelectedKey('cp');
    } else if (type === 'ip-leader' || type === 'ip') {
      setSelectedKey('ip');
    } else {
      setSelectedKey('permission');
    }
  };

  // 根据选中的菜单渲染不同的页面
  const renderContent = () => {
    switch (selectedKey) {
      case 'employee':
        return <InternalEmployeeManager />;
      case 'permission':
        return <PermissionManager />;
      case 'role':
        return <RoleManager />;
      case 'cp':
        return <CPEmployeeManager accountType={accountType as 'admin' | 'cp-leader' | 'cp'} />;
      case 'ip':
        return <IPEmployeeManager accountType={accountType as 'admin' | 'ip-leader' | 'ip'} />;
      case 'cp-settings':
        return <CPSettings accountType={accountType as 'admin' | 'cp-leader' | 'cp'} />;
      case 'ip-settings':
        return <IPSettings accountType={accountType as 'admin' | 'ip-leader' | 'ip'} />;
      default:
        return <PermissionManager />;
    }
  };

  // 获取当前页面标题
  const getCurrentTitle = () => {
    switch (selectedKey) {
      case 'employee':
        return '内部员工管理';
      case 'permission':
        return '权限管理';
      case 'role':
        return '角色管理';
      case 'cp':
        return 'CP员工管理';
      case 'ip':
        return 'IP员工管理';
      case 'cp-settings':
        return 'CP设置';
      case 'ip-settings':
        return 'IP设置';
      default:
        return '权限管理';
    }
  };

  // 根据账号类型获取菜单项
  const getMenuItems = () => {
    // 管理员：显示所有菜单
    if (accountType === 'admin') {
      return [
        {
          key: 'employee',
          icon: <UserOutlined />,
          label: '内部员工'
        },
        {
          key: 'partner',
          icon: <UsergroupAddOutlined />,
          label: '合作方',
          children: [
            {
              key: 'cp',
              label: 'CP'
            },
            {
              key: 'ip',
              label: 'IP'
            }
          ]
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '设置',
          children: [
            {
              key: 'permission',
              label: '权限管理'
            },
            {
              key: 'role',
              label: '角色管理'
            },
            {
              key: 'cp-settings',
              label: 'CP设置'
            },
            {
              key: 'ip-settings',
              label: 'IP设置'
            }
          ]
        }
      ];
    }

    // CP Leader：显示合作方CP和CP设置
    if (accountType === 'cp-leader') {
      return [
        {
          key: 'partner',
          icon: <UsergroupAddOutlined />,
          label: '合作方',
          children: [
            {
              key: 'cp',
              label: 'CP'
            }
          ]
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '设置',
          children: [
            {
              key: 'cp-settings',
              label: 'CP设置'
            }
          ]
        }
      ];
    }

    // CP：只显示合作方CP
    if (accountType === 'cp') {
      return [
        {
          key: 'partner',
          icon: <UsergroupAddOutlined />,
          label: '合作方',
          children: [
            {
              key: 'cp',
              label: 'CP'
            }
          ]
        }
      ];
    }

    // IP Leader：显示合作方IP和IP设置
    if (accountType === 'ip-leader') {
      return [
        {
          key: 'partner',
          icon: <UsergroupAddOutlined />,
          label: '合作方',
          children: [
            {
              key: 'ip',
              label: 'IP'
            }
          ]
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '设置',
          children: [
            {
              key: 'ip-settings',
              label: 'IP设置'
            }
          ]
        }
      ];
    }

    // IP：只显示合作方IP
    if (accountType === 'ip') {
      return [
        {
          key: 'partner',
          icon: <UsergroupAddOutlined />,
          label: '合作方',
          children: [
            {
              key: 'ip',
              label: 'IP'
            }
          ]
        }
      ];
    }

    return [];
  };

  // 账号切换下拉菜单
  const accountMenuItems = [
    {
      key: 'admin',
      icon: <UserOutlined />,
      label: '管理员账号',
      onClick: () => handleAccountSwitch('admin')
    },
    {
      key: 'cp-leader',
      icon: <SwapOutlined />,
      label: 'CP Leader',
      onClick: () => handleAccountSwitch('cp-leader')
    },
    {
      key: 'cp',
      icon: <SwapOutlined />,
      label: 'CP',
      onClick: () => handleAccountSwitch('cp')
    },
    {
      key: 'ip-leader',
      icon: <SwapOutlined />,
      label: 'IP Leader',
      onClick: () => handleAccountSwitch('ip-leader')
    },
    {
      key: 'ip',
      icon: <SwapOutlined />,
      label: 'IP',
      onClick: () => handleAccountSwitch('ip')
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧导航栏 */}
      <Sider
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {/* Logo 区域 */}
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#001529',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          📊 P System
        </div>
        
        {/* 导航菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={getMenuItems()}
        />
      </Sider>

      {/* 右侧内容区域 */}
      <Layout style={{ marginLeft: 200 }}>
        {/* 顶部导航栏 */}
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {getCurrentTitle()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '16px' }}>内/月</span>
            <Dropdown
              menu={{ items: accountMenuItems }}
              trigger={['hover']}
              placement="bottomRight"
            >
              <div style={{ cursor: 'pointer', color: '#1890ff' }}>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  {accountInfo[accountType].email}
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 主内容区域 */}
        <Content style={{ overflow: 'auto' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App; 