// 权限类型定义
export interface Permission {
  interviewer: boolean;      // 面试官
  employee: boolean;         // 普通员工
  departmentLeader: boolean; // 部门领导
  executive: boolean;        // 执行权限
  teamLeader: boolean;       // 组长
  officeLeader: boolean;     // 办公领导
  labor: boolean;            // 劳务
  ceo: boolean;              // CEO
  hr: boolean;               // 人事
  hrLeader: boolean;         // 人事领导
  globalLabor: boolean;      // 全球劳务
  techExpertEvaluator: boolean;     // Tech Expert Evaluator
  techExpertResponder: boolean;     // Tech Expert Responder
  creativeExpertEvaluator: boolean; // Creative Expert Evaluator
  creativeExpertResponder: boolean; // Creative Expert Responder
}

// 员工类型
export type EmployeeType = 'internal' | 'partner';

// 员工信息类型定义
export interface Employee {
  id: string;
  name: string;              // 姓名
  avatar: string;            // 头像
  department: string;        // 部门
  position: string;          // 职位
  roles: string[];           // 角色标签
  permissions: Permission;   // 权限信息
  project?: string;          // 项目（可选）
  employeeType: EmployeeType; // 员工类型：内部员工或合作方
}

// 过滤器类型定义
export interface FilterType {
  name: string;              // 姓名搜索
  position: string;          // 职位筛选
  department: string;        // 部门筛选
  project: string;           // 项目筛选
  roleName: string;          // 角色名称搜索
  employeeType: string;      // 员工类型筛选
}

// 角色管理相关类型定义
export interface RolePermission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface RolePermissionGroup {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  memberCount: number;
  createdAt: string;
  permissionGroups: RolePermissionGroup[];
}

// CP员工相关类型定义
export interface CPEmployee {
  id: string;
  employeeNumber: number;    // 员工编号
  name: string;              // 姓名
  romanName: string;         // 姓名罗马字
  game: string;              // Game
  gender: 'male' | 'female'; // 性别
  phoneNumber: string;       // 电话号码
  ctwEmail: string;          // CTW邮箱地址
  employmentType: string;    // 雇佣类型
  position: string;          // 职位
  subPosition: string;       // 子职位
  status: string;            // 状态
  avatar: string;            // 头像
  g123ID: string;            // G123ID
  company: string;           // 所属公司
}

// CP员工筛选器类型
export interface CPEmployeeFilterType {
  employeeId: string;            // 编号ID搜索
  name: string;                  // 姓名搜索
  romanName: string;             // 罗马字姓名搜索
  ctwEmail: string;              // CTW邮箱搜索
  game: string;                  // Game筛选
  company: string;               // 公司筛选
  subPosition: string;           // 子职位筛选
}

// 内部员工信息类型定义
export interface InternalEmployee {
  id: string;
  employeeNumber: number;    // 员工编号
  name: string;              // 姓名
  romanName: string;         // 姓名罗马字
  department: string;        // 部门
  gender: 'male' | 'female'; // 性别
  phoneNumber: string;       // 电话号码
  ctwEmail: string;          // CTW邮箱地址
  employmentType: string;    // 雇佣类型
  position: string;          // 职位
  region: string;            // 地区
  level: string;             // 级别
  minSalary: number;         // 最小月薪
  maxSalary: number;         // 最大月薪
  startDate: string;         // 开始日期
  endDate: string;           // 结束日期
  employmentStatus: string;  // 雇佣状态
  avatar: string;            // 头像
}

// 内部员工筛选器类型
export interface InternalEmployeeFilterType {
  name: string;              // 姓名搜索
  region: string;            // 地区筛选
  department: string;        // 部门筛选
  level: string;             // 级别筛选
  position: string;          // 职位筛选
  minSalary: string;         // 最小月薪
  maxSalary: string;         // 最大月薪
  startDate: string;         // 开始日期
  endDate: string;           // 结束日期
  employmentType: string;    // 雇佣类型
  gender: string;            // 性别
  employmentStatus: string;  // 雇佣状态
  ctwEmail: string;          // CTW邮箱搜索
}

// IP员工筛选器类型
export interface IPEmployeeFilterType {
  employeeId: string;            // 编号ID搜索
  name: string;                  // 姓名搜索
  ctwEmail: string;              // CTW邮箱搜索
  game: string;                  // Game筛选
  company: string;               // 公司筛选
} 