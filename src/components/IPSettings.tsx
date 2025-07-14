import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Tag,
  Modal,
  Input,
  Table,
  message,
  Select
} from 'antd';
import { 
  PlusOutlined, 
  SettingOutlined,
  SearchOutlined,
  DeleteOutlined 
} from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

// 账号类型
type AccountType = 'admin' | 'ip-leader' | 'ip';

// 组件属性接口
interface IPSettingsProps {
  accountType?: AccountType;
}

// IP设置组件
const IPSettings: React.FC<IPSettingsProps> = ({ accountType = 'admin' }) => {
  const [activeCategory, setActiveCategory] = useState('kodansha'); // 当前选中的分类
  const [showManagerModal, setShowManagerModal] = useState(false); // 设置主管弹窗
  const [showAddGameModal, setShowAddGameModal] = useState(false); // 添加Game弹窗
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false); // 添加公司弹窗
  const [selectedGame, setSelectedGame] = useState<string | null>(null); // 选中的游戏ID
  const [newGameName, setNewGameName] = useState(''); // 新游戏名称
  const [newCompanyName, setNewCompanyName] = useState(''); // 新公司名称
  const [selectedManager, setSelectedManager] = useState(''); // 选中的负责人
  const [managerSearchTerm, setManagerSearchTerm] = useState(''); // 主管搜索词

  // 根据账号类型获取可用分类
  const getAvailableCategories = () => {
    if (accountType === 'ip-leader') {
      // IP Leader只能看到讲谈社
      return [{ key: 'kodansha', label: '讲谈社' }];
    }
    // admin和ip显示所有分类
    return [
      { key: 'kodansha', label: '讲谈社' },
      { key: 'kadokawa', label: 'KADOKAWA' }
    ];
  };

  const categories = getAvailableCategories();

  // 人员数据 - 按公司分组
  const allTeamMembers = {
    kodansha: [
      {
        id: '1',
        name: '田中太郎',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
        role: '负责人',
        company: '讲谈社'
      }
    ],
    kadokawa: [
      {
        id: '2',
        name: '佐藤花子',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
        role: '负责人',
        company: 'KADOKAWA'
      }
    ]
  };

  // 设置主管候选人员数据
  const managerCandidates = [
    { id: '1', name: '田中太郎', subPosition: 'UI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka' },
    { id: '2', name: '佐藤花子', subPosition: 'planning', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato' },
    { id: '3', name: '鈴木一郎', subPosition: 'development', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki' },
    { id: '4', name: '高橋美穂', subPosition: 'design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi' },
    { id: '5', name: '山田健二', subPosition: 'marketing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada' }
  ];

  // 负责人候选人数据
  const leaderCandidates = [
    { id: '1', name: '田中太郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka' },
    { id: '2', name: '佐藤花子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato' },
    { id: '3', name: '鈴木一郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki' },
    { id: '4', name: '高橋美穂', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi' }
  ];

  // 获取当前分类的人员
  const getCurrentTeamMembers = () => {
    return allTeamMembers[activeCategory as keyof typeof allTeamMembers] || [];
  };

  // 根据账号类型过滤游戏数据
  const getFilteredGames = () => {
    const allGames = [
      {
        id: '1',
        name: 'neigima',
        memberCount: 85,
        manager: { id: '1', name: '田中太郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka' },
        members: [
          { id: '1', name: '田中太郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka' },
          { id: '2', name: '山田花子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada2' },
          { id: '3', name: '佐々木次郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sasaki' }
        ],
        company: '讲谈社'
      },
      {
        id: '2',
        name: 'highschool',
        memberCount: 120,
        manager: { id: '4', name: '高橋美穂', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi' },
        members: [
          { id: '1', name: '高橋美穂', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi' },
          { id: '2', name: '小林三郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kobayashi' },
          { id: '3', name: '中村美咲', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nakamura' }
        ],
        company: '讲谈社'
      },
      {
        id: '3',
        name: 'slime',
        memberCount: 95,
        manager: { id: '2', name: '佐藤花子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato' },
        members: [
          { id: '1', name: '佐藤花子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato' },
          { id: '2', name: '渡辺四郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watanabe' },
          { id: '3', name: '伊藤五子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ito' }
        ],
        company: 'KADOKAWA'
      }
    ];

    if (accountType === 'ip-leader') {
      // IP Leader只显示讲谈社的游戏
      return allGames.filter(game => game.company === '讲谈社');
    }
    // admin和ip显示所有游戏
    return allGames;
  };

  const games = getFilteredGames();

  // 过滤主管候选人
  const filteredCandidates = managerCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(managerSearchTerm.toLowerCase())
  );

  // 设置主管弹窗的表格列
  const managerColumns = [
    {
      title: '',
      dataIndex: 'selected',
      width: 50,
      render: (_: any, record: any) => (
        <input type="checkbox" />
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <span>{record.name}</span>
        </Space>
      )
    },
    {
      title: '子职位',
      dataIndex: 'subPosition',
      render: (subPosition: string) => subPosition || '-'
    }
  ];

  // 处理设置主管
  const handleSetManager = () => {
    message.success('主管设置成功');
    setShowManagerModal(false);
  };

  // 处理添加Game
  const handleAddGame = () => {
    if (!newGameName.trim()) {
      message.error('请输入Game名称');
      return;
    }
    message.success(`Game "${newGameName}" 添加成功`);
    setNewGameName('');
    setShowAddGameModal(false);
  };

  // 处理添加公司
  const handleAddCompany = () => {
    if (!newCompanyName.trim()) {
      message.error('请输入公司名称');
      return;
    }
    if (!selectedManager) {
      message.error('请选择负责人');
      return;
    }
    message.success(`公司 "${newCompanyName}" 添加成功`);
    setNewCompanyName('');
    setSelectedManager('');
    setShowAddCompanyModal(false);
  };

  // 处理删除成员
  const handleDeleteMember = (gameId: string, memberId: string) => {
    message.success('成员删除成功');
  };

  // 渲染分类标签
  const renderCategoryTabs = () => (
    <div style={{ marginBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 16px 0' }}>
        <Space size="large">
          {categories.map(category => (
            <div
              key={category.key}
              style={{
                padding: '8px 0',
                borderBottom: activeCategory === category.key ? '2px solid #1890ff' : '2px solid transparent',
                cursor: accountType === 'ip-leader' ? 'default' : 'pointer',
                color: activeCategory === category.key ? '#1890ff' : '#666',
                fontWeight: activeCategory === category.key ? 'bold' : 'normal'
              }}
              onClick={() => {
                // IP Leader不能切换分类
                if (accountType !== 'ip-leader') {
                  setActiveCategory(category.key);
                }
              }}
            >
              {category.label}
            </div>
          ))}
        </Space>
        
        {/* 添加公司按钮 - 只有admin可以看到 */}
        {accountType === 'admin' && (
          <Button 
            icon={<PlusOutlined />}
            onClick={() => setShowAddCompanyModal(true)}
          >
            添加公司
          </Button>
        )}
      </div>
    </div>
  );

  // 渲染游戏详情
  const renderGameDetails = (game: any) => (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Text strong>成员列表：</Text>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {game.members.map((member: any) => (
          <div key={member.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '8px 12px',
            border: '1px solid #f0f0f0',
            borderRadius: '6px',
            background: '#fafafa'
          }}>
            <Avatar src={member.avatar} size={24} style={{ marginRight: '8px' }} />
            <span style={{ marginRight: '8px' }}>{member.name}</span>
            <Button 
              type="text" 
              size="small" 
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteMember(game.id, member.id)}
              style={{ color: '#ff4d4f' }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div>
          {/* 分类标签 */}
          {renderCategoryTabs()}
          
          {/* 成员列表 - 根据选中分类显示 */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            {getCurrentTeamMembers().map(member => (
              <Col key={member.id} span={6}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  padding: '16px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  background: '#fff'
                }}>
                  <Avatar src={member.avatar} size={64} style={{ marginBottom: '8px' }} />
                  <Text strong style={{ marginBottom: '4px' }}>{member.name}</Text>
                  {member.role && (
                    <Tag color="blue" style={{ marginBottom: '4px' }}>{member.role}</Tag>
                  )}
                  <Text type="secondary" style={{ fontSize: '12px' }}>{member.company}</Text>
                </div>
              </Col>
            ))}
          </Row>

          {/* 操作按钮 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
            <Space>
              <Button 
                icon={<SettingOutlined />}
                onClick={() => setShowManagerModal(true)}
              >
                设置主管
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setShowAddGameModal(true)}
              >
                添加Game
              </Button>
            </Space>
          </div>

          {/* Game列表 */}
          <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ 
              display: 'flex', 
              padding: '16px 24px', 
              background: '#fafafa', 
              borderBottom: '1px solid #f0f0f0',
              fontWeight: 'bold'
            }}>
              <div style={{ flex: 1 }}>Game</div>
              <div style={{ width: '200px' }}>管理员</div>
              <div style={{ width: '150px' }}>成员</div>
              <div style={{ width: '80px' }}>操作</div>
            </div>
            
            {games.map(game => (
              <div key={game.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '16px 24px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{game.name}</div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{game.memberCount} 成员</Text>
                  </div>
                  <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={game.manager.avatar} size="small" style={{ marginRight: '8px' }} />
                    <span>{game.manager.name}</span>
                  </div>
                  <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
                    <Avatar.Group maxCount={4} size="small">
                      {game.members.slice(0, 4).map(member => (
                        <Avatar key={member.id} src={member.avatar} size="small" />
                      ))}
                      {game.members.length > 4 && (
                        <Avatar size="small" style={{ backgroundColor: '#f56a00' }}>
                          +{game.members.length - 4}
                        </Avatar>
                      )}
                    </Avatar.Group>
                  </div>
                  <div style={{ width: '80px', display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<DeleteOutlined />} 
                      style={{ color: '#ff4d4f' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        message.success('Game删除成功');
                      }}
                    />
                  </div>
                </div>
                
                {selectedGame === game.id && renderGameDetails(game)}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 设置主管弹窗 */}
      <Modal
        title="设置主管"
        open={showManagerModal}
        onCancel={() => setShowManagerModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowManagerModal(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleSetManager}>
            提交
          </Button>
        ]}
        width={800}
      >
        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="姓名"
            prefix={<SearchOutlined />}
            value={managerSearchTerm}
            onChange={(e) => setManagerSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
        <Table
          columns={managerColumns}
          dataSource={filteredCandidates}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Modal>

      {/* 添加Game弹窗 */}
      <Modal
        title="添加Game"
        open={showAddGameModal}
        onCancel={() => setShowAddGameModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddGameModal(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddGame}>
            确定
          </Button>
        ]}
        width={500}
      >
        <div style={{ marginBottom: '16px' }}>
          <Text>Game名：</Text>
        </div>
        <Input
          placeholder="请输入Game名称"
          value={newGameName}
          onChange={(e) => setNewGameName(e.target.value)}
        />
        <div style={{ marginTop: '16px' }}>
          <Text>管理员：</Text>
          <div style={{ 
            marginTop: '8px', 
            border: '1px dashed #d9d9d9', 
            borderRadius: '4px', 
            padding: '40px', 
            textAlign: 'center',
            color: '#999'
          }}>
            <PlusOutlined style={{ fontSize: '24px' }} />
          </div>
        </div>
      </Modal>

      {/* 添加公司弹窗 - 只有admin可以看到 */}
      {accountType === 'admin' && (
        <Modal
          title="添加公司"
          open={showAddCompanyModal}
          onCancel={() => setShowAddCompanyModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setShowAddCompanyModal(false)}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={handleAddCompany}>
              确定
            </Button>
          ]}
          width={500}
        >
          <div style={{ marginBottom: '16px' }}>
            <Text>公司名称：</Text>
          </div>
          <Input
            placeholder="请输入公司名称"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <div style={{ marginBottom: '16px' }}>
            <Text>选择负责人：</Text>
          </div>
          <Select
            placeholder="请选择负责人"
            style={{ width: '100%' }}
            value={selectedManager}
            onChange={setSelectedManager}
          >
            {leaderCandidates.map(leader => (
              <Option key={leader.id} value={leader.id}>
                <Space>
                  <Avatar src={leader.avatar} size={20} />
                  {leader.name}
                </Space>
              </Option>
            ))}
          </Select>
        </Modal>
      )}
    </div>
  );
};

export default IPSettings; 