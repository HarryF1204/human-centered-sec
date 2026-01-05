<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: 'Password',
    },
    hint: {
        type: String,
        default: '',
    },
    autocomplete: {
        type: String,
        default: 'current-password',
    },
    placeholder: {
        type: String,
        default: '••••••••',
    },
    ariaInvalid: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const value = computed({
    get() {
        return props.modelValue
    },
    set(next) {
        emit('update:modelValue', next)
    },
})

const inputType = computed(() => (showPassword.value ? 'text' : 'password'))

function toggleShowPassword() {
    showPassword.value = !showPassword.value
}
</script>

<template>
    <label class="block">
        <div class="flex items-baseline justify-between gap-3">
            <span class="text-sm font-medium text-slate-700">{{ label }}</span>
            <span v-if="hint" class="text-xs text-slate-500">{{ hint }}</span>
        </div>

        <div class="relative mt-2">
            <input v-model="value" :type="inputType" :autocomplete="autocomplete" :placeholder="placeholder"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-base outline-none ring-sky-200 focus:ring-4"
                :aria-invalid="ariaInvalid" />

            <button type="button" class="absolute inset-y-0 right-0 flex items-center justify-center px-3"
                :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword"
                @click="toggleShowPassword">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    class="h-5 w-5 text-slate-500">
                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3l18 18" />
                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M10.6 10.7a2.5 2.5 0 003.5 3.5" />
                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M6.5 6.7C4 8.5 2.5 12 2.5 12s2.5 6 9.5 6c2.1 0 3.8-.5 5.2-1.2" />
                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M9.2 4.5C10.1 4.2 11 4 12 4c7 0 9.5 8 9.5 8s-.9 2.8-3.2 5" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    class="h-5 w-5 text-slate-500">
                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M2.5 12S5 4 12 4s9.5 8 9.5 8-2.5 8-9.5 8-9.5-8-9.5-8Z" />
                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7Z" />
                </svg>
            </button>
        </div>

        <slot />
    </label>
</template>
