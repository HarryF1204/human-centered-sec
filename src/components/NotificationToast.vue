<script setup>
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({
    toasts: {
        type: Array,
        default: () => [],
    },
    durationMs: {
        type: Number,
        default: 4000,
    },
})

const emit = defineEmits(['dismiss'])

const typeClasses = {
    info: 'border-slate-200 bg-white text-slate-900',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    error: 'border-rose-200 bg-rose-50 text-rose-900',
}

const timeouts = new Map()

function scheduleDismiss(id) {
    if (!props.durationMs || props.durationMs <= 0) return
    if (timeouts.has(id)) return

    const timeoutId = setTimeout(() => {
        timeouts.delete(id)
        emit('dismiss', id)
    }, props.durationMs)

    timeouts.set(id, timeoutId)
}

watch(
    () => props.toasts,
    (list) => {
        const ids = new Set(list.map((t) => t.id))

        for (const toast of list) scheduleDismiss(toast.id)

        for (const [id, timeoutId] of timeouts) {
            if (!ids.has(id)) {
                clearTimeout(timeoutId)
                timeouts.delete(id)
            }
        }
    },
    { deep: true, immediate: true },
)

onBeforeUnmount(() => {
    for (const timeoutId of timeouts.values()) clearTimeout(timeoutId)
    timeouts.clear()
})
</script>

<template>
    <div class="pointer-events-none fixed right-4 top-4 z-50">
        <TransitionGroup tag="div" class="flex flex-col gap-2" enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-for="toast in toasts" :key="toast.id"
                class="pointer-events-auto w-[min(92vw,24rem)] rounded-2xl border p-4 shadow-sm"
                :class="typeClasses[toast.type] || typeClasses.info">
                <div class="text-sm font-semibold">{{ toast.message }}</div>
            </div>
        </TransitionGroup>
    </div>
</template>
