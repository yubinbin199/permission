import React, { useState, useMemo } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Input,
  Select,
  DatePicker,
  Table,
  Avatar,
  Space,
  Button,
  Typography
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { InternalEmployee, InternalEmployeeFilterType } from '../types';
import { 
  mockInternalEmployees,
  regionOptions,
  internalDepartmentOptions,
  levelOptions,
  internalPositionOptions,
  internalEmploymentTypeOptions,
  genderOptions,
  employmentStatusOptions
} from '../data/internalEmployeeData';

const { Option } = Select;
const { Title } = Typography;

// 内部员工管理组件
const InternalEmployeeManager: React.FC = () => {
  const [employees] = useState<InternalEmployee[]>(mockInternalEmployees);
  const [filters, setFilters] = useState<InternalEmployeeFilterType>({
    name: '',
    region: '',
    department: '',
    level: '',
    position: '',
    minSalary: '',
    maxSalary: '',
    startDate: '',
    endDate: '',
    employmentType: '',
    gender: '',
    employmentStatus: '',
    ctwEmail: ''
  });

  // 过滤器变化处理函数
  const handleFilterChange = (key: keyof InternalEmployeeFilterType, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 过滤后的员工数据
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // 姓名搜索
      const nameMatch = !filters.name || 
        employee.name.toLowerCase().includes(filters.name.toLowerCase()) ||
        employee.romanName.toLowerCase().includes(filters.name.toLowerCase());
      
      // 地区筛选
      const regionMatch = !filters.region || employee.region === filters.region;
      
      // 部门筛选
      const departmentMatch = !filters.department || employee.department === filters.department;
      
      // 级别筛选
      const levelMatch = !filters.level || employee.level === filters.level;
      
      // 职位筛选
      const positionMatch = !filters.position || employee.position === filters.position;
      
      // 薪资筛选
      const minSalaryMatch = !filters.minSalary || employee.minSalary >= parseInt(filters.minSalary);
      const maxSalaryMatch = !filters.maxSalary || employee.maxSalary <= parseInt(filters.maxSalary);
      
      // 雇佣类型筛选
      const employmentTypeMatch = !filters.employmentType || employee.employmentType === filters.employmentType;
      
      // 性别筛选
      const genderMatch = !filters.gender || employee.gender === filters.gender;
      
      // 雇佣状态筛选
      const employmentStatusMatch = !filters.employmentStatus || employee.employmentStatus === filters.employmentStatus;
      
      // CTW邮箱搜索
      const emailMatch = !filters.ctwEmail || 
        employee.ctwEmail.toLowerCase().includes(filters.ctwEmail.toLowerCase());

      return nameMatch && regionMatch && departmentMatch && levelMatch && 
             positionMatch && minSalaryMatch && maxSalaryMatch && 
             employmentTypeMatch && genderMatch && employmentStatusMatch && emailMatch;
    });
  }, [employees, filters]);

  // 计算统计数据
  const totalEmployees = employees.length;
  const totalCost = employees.reduce((sum, emp) => sum + emp.maxSalary, 0);
  const pendingApproval = 0; // 模拟数据
  const salaryChanges = 0; // 模拟数据

  // 表格列配置
  const columns = [
    {
      title: '员工编号',
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
      width: 100,
      sorter: (a: InternalEmployee, b: InternalEmployee) => a.employeeNumber - b.employeeNumber,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (_: any, record: InternalEmployee) => (
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
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 100,
      render: (department: string) => {
        const deptMap: { [key: string]: string } = {
          'tech': '技术部',
          'design': '设计部',
          'operation': '运营部',
          'product': '产品部',
          'hr': '人事部',
          'finance': '财务部'
        };
        return deptMap[department] || department;
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender: string) => gender === 'male' ? '男' : '女',
    },
    {
      title: '电话号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 140,
    },
    {
      title: 'CTW邮箱地址',
      dataIndex: 'ctwEmail',
      key: 'ctwEmail',
      width: 200,
    },
    {
      title: '雇佣类型',
      dataIndex: 'employmentType',
      key: 'employmentType',
      width: 100,
      render: (type: string) => {
        const typeMap: { [key: string]: string } = {
          'full_time': '全职',
          'part_time': '兼职',
          'contract': '合同工',
          'intern': '实习生'
        };
        return typeMap[type] || type;
      },
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* 页面标题 */}
      <Title level={2} style={{ marginBottom: '24px', color: '#333' }}>
        员工列表
      </Title>

      {/* 顶部统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总员工数"
              value={totalEmployees}
              suffix={
                <Button 
                  type="link" 
                  size="small" 
                  style={{ color: '#1890ff', fontSize: '14px' }}
                >
                  添加
                </Button>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总员工成本"
              value={totalCost.toLocaleString()}
              suffix="円/月"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="工资待审批"
              value={pendingApproval}
              suffix={
                <Button 
                  type="link" 
                  size="small" 
                  style={{ color: '#1890ff', fontSize: '14px' }}
                >
                  详情 {'>'}
                </Button>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="工资变更"
              value={salaryChanges}
              suffix={
                <Button 
                  type="link" 
                  size="small" 
                  style={{ color: '#1890ff', fontSize: '14px' }}
                >
                  详情 {'>'}
                </Button>
              }
            />
          </Card>
        </Col>
      </Row>

      <Card>
        {/* 第一行筛选器 */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={4}>
            <Input
              placeholder="姓名"
              prefix={<SearchOutlined />}
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </Col>
          <Col span={3}>
            <Select
              placeholder="地区"
              style={{ width: '100%' }}
              value={filters.region || undefined}
              onChange={(value) => handleFilterChange('region', value || '')}
              allowClear
            >
              {regionOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3}>
            <Select
              placeholder="部门"
              style={{ width: '100%' }}
              value={filters.department || undefined}
              onChange={(value) => handleFilterChange('department', value || '')}
              allowClear
            >
              {internalDepartmentOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3}>
            <Select
              placeholder="级别"
              style={{ width: '100%' }}
              value={filters.level || undefined}
              onChange={(value) => handleFilterChange('level', value || '')}
              allowClear
            >
              {levelOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3}>
            <Select
              placeholder="职位"
              style={{ width: '100%' }}
              value={filters.position || undefined}
              onChange={(value) => handleFilterChange('position', value || '')}
              allowClear
            >
              {internalPositionOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2}>
            <Input
              placeholder="最小月薪"
              value={filters.minSalary}
              onChange={(e) => handleFilterChange('minSalary', e.target.value)}
            />
          </Col>
          <Col span={2}>
            <Input
              placeholder="最大月薪"
              value={filters.maxSalary}
              onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
            />
          </Col>
          <Col span={3}>
            <Button 
              style={{ width: '100%' }}
              icon={<SearchOutlined />}
            >
              过滤器
            </Button>
          </Col>
          <Col span={1}>
            <Button 
              type="primary"
              style={{ width: '100%' }}
              onClick={() => {
                // 编辑列功能
              }}
            >
              编辑列
            </Button>
          </Col>
        </Row>

        {/* 第二行筛选器 */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={3}>
            <DatePicker 
              placeholder="开始日期"
              style={{ width: '100%' }}
              onChange={(date, dateString) => handleFilterChange('startDate', dateString as string)}
            />
          </Col>
          <Col span={3}>
            <DatePicker 
              placeholder="结束日期"
              style={{ width: '100%' }}
              onChange={(date, dateString) => handleFilterChange('endDate', dateString as string)}
            />
          </Col>
          <Col span={3}>
            <Select
              placeholder="雇佣类型"
              style={{ width: '100%' }}
              value={filters.employmentType || undefined}
              onChange={(value) => handleFilterChange('employmentType', value || '')}
              allowClear
            >
              {internalEmploymentTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3}>
            <Select
              placeholder="性别"
              style={{ width: '100%' }}
              value={filters.gender || undefined}
              onChange={(value) => handleFilterChange('gender', value || '')}
              allowClear
            >
              {genderOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3}>
            <Select
              placeholder="雇佣状态"
              style={{ width: '100%' }}
              value={filters.employmentStatus || undefined}
              onChange={(value) => handleFilterChange('employmentStatus', value || '')}
              allowClear
            >
              {employmentStatusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Input
              placeholder="CTW邮箱地址"
              prefix={<SearchOutlined />}
              value={filters.ctwEmail}
              onChange={(e) => handleFilterChange('ctwEmail', e.target.value)}
            />
          </Col>
        </Row>

        {/* 员工表格 */}
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            defaultPageSize: 20,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default InternalEmployeeManager; 