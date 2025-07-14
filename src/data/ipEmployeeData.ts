import { CPEmployee } from '../types';

// 模拟IP员工数据
export const mockIPEmployees: CPEmployee[] = [
  {
    id: '1',
    employeeNumber: 101,
    name: '田中太郎',
    romanName: 'Tanaka Taro',
    game: 'negima',
    gender: 'male',
    phoneNumber: '03-5555-0001',
    ctwEmail: 'negima-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'Game Designer',
    subPosition: 'character',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
    g123ID: 'TT001',
    company: '讲谈社'
  },
  {
    id: '2',
    employeeNumber: 102,
    name: '佐藤花子',
    romanName: 'Sato Hanako',
    game: 'slime',
    gender: 'female',
    phoneNumber: '03-5555-0002',
    ctwEmail: 'slime-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'Art Director',
    subPosition: 'illustration',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
    g123ID: 'SH002',
    company: 'KADOKAWA'
  },
  {
    id: '3',
    employeeNumber: 103,
    name: '鈴木一郎',
    romanName: 'Suzuki Ichiro',
    game: 'highschool',
    gender: 'male',
    phoneNumber: '03-5555-0003',
    ctwEmail: 'highschool-user1@ctw.inc',
    employmentType: 'full_time',
    position: 'Producer',
    subPosition: 'management',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
    g123ID: 'SI003',
    company: '讲谈社'
  },
  {
    id: '4',
    employeeNumber: 104,
    name: '高橋美穂',
    romanName: 'Takahashi Miho',
    game: 'negima',
    gender: 'female',
    phoneNumber: '03-5555-0004',
    ctwEmail: 'negima-user2@ctw.inc',
    employmentType: 'part_time',
    position: 'Programmer',
    subPosition: 'UI',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi',
    g123ID: 'TM004',
    company: '讲谈社'
  },
  {
    id: '5',
    employeeNumber: 105,
    name: '山田健二',
    romanName: 'Yamada Kenji',
    game: 'slime',
    gender: 'male',
    phoneNumber: '03-5555-0005',
    ctwEmail: 'slime-user2@ctw.inc',
    employmentType: 'contract',
    position: 'QA Engineer',
    subPosition: 'testing',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada',
    g123ID: 'YK005',
    company: 'KADOKAWA'
  },
  {
    id: '6',
    employeeNumber: 106,
    name: '小林三郎',
    romanName: 'Kobayashi Saburo',
    game: 'highschool',
    gender: 'male',
    phoneNumber: '03-5555-0006',
    ctwEmail: 'highschool-user2@ctw.inc',
    employmentType: 'full_time',
    position: 'Sound Designer',
    subPosition: 'audio',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kobayashi',
    g123ID: 'KS006',
    company: '讲谈社'
  },
  {
    id: '7',
    employeeNumber: 107,
    name: '中村美咲',
    romanName: 'Nakamura Misaki',
    game: 'slime',
    gender: 'female',
    phoneNumber: '03-5555-0007',
    ctwEmail: 'slime-user3@ctw.inc',
    employmentType: 'full_time',
    position: 'Marketing',
    subPosition: 'promotion',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nakamura',
    g123ID: 'NM007',
    company: 'KADOKAWA'
  },
  {
    id: '8',
    employeeNumber: 108,
    name: '渡辺四郎',
    romanName: 'Watanabe Shiro',
    game: 'negima',
    gender: 'male',
    phoneNumber: '03-5555-0008',
    ctwEmail: 'negima-user3@ctw.inc',
    employmentType: 'intern',
    position: 'Assistant Designer',
    subPosition: 'support',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watanabe',
    g123ID: 'WS008',
    company: '讲谈社'
  }
];

// IP Game选项
export const ipGameOptions = [
  { label: 'Negima', value: 'negima' },
  { label: 'HighSchool', value: 'highschool' },
  { label: 'Slime', value: 'slime' }
];

// 雇佣类型选项（与CP相同）
export const employmentTypeOptions = [
  { label: '全职', value: 'full_time' },
  { label: '兼职', value: 'part_time' },
  { label: '合同工', value: 'contract' },
  { label: '实习生', value: 'intern' }
];

// 状态选项（与CP相同）
export const statusOptions = [
  { label: '在职', value: 'active' },
  { label: '离职', value: 'inactive' },
  { label: '休假', value: 'on_leave' }
]; 