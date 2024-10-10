
import Registration from "./pages/SignUp/ui/SignUp";
import SignIn from './pages/SignIn/ui/SignIn';
import { BizRoutes } from './utils/const';
import Home from "./pages/Home/ui/Home";
import Profile from "./pages/Profile/ui/Profile";
import AddBusiness from "./pages/AddBusiness/ui/AddBusiness";

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