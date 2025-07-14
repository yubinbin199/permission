import { CPEmployee } from '../types';

// 模拟CP员工数据
export const mockCPEmployees: CPEmployee[] = [
  {
    id: '1',
    employeeNumber: 4,
    name: '王明华',
    romanName: 'Wang Minghua',
    game: 'vividarmy',
    gender: 'male',
    phoneNumber: '080-5071-001912',
    ctwEmail: 'vividarmy-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'QA',
    subPosition: 'UI',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    g123ID: '',
    company: '乐谷在线'
  },
  {
    id: '2',
    employeeNumber: 8,
    name: '李雅静',
    romanName: 'Li Yajing',
    game: 'jay',
    gender: 'female',
    phoneNumber: '090-5445-0311',
    ctwEmail: 'jay-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'Designer',
    subPosition: 'banner',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    g123ID: '',
    company: '乐谷在线'
  },
  {
    id: '3',
    employeeNumber: 9,
    name: '张志强',
    romanName: 'Zhang Zhiqiang',
    game: 'kumo',
    gender: 'male',
    phoneNumber: '03-3760-8817',
    ctwEmail: 'kumo-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'Product Manager',
    subPosition: 'background',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    g123ID: '',
    company: '龙猪游戏'
  },
  {
    id: '4',
    employeeNumber: 12,
    name: '陈晓东',
    romanName: 'Chen Xiaodong',
    game: 'peter',
    gender: 'male',
    phoneNumber: '080-1234-5678',
    ctwEmail: 'peter-user1@ctw.inc',
    employmentType: 'part_time',
    position: 'Game Developer',
    subPosition: 'UI',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    g123ID: '',
    company: '龙猪游戏'
  },
  {
    id: '5',
    employeeNumber: 15,
    name: '刘思雨',
    romanName: 'Liu Siyu',
    game: 'highschool',
    gender: 'female',
    phoneNumber: '090-8765-4321',
    ctwEmail: 'highschool-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'Game Artist',
    subPosition: 'banner',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu',
    g123ID: '',
    company: '龙猪游戏'
  },
  {
    id: '6',
    employeeNumber: 18,
    name: '赵建国',
    romanName: 'Zhao Jianguo',
    game: 'auo',
    gender: 'male',
    phoneNumber: '070-1111-2222',
    ctwEmail: 'auo-user1@ctw.inc',
    employmentType: 'contract',
    position: 'Engineer',
    subPosition: 'background',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao',
    g123ID: '',
    company: '乐谷在线'
  },
  {
    id: '7',
    employeeNumber: 21,
    name: '吴美玲',
    romanName: 'Wu Meiling',
    game: 'vividarmy',
    gender: 'female',
    phoneNumber: '080-3333-4444',
    ctwEmail: 'vividarmy-user2@ctw.inc',
    employmentType: 'full_time',
    position: 'QA Tester',
    subPosition: 'UI',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wu',
    g123ID: '',
    company: '乐谷在线'
  },
  {
    id: '8',
    employeeNumber: 25,
    name: '黄文博',
    romanName: 'Huang Wenbo',
    game: 'jay',
    gender: 'male',
    phoneNumber: '090-5555-6666',
    ctwEmail: 'jay-user2@ctw.inc',
    employmentType: 'full_time',
    position: 'Game Designer',
    subPosition: 'banner',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=huang',
    g123ID: '',
    company: '乐谷在线'
  }
];

// Game选项
export const gameOptions = [
  { label: 'VividArmy', value: 'vividarmy' },
  { label: 'Jay', value: 'jay' },
  { label: 'Kumo', value: 'kumo' },
  { label: 'Peter', value: 'peter' },
  { label: 'HighSchool', value: 'highschool' },
  { label: 'AUO', value: 'auo' }
];

// 雇佣类型选项
export const employmentTypeOptions = [
  { label: '全职', value: 'full_time' },
  { label: '兼职', value: 'part_time' },
  { label: '合同工', value: 'contract' },
  { label: '实习生', value: 'intern' }
];

// 状态选项
export const statusOptions = [
  { label: '在职', value: 'active' },
  { label: '离职', value: 'inactive' },
  { label: '休假', value: 'on_leave' }
]; 