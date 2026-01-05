<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PasswordField from '../components/PasswordField.vue'

const email = ref('')
const password = ref('')

const submitted = ref(false)
const errors = ref({
    email: '',
    password: '',
})

function submit() {
    submitted.value = false
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

    submitted.value = true
}
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <div class="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
            <header class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Sign up</h1>
                    <p class="mt-2 text-slate-700"></p>
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

                    <PasswordField v-model="password" label="Password" hint="" autocomplete="new-password"
                        :aria-invalid="Boolean(errors.password)">
                        <p v-if="errors.password" class="mt-2 text-sm text-rose-700">* {{ errors.password }}</p>
                    </PasswordField>

                    <button type="submit"
                        class="w-full rounded-xl bg-sky-600 px-5 py-3 text-base font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200">
                        Create account
                    </button>

                    <p class="m-0 text-xs text-slate-600">
                        By creating an account, you are agreeing to our
                        <RouterLink class="font-semibold text-sky-700 underline underline-offset-4" to="/">
                            Terms of Service
                        </RouterLink>
                        and
                        <RouterLink class="font-semibold text-sky-700 underline underline-offset-4" to="/">
                            Privacy Policy
                        </RouterLink>.
                    </p>

                    <div class="text-sm">
                        <RouterLink class="font-semibold text-sky-700 underline underline-offset-4" to="/login">
                            Already have an account? Log in
                        </RouterLink>
                    </div>
                </form>
            </section>

            <section v-if="submitted" class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div class="font-semibold text-emerald-900">Account created (demo)</div>
                <p class="mt-1 text-sm text-emerald-900">Next step would be email verification and login.</p>
                <div class="mt-3">
                    <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4" to="/login">
                        Continue to login
                    </RouterLink>
                </div>
            </section>
        </div>
    </main>
</template>
