<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PasswordField from '../components/PasswordField.vue'
import NotificationToast from '../components/NotificationToast.vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(true)

const errors = ref({
    email: '',
    password: '',
})

const toasts = ref([])
const toastSeq = ref(0)

function pushToast(type, message) {
    toastSeq.value += 1
    toasts.value = [...toasts.value, { id: toastSeq.value, type, message }]
}

function dismissToast(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
}

function submit() {
    errors.value = { email: '', password: '' }

    const noEmail = !email.value.trim()
    const noPassword = !password.value

    if (noEmail) errors.value.email = 'Enter your email.'
    if (noPassword) errors.value.password = 'Enter your password.'
    if (noEmail || noPassword) return


    const hasLowercase = /[a-z]/.test(password.value)
    const hasUppercase = /[A-Z]/.test(password.value)
    const hasNumber = /\d/.test(password.value)
    const hasSymbol = /[^A-Za-z0-9]/.test(password.value)

    let passwordError = ''
    if (password.value.length < 8) passwordError += '8 characters, '
    if (!hasLowercase) passwordError += '1 lowercase letter, '
    if (!hasUppercase) passwordError += '1 uppercase letter, '
    if (!hasNumber) passwordError += '1 number, '
    if (!hasSymbol) passwordError += '1 symbol'
    if (passwordError) {
        errors.value.password = `Password must include at least: ${passwordError}.`
        return
    }

    pushToast('success', 'Logged in (demo)')
}
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <NotificationToast :toasts="toasts" @dismiss="dismissToast" />

        <div class="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
            <header class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Log in</h1>
                    <p class="mt-2 text-slate-700">Secure login</p>
                </div>
                <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4" to="/">
                    Back
                </RouterLink>
            </header>

            <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <form class="space-y-5" @submit.prevent="submit">
                    <label class="block">
                        <span class="text-sm font-medium text-slate-700">Email</span>
                        <input v-model="email" type="email" autocomplete="email" inputmode="email"
                            placeholder="name@company.com"
                            class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none ring-sky-200 focus:ring-4"
                            :aria-invalid="Boolean(errors.email)" />
                        <p v-if="errors.email" class="mt-2 text-sm text-rose-700">* {{ errors.email }}</p>
                    </label>

                    <PasswordField v-model="password" label="Password" hint="" autocomplete="current-password"
                        :aria-invalid="Boolean(errors.password)">
                        <p v-if="errors.password" class="mt-2 text-sm text-rose-700">* {{ errors.password }}</p>
                    </PasswordField>

                    <label class="flex items-center gap-3">
                        <input v-model="rememberMe" type="checkbox"
                            class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200" />
                        <span class="text-sm text-slate-700">Keep me logged in</span>
                    </label>

                    <button type="submit"
                        class="w-full rounded-xl bg-sky-600 px-5 py-3 text-base font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200">
                        Log in
                    </button>

                    <div class="flex items-center justify-between gap-4 text-sm">
                        <RouterLink class="font-semibold text-sky-700 underline underline-offset-4" to="/signup">
                            Create an account
                        </RouterLink>
                        <RouterLink class="text-slate-500 underline underline-offset-4" to="/">
                            Forgot password
                        </RouterLink>
                    </div>
                </form>
            </section>
        </div>
    </main>
</template>
