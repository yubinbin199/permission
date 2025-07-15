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
    employeeId: '',
    name: '',
    romanName: '',
    game: '',
    company: '',
    subPosition: ''
  });

  // 当账号类型或初始数据变化时更新员工数据
  React.useEffect(() => {
    setEmployees(getFilteredEmployeesByAccount());
  }, [getFilteredEmployeesByAccount]);

  // 根据筛选条件过滤员工数据
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // 编号ID搜索
      const employeeIdMatch = !filters.employeeId || 
        employee.employeeNumber.toString().includes(filters.employeeId);
      
      // 姓名搜索（支持中文名和罗马字名）
      const nameMatch = !filters.name || 
        employee.name.toLowerCase().includes(filters.name.toLowerCase()) ||
        employee.romanName.toLowerCase().includes(filters.name.toLowerCase());
      
      // 罗马字姓名搜索
      const romanNameMatch = !filters.romanName || 
        employee.romanName.toLowerCase().includes(filters.romanName.toLowerCase());
      
      // Game筛选
      const gameMatch = !filters.game || employee.game === filters.game;
      
      // 公司筛选
      const companyMatch = !filters.company || employee.company === filters.company;
      
      // 子职位筛选
      const subPositionMatch = !filters.subPosition || employee.subPosition === filters.subPosition;

      return employeeIdMatch && nameMatch && romanNameMatch && gameMatch && 
             companyMatch && subPositionMatch;
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
      key: 'name',
      width: 200,
      render: (_: any, record: CPEmployee) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.romanName}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '姓名罗马字',
      dataIndex: 'romanName',
      key: 'romanName',
      width: 160,
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
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
        {/* 筛选器区域 */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={4}>
            <Input
              placeholder="编号ID"
              prefix={<SearchOutlined />}
              value={filters.employeeId}
              onChange={(e) => handleFilterChange('employeeId', e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="姓名"
              prefix={<SearchOutlined />}
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="罗马字姓名"
              prefix={<SearchOutlined />}
              value={filters.romanName}
              onChange={(e) => handleFilterChange('romanName', e.target.value)}
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
              {gameOpts.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="公司"
              style={{ width: '100%' }}
              value={filters.company || undefined}
              onChange={(value) => handleFilterChange('company', value || '')}
              allowClear
            >
              <Option value="CyberAgent">CyberAgent</Option>
              <Option value="DeNA">DeNA</Option>
            </Select>
          </Col>
          <Col span={4}>
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
          scroll={{ x: 1000 }}
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

      {/* 添加员工抽屉保持不变 */}
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