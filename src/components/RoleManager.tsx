import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  List,
  Input,
  Button,
  Switch,
  Typography,
  Space,
  Divider,
  Tag,
  Alert,
  Badge,
  Modal,
  Form,
  message
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { Role, RolePermission } from '../types';
import { mockRoles } from '../data/roleData';

const { Title, Text } = Typography;
const { TextArea } = Input;

// 角色管理组件
const RoleManager: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles); // 角色数据
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]); // 选中的角色
  const [searchTerm, setSearchTerm] = useState<string>(''); // 搜索关键词
  const [permissionSearch, setPermissionSearch] = useState<string>(''); // 权限搜索
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false); // 创建弹窗显示状态
  const [form] = Form.useForm(); // 表单实例

  // 角色选择处理
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  // 权限切换处理
  const handlePermissionToggle = (
    roleId: string,
    groupId: string,
    permissionId: string,
    enabled: boolean
  ) => {
    setRoles(prevRoles =>
      prevRoles.map(role => {
        if (role.id === roleId) {
          return {
            ...role,
            permissionGroups: role.permissionGroups.map(group => {
              if (group.id === groupId) {
                return {
                  ...group,
                  permissions: group.permissions.map(permission => {
                    if (permission.id === permissionId) {
                      return { ...permission, enabled };
                    }
                    return permission;
                  })
                };
              }
              return group;
            })
          };
        }
        return role;
      })
    );

    // 同时更新选中的角色
    if (selectedRole && selectedRole.id === roleId) {
      setSelectedRole(prev => {
        if (!prev) return null;
        return {
          ...prev,
          permissionGroups: prev.permissionGroups.map(group => {
            if (group.id === groupId) {
              return {
                ...group,
                permissions: group.permissions.map(permission => {
                  if (permission.id === permissionId) {
                    return { ...permission, enabled };
                  }
                  return permission;
                })
              };
            }
            return group;
          })
        };
      });
    }
  };

  // 打开创建角色弹窗
  const handleCreateRole = () => {
    setIsCreateModalVisible(true);
    form.resetFields();
  };

  // 关闭创建角色弹窗
  const handleCancelCreate = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  // 确认创建角色
  const handleConfirmCreate = async () => {
    try {
      const values = await form.validateFields();
      
      // 创建新角色
      const newRole: Role = {
        id: values.roleName.toLowerCase().replace(/\s+/g, '_'),
        name: values.roleName.toLowerCase().replace(/\s+/g, '_'),
        displayName: values.roleName,
        description: values.description || values.remark || '新创建的角色',
        memberCount: 0,
        createdAt: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        permissionGroups: [] // 新角色默认没有权限，可以后续分配
      };

      // 添加到角色列表
      setRoles(prevRoles => [...prevRoles, newRole]);
      
      // 关闭弹窗
      setIsCreateModalVisible(false);
      form.resetFields();
      
      // 显示成功消息
      message.success('角色创建成功！');
      
      // 自动选中新创建的角色
      setSelectedRole(newRole);
      
    } catch (error) {
      console.error('创建角色失败:', error);
    }
  };

  // 过滤角色列表
  const filteredRoles = roles.filter(role =>
    role.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 过滤权限列表
  const getFilteredPermissions = (permissions: RolePermission[]) => {
    if (!permissionSearch) return permissions;
    return permissions.filter(permission =>
      permission.name.toLowerCase().includes(permissionSearch.toLowerCase()) ||
      permission.description.toLowerCase().includes(permissionSearch.toLowerCase())
    );
  };

  // 渲染权限项
  const renderPermissionItem = (permission: RolePermission, roleId: string, groupId: string) => (
    <div key={permission.id} style={{ 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '12px',
      padding: '8px 12px',
      backgroundColor: '#fafafa',
      borderRadius: '4px'
    }}>
      <Switch
        checked={permission.enabled}
        onChange={(checked) => handlePermissionToggle(
          roleId,
          groupId,
          permission.id,
          checked
        )}
        style={{ marginRight: '12px' }}
      />
      <div>
        <Text code style={{ fontSize: '12px' }}>
          {permission.name}
        </Text>
        <div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {permission.description}
          </Text>
        </div>
      </div>
    </div>
  );

  // 渲染Business cooperation模块的子卡片
  const renderBusinessCooperationCards = (group: any, roleId: string) => {
    const cpPermissions = group.permissions.filter((p: RolePermission) => p.id.includes('cp_cooperation'));
    const ipPermissions = group.permissions.filter((p: RolePermission) => p.id.includes('ip_cooperation'));

    return (
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        {/* CP Permissions 卡片 */}
        <Col span={12}>
          <Card 
            size="small" 
            title={<Text strong>CP Permissions</Text>}
            style={{ marginBottom: '16px' }}
          >
            {getFilteredPermissions(cpPermissions).map(permission => 
              renderPermissionItem(permission, roleId, group.id)
            )}
          </Card>
        </Col>
        
        {/* IP Permissions 卡片 */}
        <Col span={12}>
          <Card 
            size="small" 
            title={<Text strong>IP Permissions</Text>}
            style={{ marginBottom: '16px' }}
          >
            {getFilteredPermissions(ipPermissions).map(permission => 
              renderPermissionItem(permission, roleId, group.id)
            )}
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* 顶部警告信息 */}
      <Alert
        message="注意：本页面功能未经过完整测试，线上操作请谨慎。"
        type="warning"
        showIcon
        closable
        style={{ marginBottom: '24px' }}
      />

      {/* 角色和成员信息 */}
      <Row gutter={24} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card size="small">
            <Space>
              <Title level={4} style={{ margin: 0 }}>角色</Title>
              <Badge count={roles.length} />
              <Button 
                type="primary" 
                size="small" 
                icon={<PlusOutlined />}
                onClick={handleCreateRole}
              >
                创建
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small">
            <Space>
              <Title level={4} style={{ margin: 0 }}>members</Title>
              <Text type="secondary">创建于 创建者：Mar 12, 2025</Text>
              <Button size="small" icon={<EditOutlined />}>编辑</Button>
              <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* 左侧角色列表 */}
        <Col span={8}>
          <Card>
            <Input
              placeholder="搜索角色名称"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            
            <List
              dataSource={filteredRoles}
              renderItem={(role) => (
                <List.Item
                  onClick={() => handleRoleSelect(role)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedRole?.id === role.id ? '#e6f7ff' : 'transparent',
                    borderLeft: selectedRole?.id === role.id ? '3px solid #1890ff' : '3px solid transparent',
                    padding: '12px 16px',
                    margin: '4px 0',
                    borderRadius: '4px'
                  }}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <span style={{ fontWeight: 'bold' }}>{role.name}</span>
                        <Tag color="blue">{role.displayName}</Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        创建于：{role.createdAt}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 右侧权限详情 */}
        <Col span={16}>
          <Card>
            {selectedRole ? (
              <>
                <Space style={{ marginBottom: '16px' }}>
                  <Title level={4} style={{ margin: 0 }}>权限</Title>
                  <Badge count={`${selectedRole.permissionGroups.reduce((acc, group) => acc + group.permissions.length, 0)}`} />
                  <Text type="secondary">及用户管理</Text>
                  <Text type="secondary">审计日志</Text>
                </Space>

                <Input
                  placeholder="Search permissions and menu actions"
                  prefix={<SearchOutlined />}
                  value={permissionSearch}
                  onChange={(e) => setPermissionSearch(e.target.value)}
                  style={{ marginBottom: '16px' }}
                />

                <Row gutter={16}>
                  <Col span={12}>
                    <Space>
                      <Button size="small">全选</Button>
                      <Button size="small">取消全选</Button>
                      <Text type="secondary">
                        已选 / 总计：{selectedRole.permissionGroups.reduce((acc, group) => acc + group.permissions.filter(p => p.enabled).length, 0)} / {selectedRole.permissionGroups.reduce((acc, group) => acc + group.permissions.length, 0)}
                      </Text>
                    </Space>
                  </Col>
                </Row>

                <Divider />

                {/* 权限组列表 */}
                {selectedRole.permissionGroups.map(group => (
                  <div key={group.id} style={{ marginBottom: '24px' }}>
                    <Title level={5} style={{ color: '#1890ff', marginBottom: '16px' }}>
                      {group.name}
                    </Title>
                    
                    {/* 特殊处理Business cooperation模块 */}
                    {group.id === 'business_cooperation' ? (
                      <>
                        <div style={{ marginBottom: '16px' }}>
                          <Text strong>{group.name} Actions</Text>
                        </div>
                        {renderBusinessCooperationCards(group, selectedRole.id)}
                      </>
                    ) : (
                      <>
                        {/* A Permissions不显示Actions标题 */}
                        {group.id !== 'a_permissions' && (
                          <div style={{ marginBottom: '16px' }}>
                            <Text strong>{group.name} Actions</Text>
                          </div>
                        )}
                        {getFilteredPermissions(group.permissions).map(permission => 
                          renderPermissionItem(permission, selectedRole.id, group.id)
                        )}
                      </>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Text type="secondary">请选择一个角色查看权限详情</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* 创建角色弹窗 */}
      <Modal
        title="创建 角色"
        open={isCreateModalVisible}
        onCancel={handleCancelCreate}
        footer={[
          <Button key="cancel" onClick={handleCancelCreate}>
            取消
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmCreate}>
            确认
          </Button>
        ]}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <Space>
                <span>角色名称</span>
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
              </Space>
            }
            name="roleName"
            rules={[
              { required: true, message: '请输入角色名称' },
              { max: 50, message: '角色名称不能超过50个字符' }
            ]}
          >
            <Input 
              placeholder="请输入角色名称" 
              maxLength={50}
              showCount={{ formatter: ({ count, maxLength }) => `${count} / ${maxLength}` }}
            />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
            rules={[
              { max: 100, message: '备注不能超过100个字符' }
            ]}
          >
            <Input 
              placeholder="请输入备注" 
              maxLength={100}
              showCount={{ formatter: ({ count, maxLength }) => `${count} / ${maxLength}` }}
            />
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
            rules={[
              { max: 200, message: '描述不能超过200个字符' }
            ]}
          >
            <TextArea
              placeholder="请输入描述"
              maxLength={200}
              rows={4}
              showCount={{ formatter: ({ count, maxLength }) => `${count} / ${maxLength}` }}
            />
          </Form.Item>

          <Alert
            message={
              <div>
                <div><Text strong>注意：</Text></div>
                <div>角色名称不能在创建后修改</div>
                <div>创建角色后，可以在下一步分配权限</div>
                <div>角色变更会影响所有分配给该角色的用户</div>
              </div>
            }
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            style={{ marginTop: '16px' }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManager; 