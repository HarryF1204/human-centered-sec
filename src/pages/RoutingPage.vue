<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <div class="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
            <header class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Pages</h1>
                    <p class="mt-2 text-slate-700">Choose where you want to go.</p>
                </div>
            </header>

            <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div class="space-y-3">
                    <RouterLink
                        class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        to="/login">
                        Adult login
                    </RouterLink>

                    <RouterLink
                        class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        to="/signup">
                        Adult sign up
                    </RouterLink>

                    <RouterLink
                        class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        to="/student/login">
                        Student login
                    </RouterLink>

                    <RouterLink
                        class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        to="/teacher/signup">
                        Teacher sign up
                    </RouterLink>

                    <RouterLink
                        class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        to="/student/first-login">
                        First-time login
                    </RouterLink>

                    <RouterLink
                        class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        to="/privacy">
                        Privacy commitment (parents)
                    </RouterLink>
                </div>
            </section>
        </div>
    </main>
</template>
