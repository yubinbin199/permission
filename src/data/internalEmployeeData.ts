import { InternalEmployee } from '../types';

// 模拟内部员工数据
export const mockInternalEmployees: InternalEmployee[] = [
  {
    id: '1',
    employeeNumber: 4,
    name: '大友 优衣子',
    romanName: 'Otomo Yuiko',
    department: 'tech',
    gender: 'female',
    phoneNumber: '080-5071-001912',
    ctwEmail: 'otomo.y@ctw.inc',
    employmentType: 'full_time',
    position: 'QA 1',
    region: '东京',
    level: 'junior',
    minSalary: 350000,
    maxSalary: 450000,
    startDate: '2023-04-01',
    endDate: '2024-03-31',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=otomo'
  },
  {
    id: '2',
    employeeNumber: 8,
    name: '有馬 千夏',
    romanName: 'Kohama Chia',
    department: 'tech',
    gender: 'male',
    phoneNumber: '090-5445-0311',
    ctwEmail: 'kohama.c@ctw.inc',
    employmentType: 'full_time',
    position: '开发工程师',
    region: '东京',
    level: 'senior',
    minSalary: 500000,
    maxSalary: 650000,
    startDate: '2022-10-01',
    endDate: '2025-09-30',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kohama'
  },
  {
    id: '3',
    employeeNumber: 9,
    name: '岡村 一慶',
    romanName: 'Okamura Kazuyoshi',
    department: 'tech',
    gender: 'male',
    phoneNumber: '03-3760-8817',
    ctwEmail: 'okamura.k@ctw.inc',
    employmentType: 'full_time',
    position: '产品经理',
    region: '东京',
    level: 'manager',
    minSalary: 600000,
    maxSalary: 800000,
    startDate: '2021-04-01',
    endDate: '2026-03-31',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=okamura'
  },
  {
    id: '4',
    employeeNumber: 12,
    name: '佐女木 龙一',
    romanName: 'Sasaki Ryuichi',
    department: 'design',
    gender: 'male',
    phoneNumber: '090-1234-5678',
    ctwEmail: 'sasaki.r@ctw.inc',
    employmentType: 'full_time',
    position: 'UI设计师',
    region: '大阪',
    level: 'senior',
    minSalary: 450000,
    maxSalary: 580000,
    startDate: '2022-07-01',
    endDate: '2025-06-30',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sasaki'
  },
  {
    id: '5',
    employeeNumber: 15,
    name: '林 幹夫',
    romanName: 'Hayashi Mikio',
    department: 'tech',
    gender: 'male',
    phoneNumber: '080-9876-5432',
    ctwEmail: 'hayashi.m@ctw.inc',
    employmentType: 'contract',
    position: '开发工程师',
    region: '东京',
    level: 'senior',
    minSalary: 520000,
    maxSalary: 680000,
    startDate: '2023-01-15',
    endDate: '2024-12-31',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hayashi'
  },
  {
    id: '6',
    employeeNumber: 18,
    name: '石渡 章博',
    romanName: 'Ishiwata Akihiro',
    department: 'operation',
    gender: 'male',
    phoneNumber: '070-1111-2222',
    ctwEmail: 'ishiwata.a@ctw.inc',
    employmentType: 'full_time',
    position: '运营专员',
    region: '横滨',
    level: 'junior',
    minSalary: 380000,
    maxSalary: 480000,
    startDate: '2023-06-01',
    endDate: '2026-05-31',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ishiwata'
  },
  {
    id: '7',
    employeeNumber: 21,
    name: 'TONG HAIRIHAN',
    romanName: 'Tong Hairihan',
    department: 'tech',
    gender: 'female',
    phoneNumber: '080-3333-4444',
    ctwEmail: 'tong.h@ctw.inc',
    employmentType: 'full_time',
    position: 'QA',
    region: '东京',
    level: 'middle',
    minSalary: 420000,
    maxSalary: 520000,
    startDate: '2022-12-01',
    endDate: '2025-11-30',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tong'
  },
  {
    id: '8',
    employeeNumber: 25,
    name: '余斌斌',
    romanName: 'Yu Binbin',
    department: 'tech',
    gender: 'male',
    phoneNumber: '090-5555-6666',
    ctwEmail: 'yu.bin@ctw.inc',
    employmentType: 'full_time',
    position: '前端工程师',
    region: '东京',
    level: 'senior',
    minSalary: 480000,
    maxSalary: 620000,
    startDate: '2021-09-01',
    endDate: '2024-08-31',
    employmentStatus: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yu'
  }
];

// 地区选项
export const regionOptions = [
  { label: '东京', value: '东京' },
  { label: '大阪', value: '大阪' },
  { label: '横滨', value: '横滨' },
  { label: '名古屋', value: '名古屋' },
  { label: '京都', value: '京都' }
];

// 部门选项
export const internalDepartmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '设计部', value: 'design' },
  { label: '运营部', value: 'operation' },
  { label: '产品部', value: 'product' },
  { label: '人事部', value: 'hr' },
  { label: '财务部', value: 'finance' }
];

// 级别选项
export const levelOptions = [
  { label: '初级', value: 'junior' },
  { label: '中级', value: 'middle' },
  { label: '高级', value: 'senior' },
  { label: '经理', value: 'manager' },
  { label: '总监', value: 'director' }
];

// 职位选项
export const internalPositionOptions = [
  { label: 'QA', value: 'QA' },
  { label: 'QA 1', value: 'QA 1' },
  { label: '开发工程师', value: '开发工程师' },
  { label: '前端工程师', value: '前端工程师' },
  { label: '后端工程师', value: '后端工程师' },
  { label: 'UI设计师', value: 'UI设计师' },
  { label: '产品经理', value: '产品经理' },
  { label: '运营专员', value: '运营专员' },
  { label: '人事专员', value: '人事专员' }
];

// 雇佣类型选项
export const internalEmploymentTypeOptions = [
  { label: '全职', value: 'full_time' },
  { label: '兼职', value: 'part_time' },
  { label: '合同工', value: 'contract' },
  { label: '实习生', value: 'intern' }
];

// 性别选项
export const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
];

// 雇佣状态选项
export const employmentStatusOptions = [
  { label: '在职', value: 'active' },
  { label: '离职', value: 'inactive' },
  { label: '休假', value: 'on_leave' },
  { label: '试用期', value: 'probation' }
]; 