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
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { CPEmployee, IPEmployeeFilterType } from '../types';
import { mockIPEmployees, ipGameOptions } from '../data/ipEmployeeData';

const { Option } = Select;

// 账号类型
type AccountType = 'admin' | 'ip-leader' | 'ip';

// 组件属性接口
interface IPEmployeeManagerProps {
  accountType?: AccountType;
}

// IP员工管理组件
const IPEmployeeManager: React.FC<IPEmployeeManagerProps> = ({ accountType = 'admin' }) => {
  // 根据账号类型过滤数据
  const getFilteredEmployeesByAccount = React.useCallback(() => {
    if (accountType === 'ip') {
      // IP账号只显示一个成员（第一个员工）
      return mockIPEmployees.slice(0, 1);
    } else if (accountType === 'ip-leader') {
      // IP Leader账号只显示讲谈社的员工
      return mockIPEmployees.filter(emp => emp.company === '讲谈社');
    }
    // admin显示所有成员
    return mockIPEmployees;
  }, [accountType]);

  // 状态管理
  const [employees, setEmployees] = useState<CPEmployee[]>(getFilteredEmployeesByAccount()); // IP员工数据
  const [filters, setFilters] = useState<IPEmployeeFilterType>({
    employeeId: '',
    name: '',
    game: '',
    company: ''
  }); // 过滤器状态
  const [editingG123ID, setEditingG123ID] = useState<string | null>(null); // 正在编辑的G123ID行
  const [tempG123ID, setTempG123ID] = useState<string>(''); // 临时编辑值
  const [showAddEmployeeDrawer, setShowAddEmployeeDrawer] = useState(false); // 添加员工抽屉
  const [form] = Form.useForm(); // 表单实例

  // 当账号类型变化时更新员工数据
  React.useEffect(() => {
    setEmployees(getFilteredEmployeesByAccount());
  }, [getFilteredEmployeesByAccount]);

  // 过滤器变化处理函数
  const handleFilterChange = (key: keyof IPEmployeeFilterType, value: string) => {
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

  // 保存G123ID
  const saveG123ID = (id: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, g123ID: tempG123ID } : emp
    ));
    setEditingG123ID(null);
    setTempG123ID('');
    message.success('G123ID保存成功');
  };

  // 取消编辑G123ID
  const cancelEditG123ID = () => {
    setEditingG123ID(null);
    setTempG123ID('');
  };

  // 添加员工处理
  const handleAddEmployee = () => {
    setShowAddEmployeeDrawer(true);
  };

  // 过滤后的员工数据
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // 编号ID搜索
      const employeeIdMatch = !filters.employeeId || 
        employee.employeeNumber.toString().includes(filters.employeeId);
      
      // 姓名搜索（支持中文名和罗马字名）
      const nameMatch = !filters.name ||
        employee.name.toLowerCase().includes(filters.name.toLowerCase()) ||
        employee.romanName.toLowerCase().includes(filters.name.toLowerCase());
      
      // Game筛选
      const gameMatch = !filters.game || employee.game === filters.game;
      
      // 公司筛选
      const companyMatch = !filters.company || employee.company === filters.company;

      return employeeIdMatch && nameMatch && gameMatch && companyMatch;
    });
  }, [employees, filters]);

  // 表格列配置
  const columns = [
    {
      title: '编号ID',
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
      width: 80,
      sorter: (a: CPEmployee, b: CPEmployee) => a.employeeNumber - b.employeeNumber,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
      render: (_: any, record: CPEmployee) => (
        <Space>
          <Avatar src={record.avatar} size={32} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.romanName}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Game',
      dataIndex: 'game',
      width: 120,
      render: (game: string) => (
        <span style={{ 
          padding: '4px 8px', 
          background: '#f0f0f0', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {game}
        </span>
      ),
    },
    {
      title: '所属公司',
      dataIndex: 'company',
      width: 120,
      render: (company: string) => (
        <span style={{ 
          padding: '2px 6px', 
          background: company === '讲谈社' ? '#e6f7ff' : '#fff7e6',
          color: company === '讲谈社' ? '#1890ff' : '#fa8c16',
          borderRadius: '4px',
          fontSize: '12px',
          border: `1px solid ${company === '讲谈社' ? '#91d5ff' : '#ffd591'}`
        }}>
          {company}
        </span>
      ),
    },
    {
      title: 'G123ID',
      dataIndex: 'g123ID',
      width: 150,
      render: (_: any, record: CPEmployee) => {
        const isEditing = editingG123ID === record.id;
        
        return (
          <div>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '4px' }}>
                <Input
                  size="small"
                  value={tempG123ID}
                  onChange={(e) => setTempG123ID(e.target.value)}
                  onPressEnter={() => saveG123ID(record.id)}
                  style={{ width: '100px' }}
                />
                <Button size="small" type="primary" onClick={() => saveG123ID(record.id)}>
                  保存
                </Button>
                <Button size="small" onClick={cancelEditG123ID}>
                  取消
                </Button>
              </div>
            ) : (
              <div>
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
        {/* 筛选器 */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={4}>
            <Input
              placeholder="编号ID"
              prefix={<SearchOutlined />}
              value={filters.employeeId}
              onChange={(e) => handleFilterChange('employeeId', e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="搜索姓名或罗马字"
              prefix={<SearchOutlined />}
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Game"
              style={{ width: '100%' }}
              value={filters.game || undefined}
              onChange={(value) => handleFilterChange('game', value || '')}
              allowClear
            >
              {ipGameOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="所属公司"
              style={{ width: '100%' }}
              value={filters.company || undefined}
              onChange={(value) => handleFilterChange('company', value || '')}
              allowClear
            >
              <Option value="讲谈社">讲谈社</Option>
              <Option value="KADOKAWA">KADOKAWA</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Space>
              <Tooltip title="添加新的IP员工">
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee}>
                  添加员工
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>

        {/* 员工表格 */}
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
        />
      </Card>

      {/* 添加员工抽屉 */}
      <Drawer
        title="添加IP员工"
        width={600}
        open={showAddEmployeeDrawer}
        onClose={() => setShowAddEmployeeDrawer(false)}
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={() => setShowAddEmployeeDrawer(false)}>取消</Button>
            <Button 
              type="primary" 
              onClick={() => {
                form.validateFields().then(() => {
                  message.success('员工添加成功！');
                  setShowAddEmployeeDrawer(false);
                  form.resetFields();
                });
              }}
            >
              确定
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          
          <Form.Item
            name="romanName"
            label="罗马字姓名"
            rules={[{ required: true, message: '请输入罗马字姓名' }]}
          >
            <Input placeholder="请输入罗马字姓名" />
          </Form.Item>

          <Form.Item
            name="game"
            label="Game"
            rules={[{ required: true, message: '请选择Game' }]}
          >
            <Select placeholder="请选择Game">
              {ipGameOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="company"
            label="所属公司"
            rules={[{ required: true, message: '请选择所属公司' }]}
          >
            <Select placeholder="请选择所属公司">
              <Option value="讲谈社">讲谈社</Option>
              <Option value="KADOKAWA">KADOKAWA</Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default IPEmployeeManager; 