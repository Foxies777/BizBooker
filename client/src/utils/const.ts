export enum BizRoutes {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    HOME = '/',
    ADDBUSINESS = '/add-business',
    ADMIN = '/dashboard',
    BUSINESS_DASHBOARD = '/business/dashboard/:id',
    BUSINESS_DASHBOARD_STAFF = '/business/dashboard/:id/staff',
    BUSINESS_DASHBOARD_SERVICE = '/business/dashboard/:id/service',
    STAFF_DASHBOARD = '/staff/dashboard/business/:id'
}