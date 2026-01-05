<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    min: {
        type: Number,
        default: 3,
    },
    max: {
        type: Number,
        default: 6,
    },
    title: {
        type: String,
        default: 'Picture password',
    },
    helpText: {
        type: String,
        default: 'Pick 3 to 6 pictures.',
    },
    ariaLabel: {
        type: String,
        default: 'Picture password',
    },
    showClear: {
        type: Boolean,
        default: true,
    },
    voiceHelpOn: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue', 'toggle', 'clear', 'full'])

const pictureOptions = [
    { id: 'star', glyph: '⭐' },
    { id: 'rocket', glyph: '🚀' },
    { id: 'panda', glyph: '🐼' },
    { id: 'pizza', glyph: '🍕' },
    { id: 'balloon', glyph: '🎈' },
    { id: 'castle', glyph: '🏰' },
    { id: 'turtle', glyph: '🐢' },
    { id: 'guitar', glyph: '🎸' },
    { id: 'sun', glyph: '☀️' },
    { id: 'rainbow', glyph: '🌈' },
    { id: 'unicorn', glyph: '🦄' },
    { id: 'robot', glyph: '🤖' },
    { id: 'soccer', glyph: '⚽' },
    { id: 'basketball', glyph: '🏀' },
    { id: 'teddy', glyph: '🧸' },
    { id: 'icecream', glyph: '🍦' },
    { id: 'cupcake', glyph: '🧁' },
    { id: 'donut', glyph: '🍩' },
    { id: 'car', glyph: '🚗' },
    { id: 'bike', glyph: '🚲' },
    { id: 'plane', glyph: '✈️' },
    { id: 'train', glyph: '🚆' },
    { id: 'ship', glyph: '🚢' },
    { id: 'book', glyph: '📘' },
    { id: 'paint', glyph: '🎨' },
    { id: 'music', glyph: '🎵' },
    { id: 'camera', glyph: '📷' },
    { id: 'cat', glyph: '🐱' },
    { id: 'dog', glyph: '🐶' },
    { id: 'dolphin', glyph: '🐬' },
    { id: 'penguin', glyph: '🐧' },
    { id: 'frog', glyph: '🐸' },
    { id: 'butterfly', glyph: '🦋' },
    { id: 'tree', glyph: '🌳' },
    { id: 'flower', glyph: '🌸' },
    { id: 'heart', glyph: '💛' },
]

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

const chosenPictures = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})

const isFull = computed(() => chosenPictures.value.length >= props.max)

const liveMessage = ref('')

function setLiveMessage(message) {
    liveMessage.value = message
}

function speak(message) {
    if (!props.voiceHelpOn) return
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

watch(
    () => props.voiceHelpOn,
    (on) => {
        setLiveMessage(on ? 'Voice help on.' : 'Voice help off.')
        if (!on && typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    },
)

function togglePicture(id) {
    const index = chosenPictures.value.indexOf(id)
    if (index >= 0) {
        const next = [...chosenPictures.value]
        next.splice(index, 1)
        chosenPictures.value = next
        emit('toggle', { id, selected: false, count: next.length })

        setLiveMessage('Removed.')
        speak('Removed.')
        return
    }

    if (isFull.value) {
        emit('full')

        setLiveMessage('Full. Remove one to change.')
        speak('Full. Remove one to change.')
        return
    }

    const next = [...chosenPictures.value, id]
    chosenPictures.value = next
    emit('toggle', { id, selected: true, count: next.length })

    const label = getPictureLabel(id)
    const message = `${label}. ${next.length} of ${props.max}.`
    setLiveMessage(message)
    speak(message)
}

function clearPictures() {
    chosenPictures.value = []
    emit('clear')

    setLiveMessage('Cleared.')
    speak('Cleared.')
}
</script>

<template>
    <div>
        <div class="sr-only" aria-live="polite" aria-atomic="true">{{ liveMessage }}</div>

        <div class="text-sm font-medium text-slate-700">{{ title }}</div>
        <div class="mt-2 text-sm text-slate-600">{{ helpText }}</div>

        <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-2" aria-label="Progress">
                <div v-for="i in max" :key="i" class="h-3 w-3 rounded-full border border-slate-300"
                    :class="i <= chosenPictures.length ? 'bg-emerald-400 border-emerald-400' : 'bg-white'" />
                <div class="ml-2 text-sm text-slate-600">{{ chosenPictures.length }}</div>
            </div>

            <button v-if="showClear" type="button"
                class="text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-800"
                @click="clearPictures">
                Clear
            </button>
        </div>

        <div class="mt-3 mx-auto grid w-full max-w-2xl grid-cols-6 gap-1" role="group" :aria-label="ariaLabel">
            <button v-for="opt in pictureOptions" :key="opt.id" type="button"
                class="flex aspect-square w-full flex-col items-center justify-center rounded-xl border bg-white p-0 text-[2rem] leading-none transition focus:outline-none focus:ring-4 focus:ring-sky-100"
                :class="chosenPictures.includes(opt.id)
                    ? 'border-emerald-300 bg-emerald-50'
                    : isFull
                        ? 'border-slate-200 opacity-60'
                        : 'border-slate-200 hover:bg-slate-50'" :disabled="isFull && !chosenPictures.includes(opt.id)"
                :aria-pressed="chosenPictures.includes(opt.id)" :aria-label="getPictureLabel(opt.id)"
                @click="togglePicture(opt.id)">
                <span class="leading-none" aria-hidden="true">{{ opt.glyph }}</span>
            </button>
        </div>

        <p class="sr-only">Pick {{ min }} to {{ max }} pictures.</p>
    </div>
</template>
