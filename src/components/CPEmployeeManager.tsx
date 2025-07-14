import React, { useState, useMemo } from 'react';
import {
  Table,
  Input,
  Select,
  Card,
  Avatar,
  Row,
  Col,
  Space,
  Tooltip,
  Button,
  Drawer,
  Form,
  message
} from 'antd';
import { SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CPEmployee, CPEmployeeFilterType } from '../types';
import { mockCPEmployees, gameOptions } from '../data/cpEmployeeData';

const { Option } = Select;

// 账号类型
type AccountType = 'admin' | 'cp-leader' | 'cp';

// 组件属性接口
interface CPEmployeeManagerProps {
  accountType?: AccountType;
  employees?: CPEmployee[]; // 新增：可选的员工数据
  gameOptions?: Array<{ label: string; value: string }>; // 新增：可选的游戏选项
}

// CP员工管理组件
const CPEmployeeManager: React.FC<CPEmployeeManagerProps> = ({ 
  accountType = 'admin',
  employees: initialEmployees = mockCPEmployees, // 使用传入的员工数据，否则默认CP数据
  gameOptions: gameOpts = gameOptions // 使用传入的游戏选项，否则默认CP游戏选项
}) => {
  // 根据账号类型过滤初始数据
  const getFilteredEmployeesByAccount = React.useCallback(() => {
    if (accountType === 'cp') {
      // CP账号只显示一个成员（第一个员工）
      return initialEmployees.slice(0, 1);
    } else if (accountType === 'cp-leader') {
      // CP Leader账号只显示第一个公司的员工
      const firstCompany = initialEmployees.length > 0 ? initialEmployees[0].company : '';
      return initialEmployees.filter(emp => emp.company === firstCompany);
    }
    // admin显示所有成员
    return initialEmployees;
  }, [accountType, initialEmployees]);

  const [employees, setEmployees] = useState<CPEmployee[]>(getFilteredEmployeesByAccount()); // 员工数据状态
  const [editingG123ID, setEditingG123ID] = useState<string | null>(null); // 正在编辑的G123ID行
  const [tempG123ID, setTempG123ID] = useState<string>(''); // 临时编辑值
  const [showAddEmployeeDrawer, setShowAddEmployeeDrawer] = useState(false); // 添加员工抽屉
  const [form] = Form.useForm();
  
  // 筛选状态
  const [filters, setFilters] = useState<CPEmployeeFilterType>({
    name: '',
    romanName: '',
    ctwEmail: '',
    game: '',
    company: '',
    position: '',
    subPosition: '',
    status: '',
    employmentType: ''
  });

  // 当账号类型或初始数据变化时更新员工数据
  React.useEffect(() => {
    setEmployees(getFilteredEmployeesByAccount());
  }, [getFilteredEmployeesByAccount]);

  // 根据筛选条件过滤员工数据
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const employeeValue = employee[key as keyof CPEmployee]?.toString().toLowerCase() || '';
        return employeeValue.includes(value.toLowerCase());
      });
    });
  }, [employees, filters]);

  // 过滤器变化处理函数
  const handleFilterChange = (key: keyof CPEmployeeFilterType, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 开始编辑G123ID
  const startEditG123ID = (id: string, currentValue: string) => {
    setEditingG123ID(id);
    setTempG123ID(currentValue);
  };

  // 保存G123ID编辑
  const saveG123ID = (id: string) => {
    setEmployees((prev: CPEmployee[]) => 
      prev.map((emp: CPEmployee) => 
        emp.id === id ? { ...emp, g123ID: tempG123ID } : emp
      )
    );
    setEditingG123ID(null);
    setTempG123ID('');
  };

  // 取消编辑G123ID
  const cancelEditG123ID = () => {
    setEditingG123ID(null);
    setTempG123ID('');
  };

  // 处理添加员工
  const handleAddEmployee = () => {
    form.validateFields().then(values => {
      const newEmployee: CPEmployee = {
        id: Date.now().toString(),
        employeeNumber: Math.max(...employees.map(emp => emp.employeeNumber)) + 1,
        name: `${values.lastNameChinese}${values.firstNameChinese}`,
        romanName: `${values.lastNameEnglish} ${values.firstNameEnglish}`,
        game: 'vividarmy', // 默认值
        gender: 'male', // 默认值
        phoneNumber: '', // 默认值
        ctwEmail: values.ctwEmail,
        employmentType: 'full_time', // 默认值
        position: '', // 默认值
        subPosition: values.subPosition,
        status: 'active', // 默认值
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        g123ID: '',
        company: '乐谷在线' // 默认值
      };
      
      setEmployees((prev: CPEmployee[]) => [...prev, newEmployee]);
      form.resetFields();
      setShowAddEmployeeDrawer(false);
      message.success('员工添加成功');
    }).catch(error => {
      console.error('表单验证失败:', error);
    });
  };

  // 表格列配置 - 新增所属公司列
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      sorter: (a: CPEmployee, b: CPEmployee) => a.name.localeCompare(b.name),
      render: (_: any, record: CPEmployee) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
          </div>
        </Space>
      )
    },
    {
      title: '姓名罗马字',
      dataIndex: 'romanName',
      key: 'romanName',
      width: 160,
      sorter: (a: CPEmployee, b: CPEmployee) => a.romanName.localeCompare(b.romanName),
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
      width: 120,
      sorter: (a: CPEmployee, b: CPEmployee) => a.game.localeCompare(b.game),
      render: (game: string) => {
        // 根据game值显示对应的标签
        const gameMap: { [key: string]: string } = {
          'vividarmy': 'VividArmy',
          'jay': 'Jay',
          'kumo': 'Kumo',
          'peter': 'Peter',
          'highschool': 'HighSchool',
          'auo': 'AUO'
        };
        return gameMap[game] || game;
      }
    },
    {
      title: 'CTW邮箱地址',
      dataIndex: 'ctwEmail',
      key: 'ctwEmail',
      width: 180,
      sorter: (a: CPEmployee, b: CPEmployee) => a.ctwEmail.localeCompare(b.ctwEmail),
    },
    {
      title: '子职位',
      dataIndex: 'subPosition',
      key: 'subPosition',
      width: 100,
    },
    {
      title: '所属公司',
      dataIndex: 'company',
      key: 'company',
      width: 120,
      sorter: (a: CPEmployee, b: CPEmployee) => a.company.localeCompare(b.company),
    },
    {
      title: 'G123ID',
      dataIndex: 'g123ID',
      key: 'g123ID',
      width: 150,
      render: (_: any, record: CPEmployee) => {
        const isEditing = editingG123ID === record.id;
        
        return (
          <div>
            {isEditing ? (
              <Input
                size="small"
                value={tempG123ID}
                onChange={(e) => setTempG123ID(e.target.value)}
                onPressEnter={() => saveG123ID(record.id)}
                onBlur={() => saveG123ID(record.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    cancelEditG123ID();
                  }
                }}
                autoFocus
                placeholder="输入G123ID"
              />
            ) : (
              <div style={{ minHeight: '24px', display: 'flex', alignItems: 'center' }}>
                {record.g123ID || (
                  <Tooltip title="点击编辑G123ID">
                    <div 
                      style={{ 
                        cursor: 'pointer', 
                        color: '#999', 
                        display: 'flex', 
                        alignItems: 'center',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px dashed #d9d9d9'
                      }}
                      onClick={() => startEditG123ID(record.id, record.g123ID)}
                    >
                      <EditOutlined style={{ marginRight: '4px', fontSize: '12px' }} />
                      点击添加
                    </div>
                  </Tooltip>
                )}
                {record.g123ID && (
                  <Tooltip title="点击编辑G123ID">
                    <div 
                      style={{ cursor: 'pointer' }}
                      onClick={() => startEditG123ID(record.id, record.g123ID)}
                    >
                      {record.g123ID}
                    </div>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        {/* 筛选器区域 */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Input
              placeholder="姓名"
              prefix={<SearchOutlined />}
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </Col>
          
          <Col span={6}>
            <Input
              placeholder="CTW邮箱地址"
              prefix={<SearchOutlined />}
              value={filters.ctwEmail}
              onChange={(e) => handleFilterChange('ctwEmail', e.target.value)}
            />
          </Col>
          
          <Col span={6}>
            <Select
              placeholder="Game"
              style={{ width: '100%' }}
              value={filters.game || undefined}
              onChange={(value) => handleFilterChange('game', value || '')}
              allowClear
            >
              {gameOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          
          <Col span={6}>
            <Select
              placeholder="子职位"
              style={{ width: '100%' }}
              value={filters.subPosition || undefined}
              onChange={(value) => handleFilterChange('subPosition', value || '')}
              allowClear
            >
              <Option value="UI">UI</Option>
              <Option value="banner">banner</Option>
              <Option value="background">background</Option>
            </Select>
          </Col>
        </Row>

        {/* 操作按钮 - 只有admin和cp-leader可以添加员工 */}
        {(accountType === 'admin' || accountType === 'cp-leader') && (
          <Row style={{ marginBottom: '16px' }}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setShowAddEmployeeDrawer(true)}
              >
                添加员工
              </Button>
            </Col>
          </Row>
        )}

        {/* 员工表格 */}
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          scroll={{ x: 1100 }}
          size="middle"
          rowSelection={
            // 只有admin和cp-leader可以选择行
            (accountType === 'admin' || accountType === 'cp-leader') ? {
              type: 'checkbox',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('选中的行:', selectedRowKeys, selectedRows);
              }
            } : undefined
          }
        />
      </Card>

      {/* 添加员工抽屉 - 只有admin和cp-leader可以看到 */}
      {(accountType === 'admin' || accountType === 'cp-leader') && (
        <Drawer
          title="添加员工"
          placement="right"
          width={400}
          onClose={() => setShowAddEmployeeDrawer(false)}
          open={showAddEmployeeDrawer}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setShowAddEmployeeDrawer(false)}>
                  取消
                </Button>
                <Button type="primary" onClick={handleAddEmployee}>
                  确定
                </Button>
              </Space>
            </div>
          }
        >
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="姓(英文)"
              name="lastNameEnglish"
              rules={[{ required: true, message: '请输入姓(英文)' }]}
            >
              <Input placeholder="请输入姓(英文)" />
            </Form.Item>

            <Form.Item
              label="名(英文)"
              name="firstNameEnglish"
              rules={[{ required: true, message: '请输入名(英文)' }]}
            >
              <Input placeholder="请输入名(英文)" />
            </Form.Item>

            <Form.Item
              label="姓(汉字)"
              name="lastNameChinese"
              rules={[{ required: true, message: '请输入姓(汉字)' }]}
            >
              <Input placeholder="请输入姓(汉字)" />
            </Form.Item>

            <Form.Item
              label="名(汉字)"
              name="firstNameChinese"
              rules={[{ required: true, message: '请输入名(汉字)' }]}
            >
              <Input placeholder="请输入名(汉字)" />
            </Form.Item>

            <Form.Item
              label="CTW邮箱地址"
              name="ctwEmail"
              rules={[
                { required: true, message: '请输入CTW邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入CTW邮箱地址" />
            </Form.Item>

            <Form.Item
              label="子职位"
              name="subPosition"
              rules={[{ required: true, message: '请选择子职位' }]}
            >
              <Select placeholder="请选择子职位">
                <Option value="UI">UI</Option>
                <Option value="banner">banner</Option>
                <Option value="background">background</Option>
              </Select>
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </div>
  );
};

export default CPEmployeeManager; 