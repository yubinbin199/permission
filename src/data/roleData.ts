import { Role, RolePermissionGroup } from '../types';

// 权限组数据
const permissionGroups: RolePermissionGroup[] = [
  {
    id: 'evaluation_setting',
    name: 'Evaluation Setting',
    description: '评估设置相关权限',
    permissions: [
      {
        id: 'setting_evaluation_edit',
        name: 'setting:evaluation:edit',
        description: '评估设置编辑权限',
        enabled: false
      }
    ]
  },
  {
    id: 'social_insurance_config',
    name: 'Social Insurance Config',
    description: '社保配置相关权限',
    permissions: [
      {
        id: 'social_insurance_view',
        name: 'social:insurance:view',
        description: '社保查看权限',
        enabled: false
      },
      {
        id: 'social_insurance_edit',
        name: 'social:insurance:edit',
        description: '社保编辑权限',
        enabled: false
      }
    ]
  },
  {
    id: 'p_permissions',
    name: 'P Permissions',
    description: 'P系统基础权限',
    permissions: [
      {
        id: 'system_access',
        name: 'system:access',
        description: '系统访问权限',
        enabled: true
      },
      {
        id: 'user_management',
        name: 'user:management',
        description: '用户管理权限',
        enabled: false
      }
    ]
  },
  {
    id: 'business_cooperation',
    name: 'Business cooperation',
    description: '商业合作相关权限',
    permissions: [
      {
        id: 'cp_cooperation_edit',
        name: 'CP cooperation:edit',
        description: 'CP合作编辑权限',
        enabled: false
      },
      {
        id: 'ip_cooperation_edit',
        name: 'IP cooperation:edit',
        description: 'IP合作编辑权限',
        enabled: false
      }
    ]
  },
  {
    id: 'a_permissions',
    name: 'A Permissions',
    description: 'A模块相关权限',
    permissions: [
      {
        id: 'a_module_access',
        name: 'a:module:access',
        description: 'A模块访问权限',
        enabled: false
      },
      {
        id: 'a_module_edit',
        name: 'a:module:edit',
        description: 'A模块编辑权限',
        enabled: false
      },
      {
        id: 'a_module_delete',
        name: 'a:module:delete',
        description: 'A模块删除权限',
        enabled: false
      }
    ]
  },
  {
    id: 'e_permissions',
    name: 'E Permissions',
    description: 'E模块相关权限',
    permissions: [
      {
        id: 'e_i_g123_access',
        name: 'Access permission for i.g123.jp',
        description: 'i.g123.jp访问权限',
        enabled: false
      }
    ]
  }
];

// 角色数据 - 将CP和IP相关角色置顶
export const mockRoles: Role[] = [
  {
    id: 'cp_leader',
    name: 'cp_leader',
    displayName: 'CP Leader',
    description: 'CP领导角色，负责CP业务管理',
    memberCount: 3,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[3], // Business cooperation
        permissions: permissionGroups[3].permissions.map(p => ({
          ...p,
          enabled: p.id === 'cp_cooperation_edit'
        }))
      },
      {
        ...permissionGroups[4], // A Permissions
        permissions: permissionGroups[4].permissions.map(p => ({
          ...p,
          enabled: p.id !== 'a_module_delete'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  },
  {
    id: 'cp',
    name: 'cp',
    displayName: 'CP',
    description: 'CP专员角色，负责CP业务执行',
    memberCount: 8,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: p.id === 'system_access'
        }))
      },
      {
        ...permissionGroups[3], // Business cooperation
        permissions: permissionGroups[3].permissions.map(p => ({
          ...p,
          enabled: p.id === 'cp_cooperation_edit'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  },
  {
    id: 'ip_leader',
    name: 'ip_leader',
    displayName: 'IP Leader',
    description: 'IP领导角色，负责IP业务管理',
    memberCount: 2,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[3], // Business cooperation
        permissions: permissionGroups[3].permissions.map(p => ({
          ...p,
          enabled: p.id === 'ip_cooperation_edit'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: p.id !== 'e_module_admin'
        }))
      }
    ]
  },
  {
    id: 'ip',
    name: 'ip',
    displayName: 'IP',
    description: 'IP专员角色，负责IP业务执行',
    memberCount: 5,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: p.id === 'system_access'
        }))
      },
      {
        ...permissionGroups[3], // Business cooperation
        permissions: permissionGroups[3].permissions.map(p => ({
          ...p,
          enabled: p.id === 'ip_cooperation_edit'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  },
  {
    id: 'members',
    name: 'members',
    displayName: '普通员工',
    description: '普通员工角色',
    memberCount: 30,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: p.id === 'system_access'
        }))
      },
      {
        ...permissionGroups[4], // A Permissions
        permissions: permissionGroups[4].permissions.map(p => ({
          ...p,
          enabled: p.id === 'a_module_access'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  },
  {
    id: 'department_managers',
    name: 'department_managers',
    displayName: '部门领导',
    description: '部门管理者角色',
    memberCount: 8,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[0], // Evaluation Setting
        permissions: permissionGroups[0].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[3], // Business cooperation
        permissions: permissionGroups[3].permissions.map(p => ({
          ...p,
          enabled: p.id === 'cp_cooperation_edit'
        }))
      },
      {
        ...permissionGroups[4], // A Permissions
        permissions: permissionGroups[4].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  },
  {
    id: 'executives',
    name: 'executives',
    displayName: '执行权限',
    description: '执行层角色',
    memberCount: 5,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[0], // Evaluation Setting
        permissions: permissionGroups[0].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[1], // Social Insurance Config
        permissions: permissionGroups[1].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[3], // Business cooperation
        permissions: permissionGroups[3].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[4], // A Permissions
        permissions: permissionGroups[4].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      }
    ]
  },
  {
    id: 'group_managers',
    name: 'group_managers',
    displayName: '组长',
    description: '小组管理者角色',
    memberCount: 12,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[4], // A Permissions
        permissions: permissionGroups[4].permissions.map(p => ({
          ...p,
          enabled: p.id !== 'a_module_delete'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  },
  {
    id: 'team_leaders',
    name: 'team_leaders',
    displayName: '小队领导',
    description: '团队领导角色',
    memberCount: 6,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[0], // Evaluation Setting
        permissions: permissionGroups[0].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      },
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: true
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: p.id !== 'e_module_admin'
        }))
      }
    ]
  },
  {
    id: 'labors',
    name: 'labors',
    displayName: '劳务',
    description: '劳务人员角色',
    memberCount: 15,
    createdAt: 'Mar 12, 2025',
    permissionGroups: [
      {
        ...permissionGroups[2], // P Permissions
        permissions: permissionGroups[2].permissions.map(p => ({
          ...p,
          enabled: p.id === 'system_access'
        }))
      },
      {
        ...permissionGroups[5], // E Permissions
        permissions: permissionGroups[5].permissions.map(p => ({
          ...p,
          enabled: false
        }))
      }
    ]
  }
]; 