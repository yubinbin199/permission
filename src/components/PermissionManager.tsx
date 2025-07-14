import React, { useState, useMemo } from 'react';
import {
  Table,
  Switch,
  Input,
  Select,
  Card,
  Avatar,
  Tag,
  Row,
  Col,
  Space,
  Divider,
  Tooltip
} from 'antd';
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Employee, Permission, FilterType } from '../types';
import { mockEmployees, departmentOptions, positionOptions, projectOptions, employeeTypeOptions } from '../data/mockData';

const { Option } = Select;

// 权限管理组件
const PermissionManager: React.FC = () => {
  // 状态管理
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees); // 员工数据
  const [filters, setFilters] = useState<FilterType>({
    name: '',
    position: '',
    department: '',
    project: '',
    roleName: '',
    employeeType: ''
  }); // 过滤器状态

  // 权限列配置，包含悬浮提示说明
  const permissionColumns = [
    { 
      key: 'interviewer', 
      title: '面试官', 
      dataIndex: 'interviewer',
      description: '该角色拥有以下权限：\n• 面试候选人：Schedule Interview\n• 面试评估：Submit Interview Evaluation\n• 查看面试记录：View Interview Records'
    },
    { 
      key: 'employee', 
      title: '普通员工', 
      dataIndex: 'employee',
      description: '该角色拥有以下权限：\n• 基础访问：Basic System Access\n• 个人信息：View Personal Information\n• 工作记录：Submit Work Reports'
    },
    { 
      key: 'departmentLeader', 
      title: '部门领导', 
      dataIndex: 'departmentLeader',
      description: '该角色拥有以下权限：\n• 部门管理：Manage Department Staff\n• 绩效评估：Conduct Performance Reviews\n• 预算管理：Manage Department Budget'
    },
    { 
      key: 'executive', 
      title: '执行权限', 
      dataIndex: 'executive',
      description: '该角色拥有以下权限：\n• 项目执行：Execute Projects\n• 资源调配：Allocate Resources\n• 决策执行：Implement Decisions'
    },
    { 
      key: 'teamLeader', 
      title: '组长', 
      dataIndex: 'teamLeader',
      description: '该角色拥有以下权限：\n• 团队管理：Manage Team Members\n• 任务分配：Assign Tasks\n• 进度监控：Monitor Progress'
    },
    { 
      key: 'officeLeader', 
      title: '办公领导', 
      dataIndex: 'officeLeader',
      description: '该角色拥有以下权限：\n• 办公管理：Manage Office Operations\n• 行政审批：Administrative Approval\n• 政策制定：Policy Development'
    },
    { 
      key: 'labor', 
      title: '劳务', 
      dataIndex: 'labor',
      description: '该角色拥有以下权限：\n• 劳务管理：Manage Labor Services\n• 合同管理：Contract Management\n• 工时记录：Time Tracking'
    },
    { 
      key: 'ceo', 
      title: 'CEO', 
      dataIndex: 'ceo',
      description: '该角色拥有以下权限：\n• 最高决策：Executive Decision Making\n• 公司战略：Strategic Planning\n• 全局管理：Global Management'
    },
    { 
      key: 'hr', 
      title: '人事', 
      dataIndex: 'hr',
      description: '该角色拥有以下权限：\n• 人事管理：Human Resources Management\n• 招聘管理：Recruitment Management\n• 员工档案：Employee Records'
    },
    { 
      key: 'hrLeader', 
      title: '人事领导', 
      dataIndex: 'hrLeader',
      description: '该角色拥有以下权限：\n• 人事决策：HR Decision Making\n• 政策制定：HR Policy Development\n• 薪酬管理：Compensation Management'
    },
    { 
      key: 'globalLabor', 
      title: '全球劳务', 
      dataIndex: 'globalLabor',
      description: '该角色拥有以下权限：\n• 全球劳务：Global Labor Management\n• 跨国合作：International Cooperation\n• 外包管理：Outsourcing Management'
    },
    { 
      key: 'techExpertEvaluator', 
      title: 'Tech Expert Evaluator', 
      dataIndex: 'techExpertEvaluator',
      description: '该角色拥有以下权限：\n• 技术评估：Technical Evaluation\n• 代码审查：Code Review\n• 技术咨询：Technical Consultation'
    },
    { 
      key: 'techExpertResponder', 
      title: 'Tech Expert Responder', 
      dataIndex: 'techExpertResponder',
      description: '该角色拥有以下权限：\n• 技术回复：Technical Response\n• 问题解答：Problem Solving\n• 技术支持：Technical Support'
    },
    { 
      key: 'creativeExpertEvaluator', 
      title: 'Creative Expert Evaluator', 
      dataIndex: 'creativeExpertEvaluator',
      description: '该角色拥有以下权限：\n• 创意评估：Creative Evaluation\n• 设计审查：Design Review\n• 创意咨询：Creative Consultation'
    },
    { 
      key: 'creativeExpertResponder', 
      title: 'Creative Expert Responder', 
      dataIndex: 'creativeExpertResponder',
      description: '该角色拥有以下权限：\n• 创意回复：Creative Response\n• 设计反馈：Design Feedback\n• 创意支持：Creative Support'
    }
  ];

  // 权限开关切换处理函数
  const handlePermissionChange = (
    employeeId: string,
    permissionKey: keyof Permission,
    checked: boolean
  ) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === employeeId
          ? {
              ...employee,
              permissions: {
                ...employee.permissions,
                [permissionKey]: checked
              }
            }
          : employee
      )
    );
  };

  // 过滤器变化处理函数
  const handleFilterChange = (key: keyof FilterType, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 过滤后的员工数据
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // 姓名搜索
      const nameMatch = employee.name.toLowerCase().includes(filters.name.toLowerCase());
      
      // 职位筛选
      const positionMatch = !filters.position || employee.position === filters.position;
      
      // 部门筛选
      const departmentMatch = !filters.department || employee.department === filters.department;
      
      // 项目筛选（这里假设项目信息在角色中）
      const projectMatch = !filters.project || employee.roles.some(role => 
        role.toLowerCase().includes(filters.project.toLowerCase())
      );
      
      // 角色名称搜索
      const roleMatch = !filters.roleName || employee.roles.some(role =>
        role.toLowerCase().includes(filters.roleName.toLowerCase())
      );

      // 员工类型筛选
      const employeeTypeMatch = !filters.employeeType || employee.employeeType === filters.employeeType;

      return nameMatch && positionMatch && departmentMatch && projectMatch && roleMatch && employeeTypeMatch;
    });
  }, [employees, filters]);

  // 表格列配置
  const columns = [
    {
      title: 'Person',
      dataIndex: 'employee',
      key: 'employee',
      width: 200,
      fixed: 'left' as const,
      render: (_: any, record: Employee) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <Space>
              {record.roles.map(role => (
                <Tag key={role} color="blue">
                  {role}
                </Tag>
              ))}
            </Space>
          </div>
        </Space>
      )
    },
    {
      title: 'Information',
      dataIndex: 'information',
      key: 'information',
      width: 120,
      fixed: 'left' as const,
      render: (_: any, record: Employee) => (
        <div>
          <div style={{ marginBottom: '4px' }}>
            {record.employeeType === 'internal' ? '内部员工' : '合作方'}
          </div>
          <div>{record.department}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.position}</div>
        </div>
      )
    },
    // 动态生成权限列，包含悬浮提示
    ...permissionColumns.map(permission => ({
      title: (
        <Tooltip
          title={
            <div style={{ 
              whiteSpace: 'pre-line', 
              fontSize: '13px', 
              lineHeight: '1.5',
              maxWidth: '300px'
            }}>
              {permission.description}
            </div>
          }
          overlayStyle={{
            maxWidth: '350px'
          }}
          overlayInnerStyle={{
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: '#1f2937',
            color: '#ffffff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
        >
          <span style={{ 
            cursor: 'help', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px' 
          }}>
            {permission.title}
            <InfoCircleOutlined 
              style={{ 
                fontSize: '12px', 
                color: '#8b5cf6',
                opacity: 0.7
              }} 
            />
          </span>
        </Tooltip>
      ),
      dataIndex: permission.key,
      key: permission.key,
      width: 120,
      align: 'center' as const,
      render: (_: any, record: Employee) => (
        <Switch
          checked={record.permissions[permission.key as keyof Permission]}
          onChange={(checked) => handlePermissionChange(record.id, permission.key as keyof Permission, checked)}
          size="small"
        />
      )
    }))
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        {/* 过滤器区域 - 所有筛选项放在一行 */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={3}>
            <Select
              placeholder="员工类型"
              value={filters.employeeType || undefined}
              onChange={(value) => handleFilterChange('employeeType', value || '')}
              style={{ width: '100%' }}
              allowClear
            >
              {employeeTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Input
              placeholder="姓名："
              prefix={<SearchOutlined />}
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="搜索角色名称"
              prefix={<SearchOutlined />}
              value={filters.roleName}
              onChange={(e) => handleFilterChange('roleName', e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="职位："
              value={filters.position || undefined}
              onChange={(value) => handleFilterChange('position', value || '')}
              style={{ width: '100%' }}
              allowClear
            >
              {positionOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="部门："
              value={filters.department || undefined}
              onChange={(value) => handleFilterChange('department', value || '')}
              style={{ width: '100%' }}
              allowClear
            >
              {departmentOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="项目："
              value={filters.project || undefined}
              onChange={(value) => handleFilterChange('project', value || '')}
              style={{ width: '100%' }}
              allowClear
            >
              {projectOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Divider />

        {/* 员工权限表格 */}
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
          scroll={{ x: 1800 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default PermissionManager; 