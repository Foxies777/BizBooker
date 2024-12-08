// App.tsx
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { ProfileProvider } from './context/ProfileContext'
import { BusinessesProvider } from './context/BusinessesContext'

function App() {
    return (
        <ProfileProvider>
            <BusinessesProvider>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </BusinessesProvider>
        </ProfileProvider>
    )
}

export default App
