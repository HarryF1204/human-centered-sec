<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import { useRouter } from 'vue-router'

import PicturePasswordGrid from '../components/PicturePasswordGrid.vue'

const step = ref('name') // 'name' | 'pics' | 'done'
const voiceHelpOn = ref(true)

const router = useRouter()

const username = ref('')
const usernameError = ref('')

const pictureNames = {
    star: 'Star',
    rocket: 'Rocket',
    panda: 'Panda',
    pizza: 'Pizza',
    balloon: 'Balloon',
    castle: 'Castle',
    turtle: 'Turtle',
    guitar: 'Guitar',
    sun: 'Sun',
    rainbow: 'Rainbow',
    unicorn: 'Unicorn',
    robot: 'Robot',
    soccer: 'Soccer ball',
    basketball: 'Basketball',
    teddy: 'Teddy',
    icecream: 'Ice cream',
    cupcake: 'Cupcake',
    donut: 'Donut',
    car: 'Car',
    bike: 'Bike',
    plane: 'Plane',
    train: 'Train',
    ship: 'Ship',
    book: 'Book',
    paint: 'Paint',
    music: 'Music',
    camera: 'Camera',
    cat: 'Cat',
    dog: 'Dog',
    dolphin: 'Dolphin',
    penguin: 'Penguin',
    frog: 'Frog',
    butterfly: 'Butterfly',
    tree: 'Tree',
    flower: 'Flower',
    heart: 'Heart',
}

function getPictureLabel(id) {
    return pictureNames[id] ?? 'Picture'
}

const chosenPictures = ref([])
const minPictures = 3
const maxPictures = 6

const liveMessage = ref('')

const nameHeadingRef = ref(null)
const picsHeadingRef = ref(null)
const doneHeadingRef = ref(null)
const nameInputRef = ref(null)

function setLiveMessage(message) {
    liveMessage.value = message
}

function speak(message) {
    if (!voiceHelpOn.value) return
    if (typeof window === 'undefined') return
    if (!('speechSynthesis' in window)) return

    try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(message)
        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1
        window.speechSynthesis.speak(utterance)
    } catch {
        // If the browser blocks autoplay/voice, the UI still works.
    }
}

function focusStepHeading() {
    nextTick(() => {
        const target =
            step.value === 'name'
                ? nameHeadingRef.value
                : step.value === 'pics'
                    ? picsHeadingRef.value
                    : doneHeadingRef.value
        target?.focus?.()
    })
}

function goToName() {
    step.value = 'name'
    usernameError.value = ''
    setLiveMessage('Name page.')
    speak('Name. Type your name, then press Next.')
    focusStepHeading()
    nextTick(() => nameInputRef.value?.focus?.())
}

function goToPics() {
    const trimmed = username.value.trim()
    if (!trimmed) {
        usernameError.value = 'Type your name.'
        setLiveMessage('Type your name.')
        speak('Type your name.')
        nextTick(() => nameInputRef.value?.focus?.())
        return
    }
    username.value = trimmed
    usernameError.value = ''
    step.value = 'pics'
    setLiveMessage('Picture password page.')
    speak('Pick three to six pictures for your password.')
    focusStepHeading()
}

const chosenLabels = computed(() =>
    chosenPictures.value
        .map((id) => getPictureLabel(id))
        .filter(Boolean),
)

const canSubmit = computed(() => chosenPictures.value.length >= minPictures && chosenPictures.value.length <= maxPictures)

const loggingInAsText = computed(() => {
    const name = username.value.trim()
    if (step.value === 'name') return 'Enter your username to continue.'
    return name ? `You are logging in as ${name}.` : 'You are logging in as ...'
})

function submitMock() {
    if (!canSubmit.value) return
    step.value = 'done'
    setLiveMessage('Signed in.')
    speak('All set. Signed in.')
    focusStepHeading()
}

function startOver() {
    username.value = ''
    usernameError.value = ''
    chosenPictures.value = []
    goToName()
}

function handleBack() {
    if (step.value === 'pics') {
        goToName()
        return
    }

    router.push('/')
}

watch(voiceHelpOn, (on) => {
    setLiveMessage(on ? 'Voice help on.' : 'Voice help off.')
    if (on) speak('Voice help on.')
    else if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
})

onMounted(() => {
    // Default: voice help enabled.
    goToName()
})
</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <div class="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-8">
            <header class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Logging In</h1>
                    <p class="mt-2 text-slate-700">{{ loggingInAsText }}</p>
                </div>

                <div class="flex flex-col items-end gap-2">
                    <button type="button" class="text-sm font-semibold text-sky-700 underline underline-offset-4"
                        @click="handleBack">
                        Back
                    </button>

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

            <div class="sr-only" aria-live="polite" aria-atomic="true">
                {{ liveMessage }}
            </div>

            <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <!-- PAGE 1: NAME -->
                <div v-if="step === 'name'" class="space-y-5">
                    <h1 ref="nameHeadingRef" tabindex="-1" class="text-xl font-semibold">Your username</h1>

                    <div class="space-y-2">
                        <label class="sr-only" for="kid-name">Username</label>
                        <input id="kid-name" ref="nameInputRef" v-model="username" type="text" inputmode="text"
                            autocomplete="username"
                            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg outline-none ring-sky-200 focus:ring"
                            placeholder="Type here" :aria-invalid="Boolean(usernameError)"
                            :aria-describedby="usernameError ? 'name-error' : undefined"
                            @keydown.enter.prevent="goToPics" />
                        <p v-if="usernameError" id="name-error" class="text-sm text-rose-600">
                            {{ usernameError }}
                        </p>
                    </div>

                    <button type="button"
                        class="w-full rounded-xl bg-sky-600 px-4 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
                        @click="goToPics">
                        Next
                    </button>
                </div>

                <!-- PAGE 2: PICTURE PASSWORD -->
                <div v-else-if="step === 'pics'" class="space-y-5">
                    <div class="flex items-center justify-between gap-3">
                        <h1 ref="picsHeadingRef" tabindex="-1" class="text-xl font-semibold">Picture password</h1>
                    </div>

                    <PicturePasswordGrid v-model="chosenPictures" :min="minPictures" :max="maxPictures" title=""
                        help-text="Select the pictures you have chosen to be your password. The order does not matter."
                        aria-label="Picture password" :voice-help-on="voiceHelpOn" />

                    <button type="button"
                        class="w-full rounded-xl px-4 py-3 text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-sky-200"
                        :class="canSubmit ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-300'" :disabled="!canSubmit"
                        @click="submitMock">
                        Done
                    </button>

                    <p class="sr-only">Chosen: {{ chosenLabels.join(', ') || 'None' }}</p>
                </div>

                <!-- DONE -->
                <div v-else class="space-y-5">
                    <h1 ref="doneHeadingRef" tabindex="-1" class="text-xl font-semibold">All set</h1>
                    <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div class="text-sm text-slate-700">Hi, {{ username }}.</div>
                        <div class="text-sm text-slate-700">Signed in (mock).</div>
                    </div>

                    <button type="button"
                        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        @click="startOver">
                        Start over
                    </button>
                </div>
            </section>
        </div>
    </main>
</template>
