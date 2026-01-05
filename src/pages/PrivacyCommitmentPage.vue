<script setup>
import { RouterLink } from 'vue-router'

const privacyPoints = [
    {
        title: 'What data do we collect?',
        bullets: [
            'Student username or nickname (for sign-in and display within the learning experience).',
            'Parent/guardian or teacher email (for account setup, notices, and support requests).',
            'Age group or grade band (to keep content age-appropriate).',
            'Activity & gameplay data (e.g., progress, achievements, session events) to support learning and improvement.',
            'Communication data where enabled (e.g., chat messages) for community safety and moderation.',
            'We do not collect precise location, and we do not use advertising trackers or sell student information.',
        ],
        note: 'We also avoid collecting unnecessary personal details (such as home address or financial information) for children.',
    },
    {
        title: 'Why do we need this information?',
        bullets: [
            'To provide a safe, age-appropriate learning experience and keep accounts working reliably.',
            'To let teachers and parents support learning (e.g., progress visibility and account recovery).',
            'To protect the community through moderation and safety controls where communication features exist.',
        ],
    },
    {
        title: 'How Will the Data Be Processed and Used?',
        bullets: [
            'Used to create and manage student accounts, deliver learning content, and show progress over time.',
            'Activity and gameplay data may be aggregated to improve the experience and identify issues.',
            'Communication data (where enabled) may be reviewed by moderation systems and staff to keep the community safe.',
            'We do not sell personal information and do not use student data for targeted advertising.',
        ],
    },
    {
        title: 'How Long Will the Data Be Retained?',
        bullets: [
            'We keep student information only as long as needed to provide the service and meet legal obligations.',
            'Data is deleted when an account is closed, when a school relationship ends, or when a parent/guardian/teacher requests removal.'
        ],
    },
    {
        title: 'Who Should Be Contacted to Have Data Removed or Produced?',
        bullets: [
            'Parents/guardians can request access, correction, or deletion of student information.',
            'Contact: either the child\'s teacher or send email privacy@leveluplegends.com',
        ],
    },
    {
        title: 'Communication of Privacy Information',
        bullets: [
            'Your children\'s data is stored safely and securely',
            'If we lose your data we will be fined by the Information Commissioner'
        ],
    },
]
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <div class="mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-8">
            <header class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Privacy commitment</h1>
                    <p class="mt-2 text-slate-700">Information for parents and guardians.</p>
                </div>
                <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4" to="/">
                    Back
                </RouterLink>
            </header>

            <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p class="text-center text-sm text-slate-700">
                    We are committed to maintaining the privacy of user information and being transparent with
                    parents and guardians.
                </p>

                <div class="mt-6">
                    <div class="space-y-3">
                        <div v-for="point in privacyPoints" :key="point.title"
                            class="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-4">
                            <div class="text-sm font-semibold text-slate-900">{{ point.title }}</div>
                            <ul v-if="point.bullets?.length"
                                class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                                <li v-for="bullet in point.bullets" :key="bullet">{{ bullet }}</li>
                            </ul>
                            <p v-if="point.note" class="mt-2 text-xs text-slate-600">{{ point.note }}</p>

                            <RouterLink
                                class="absolute bottom-3 right-3 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                                to="/" :aria-label="`Go to home: ${point.title}`">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 1 0-7.07-7.07L10.5 5" />
                                    <path d="M14 11a5 5 0 0 0-7.07 0L5.5 12.5a5 5 0 1 0 7.07 7.07L13.5 19" />
                                </svg>
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <RouterLink
                        class="block w-full rounded-xl bg-sky-600 px-5 py-3 text-center text-base font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
                        to="/">
                        View full privacy policy
                    </RouterLink>
                </div>
            </section>
        </div>
    </main>
</template>
