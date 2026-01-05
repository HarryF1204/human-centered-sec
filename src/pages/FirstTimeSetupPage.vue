<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import PicturePasswordGrid from '../components/PicturePasswordGrid.vue'

const voiceHelpOn = ref(true)

const minPictures = 3
const maxPictures = 6
const chosenPictures = ref([])

const submitted = ref(false)
const errorMessage = ref('')

const canSubmit = computed(() => {
    return chosenPictures.value.length >= minPictures && chosenPictures.value.length <= maxPictures
})

function submit() {
    submitted.value = false
    errorMessage.value = ''

    if (!canSubmit.value) {
        errorMessage.value = 'Pick 3 to 6 pictures.'
        return
    }

    submitted.value = true
}

function resetForm() {
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
                    <h1 class="text-2xl font-semibold tracking-tight">First-time login</h1>
                    <p class="mt-2 text-slate-700">You are logging in as Harry. Set your password.</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4" to="/">
                        Back
                    </RouterLink>

                    <label
                        class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">
                        <span class="text-slate-700">Voice</span>
                        <button type="button"
                            class="relative inline-flex h-6 w-11 items-center rounded-full border border-slate-200 bg-slate-100 px-0.5 transition"
                            :class="voiceHelpOn ? 'bg-emerald-100' : 'bg-slate-100'" role="switch"
                            :aria-checked="voiceHelpOn" aria-label="Voice help" @click="voiceHelpOn = !voiceHelpOn">
                            <span class="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition"
                                :class="voiceHelpOn ? 'translate-x-5' : 'translate-x-0'" />
                        </button>
                    </label>
                </div>
            </header>

            <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <form class="space-y-5" @submit.prevent="submit">
                    <PicturePasswordGrid v-model="chosenPictures" :min="minPictures" :max="maxPictures" title=""
                        help-text="Pick 3 to 6 pictures to be your password." aria-label="Picture password"
                        :voice-help-on="voiceHelpOn" />

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
                            Save password
                        </button>
                    </div>
                </form>
            </section>

            <section v-if="submitted" class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div class="font-semibold text-emerald-900">Password saved (demo)</div>
                <p class="mt-1 text-sm text-emerald-900">You can now use your picture password next time.</p>
                <div class="mt-3">
                    <RouterLink class="text-sm font-semibold text-sky-700 underline underline-offset-4" to="/">
                        Return to login
                    </RouterLink>
                </div>
            </section>
        </div>
    </main>
</template>
