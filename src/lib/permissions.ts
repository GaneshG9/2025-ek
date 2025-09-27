export type UserRole = 'owner' | 'admin' | 'manager' | 'agent' | 'viewer';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface RolePermissions {
  [key: string]: Permission[];
}

export const ROLE_PERMISSIONS: RolePermissions = {
  owner: [
    { resource: 'dashboard', actions: ['view', 'manage'] },
    { resource: 'properties', actions: ['view', 'create', 'edit', 'delete', 'publish'] },
    { resource: 'users', actions: ['view', 'create', 'edit', 'delete', 'manage_roles'] },
    { resource: 'solar', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { resource: 'marketing', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { resource: 'pages', actions: ['view', 'create', 'edit', 'delete', 'publish'] },
    { resource: 'settings', actions: ['view', 'edit', 'manage'] },
    { resource: 'analytics', actions: ['view', 'export'] },
    { resource: 'crm', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { resource: 'leads', actions: ['view', 'create', 'edit', 'delete', 'assign'] },
    { resource: 'contacts', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'tasks', actions: ['view', 'create', 'edit', 'delete', 'assign'] },
    { resource: 'reports', actions: ['view', 'create', 'export'] }
  ],
  admin: [
    { resource: 'dashboard', actions: ['view'] },
    { resource: 'properties', actions: ['view', 'create', 'edit', 'publish'] },
    { resource: 'users', actions: ['view', 'edit'] },
    { resource: 'solar', actions: ['view', 'create', 'edit', 'manage'] },
    { resource: 'marketing', actions: ['view', 'create', 'edit', 'manage'] },
    { resource: 'pages', actions: ['view', 'edit'] },
    { resource: 'analytics', actions: ['view'] },
    { resource: 'crm', actions: ['view', 'create', 'edit', 'manage'] },
    { resource: 'leads', actions: ['view', 'create', 'edit', 'assign'] },
    { resource: 'contacts', actions: ['view', 'create', 'edit'] },
    { resource: 'tasks', actions: ['view', 'create', 'edit'] },
    { resource: 'reports', actions: ['view', 'create'] }
  ],
  manager: [
    { resource: 'dashboard', actions: ['view'] },
    { resource: 'properties', actions: ['view', 'create', 'edit'] },
    { resource: 'solar', actions: ['view', 'edit'] },
    { resource: 'marketing', actions: ['view', 'edit'] },
    { resource: 'crm', actions: ['view', 'create', 'edit'] },
    { resource: 'leads', actions: ['view', 'edit'] },
    { resource: 'contacts', actions: ['view', 'create', 'edit'] },
    { resource: 'tasks', actions: ['view', 'create', 'edit'] },
    { resource: 'reports', actions: ['view'] }
  ],
  agent: [
    { resource: 'dashboard', actions: ['view'] },
    { resource: 'properties', actions: ['view'] },
    { resource: 'crm', actions: ['view', 'edit'] },
    { resource: 'leads', actions: ['view', 'edit'] },
    { resource: 'contacts', actions: ['view', 'create', 'edit'] },
    { resource: 'tasks', actions: ['view', 'edit'] }
  ],
  viewer: [
    { resource: 'dashboard', actions: ['view'] },
    { resource: 'properties', actions: ['view'] },
    { resource: 'analytics', actions: ['view'] }
  ]
};

export function hasPermission(userRole: UserRole, resource: string, action: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  const resourcePermission = rolePermissions.find(p => p.resource === resource);
  return resourcePermission?.actions.includes(action) || false;
}

export function canAccess(userRole: UserRole, resource: string): boolean {
  return hasPermission(userRole, resource, 'view');
}