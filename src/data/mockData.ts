import { Employee } from '../types';

// 模拟员工数据
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: '余斌斌',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yu',
    department: '技术部',
    position: '前端工程师',
    roles: ['面试官', '内部员工'],
    permissions: {
      interviewer: true,
      employee: true,
      departmentLeader: false,
      executive: false,
      teamLeader: false,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: false,
      techExpertResponder: false,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    },
    project: '项目A',
    employeeType: 'internal'
  },
  {
    id: '2',
    name: '林 幹夫',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    department: 'tech',
    position: '开发工程师',
    roles: ['ctw'],
    employeeType: 'internal',
    permissions: {
      interviewer: true,
      employee: true,
      departmentLeader: false,
      executive: true,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: true,
      techExpertResponder: false,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    }
  },
  {
    id: '3',
    name: '石原 真博',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    department: 'tech',
    position: '高级工程师',
    roles: ['ctw'],
    employeeType: 'partner',
    permissions: {
      interviewer: true,
      employee: true,
      departmentLeader: false,
      executive: true,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: true,
      techExpertResponder: true,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    }
  },
  {
    id: '4',
    name: '大友 优衣子',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    department: 'tech',
    position: 'QA',
    roles: ['ctw', 'QA-1'],
    employeeType: 'internal',
    permissions: {
      interviewer: true,
      employee: true,
      departmentLeader: false,
      executive: false,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: false,
      techExpertResponder: true,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    }
  },
  {
    id: '5',
    name: '李 恪非',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    department: 'operation',
    position: '运营专员',
    roles: ['ctw', 'gameops'],
    employeeType: 'partner',
    permissions: {
      interviewer: false,
      employee: true,
      departmentLeader: false,
      executive: false,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: true,
      techExpertEvaluator: false,
      techExpertResponder: false,
      creativeExpertEvaluator: true,
      creativeExpertResponder: false
    }
  },
  {
    id: '6',
    name: 'TONG HAIRIHAN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    department: 'tech',
    position: 'QA',
    roles: ['ctw', 'QA'],
    employeeType: 'internal',
    permissions: {
      interviewer: false,
      employee: true,
      departmentLeader: false,
      executive: true,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: false,
      techExpertResponder: true,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    }
  },
  {
    id: '7',
    name: '岩谷 知明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7',
    department: 'tech',
    position: '前端工程师',
    roles: ['ctw'],
    employeeType: 'partner',
    permissions: {
      interviewer: true,
      employee: true,
      departmentLeader: false,
      executive: true,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: true,
      techExpertResponder: false,
      creativeExpertEvaluator: true,
      creativeExpertResponder: true
    }
  },
  {
    id: '8',
    name: '有馬 千夏',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
    department: 'tech',
    position: '设计师',
    roles: ['ctw'],
    employeeType: 'internal',
    permissions: {
      interviewer: false,
      employee: true,
      departmentLeader: false,
      executive: false,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: true,
      hrLeader: false,
      globalLabor: false,
      techExpertEvaluator: false,
      techExpertResponder: false,
      creativeExpertEvaluator: true,
      creativeExpertResponder: true
    }
  },
  {
    id: '9',
    name: '岡村 一真',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9',
    department: 'tech',
    position: '产品经理',
    roles: ['ctw'],
    employeeType: 'partner',
    permissions: {
      interviewer: false,
      employee: true,
      departmentLeader: false,
      executive: false,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: true,
      hrLeader: true,
      globalLabor: false,
      techExpertEvaluator: false,
      techExpertResponder: false,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    }
  },
  {
    id: '10',
    name: '田中 勇人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10',
    department: 'tech',
    position: 'QA',
    roles: ['ctw', 'QA'],
    employeeType: 'internal',
    permissions: {
      interviewer: false,
      employee: true,
      departmentLeader: false,
      executive: false,
      teamLeader: true,
      officeLeader: false,
      labor: false,
      ceo: false,
      hr: false,
      hrLeader: false,
      globalLabor: true,
      techExpertEvaluator: false,
      techExpertResponder: false,
      creativeExpertEvaluator: false,
      creativeExpertResponder: false
    }
  }
];

// 部门选项
export const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '运营部', value: 'operation' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' }
];

// 职位选项
export const positionOptions = [
  { label: 'QA', value: 'QA' },
  { label: '开发工程师', value: '开发工程师' },
  { label: '高级工程师', value: '高级工程师' },
  { label: '运营专员', value: '运营专员' },
  { label: '前端工程师', value: '前端工程师' },
  { label: '设计师', value: '设计师' },
  { label: '产品经理', value: '产品经理' }
];

// 项目选项
export const projectOptions = [
  { label: '项目A', value: 'project-a' },
  { label: '项目B', value: 'project-b' },
  { label: '项目C', value: 'project-c' }
];

// 员工类型选项
export const employeeTypeOptions = [
  { label: '内部员工', value: 'internal' },
  { label: '合作方', value: 'partner' }
]; 