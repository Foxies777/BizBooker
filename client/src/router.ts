import { BizRoutes } from './utils/const'
import Home from "./pages/Home/ui/Home"
import Profile from "./pages/Profile/ui/Profile"
import AddBusiness from "./pages/AddBusiness/ui/AddBusiness"
import Admin from "./pages/Admin/ui/Admin"
import Business from "./pages/Business/Home/ui/Business"
import SignIn from './pages/Auth/SignIn/ui/SignIn'
import Registration from './pages/Auth/SignUp/ui/SignUp'
import Staffs from './pages/Business/Staff/ui/Staffs'
import Service from './pages/Business/Services/ui/Service'

export const authRoutes = [
    {
        path: BizRoutes.HOME,
        Component: Home,
    },
    {
        path: BizRoutes.PROFILE,
        Component: Profile,
    },
    {
        path: BizRoutes.ADDBUSINESS,
        Component: AddBusiness,
    },
    {
        path: BizRoutes.ADMIN,
        Component: Admin,
    },
    {
        path: BizRoutes.BUSINESS_DASHBOARD,
        Component: Business,
    },
    {
        path: BizRoutes.BUSINESS_DASHBOARD_STAFF,
        Component: Staffs,
    },
    {
        path: BizRoutes.BUSINESS_DASHBOARD_SERVICE,
        Component: Service,
    }
]
export const publicRoutes = [
    {
        path: BizRoutes.LOGIN,
        Component: SignIn,
    }, {
        path: BizRoutes.REGISTRATION,
        Component: Registration,
    },
    {
        path: BizRoutes.HOME,
        Component: Home,
    }
]