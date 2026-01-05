import { createRouter, createWebHistory } from 'vue-router'

import RoutingPage from './pages/RoutingPage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignUpPage from './pages/SignUpPage.vue'
import FirstTimeSetupPage from './pages/FirstTimeSetupPage.vue'
import AdultLoginPage from './pages/AdultLoginPage.vue'
import AdultSignUpPage from './pages/AdultSignUpPage.vue'
import PrivacyCommitmentPage from './pages/PrivacyCommitmentPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'routing', component: RoutingPage },
        { path: '/login', name: 'adult-login', component: AdultLoginPage },
        { path: '/signup', name: 'adult-signup', component: AdultSignUpPage },
        { path: '/privacy', name: 'privacy', component: PrivacyCommitmentPage },
        { path: '/student/login', name: 'login', component: LoginPage },
        { path: '/teacher/signup', name: 'signup', component: SignUpPage },
        { path: '/student/first-login', name: 'first-login', component: FirstTimeSetupPage },
    ],
})

export default router
