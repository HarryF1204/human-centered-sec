<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import PicturePasswordGrid from '../components/PicturePasswordGrid.vue'

const username = ref('')

const minPictures = 3
const maxPictures = 6
const chosenPictures = ref([])

const submitted = ref(false)
const errorMessage = ref('')

const canSubmit = computed(() => {
    return (
        Boolean(username.value.trim()) &&
        chosenPictures.value.length >= minPictures &&
        chosenPictures.value.length <= maxPictures
    )
})

function submit() {
    submitted.value = false
    errorMessage.value = ''

    if (!canSubmit.value) {
        errorMessage.value = 'Fill in username and name, then pick 3 to 6 pictures for the temporary password.'
        return
    }

    // UI-only: no backend wired yet.
    submitted.value = true
}

function resetForm() {
    username.value = ''
    chosenPictures.value = []
    submitted.value = false
    errorMessage.value = ''
}
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <div class="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
            <header class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Teacher sign up</h1>
                    <p class="mt-2 text-slate-700">
                        Create a new user with a temporary password.
                    </p>
                </div>
                <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4" to="/">
                    Back to login
                </RouterLink>
            </header>

            <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <form class="space-y-5" @submit.prevent="submit">
                    <label class="block">
                        <span class="text-sm font-medium text-slate-700">Username</span>
                        <input v-model="username" type="text" autocomplete="off"
                            class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none ring-sky-200 focus:ring-4" />
                    </label>

                    <label class="block">
                        <PicturePasswordGrid v-model="chosenPictures" :min="minPictures" :max="maxPictures"
                            title="Temporary Password" help-text="Pick 3 to 6 pictures."
                            aria-label="Temporary picture password" />
                    </label>

                    <p v-if="errorMessage" class="text-sm font-medium text-rose-700">{{ errorMessage }}</p>

                    <div class="flex flex-wrap items-center justify-end gap-3">
                        <button type="button"
                            class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                            @click="resetForm">
                            Reset
                        </button>
                        <button type="submit" :disabled="!canSubmit"
                            class="rounded-xl px-5 py-3 text-base font-semibold text-white focus:outline-none focus:ring-4 focus:ring-sky-200"
                            :class="canSubmit ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-300 cursor-not-allowed'">
                            Create user
                        </button>
                    </div>
                </form>
            </section>

            <section v-if="submitted" class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div class="font-semibold text-emerald-900">User created (demo)</div>
                <p class="mt-1 text-sm text-emerald-900">
                    Next, the user should log in and complete first-time setup.
                </p>
                <div class="mt-3">
                    <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4"
                        to="/first-login">
                        Go to first-time login page
                    </RouterLink>
                </div>
            </section>
        </div>
    </main>
</template>
