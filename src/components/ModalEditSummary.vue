<template>
    <div class="button-edit text-gray-600 cursor-pointer hover:text-blue-500" @click="showModal">
        <font-awesome-icon :icon="['fa', 'pen-to-square']" />
    </div>

    <fwb-modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-300">
                Edit Summary Tipe {{ props.typeTopic }}
            </div>
        </template>
        <template #body>
            <form action="">
                <fwb-textarea v-model="summary1" :rows="4" label="Positif" placeholder="Write your message..."
                    class="mb-3" />
                <fwb-textarea v-model="summary2" :rows="4" label="Negatif" placeholder="Write your message..." />
            </form>
        </template>
        <template #footer>
            <div class="flex items-center justify-end">
                <fwb-button @click="saveChanges" class="bg-blue-600">
                    Save
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
    <fwb-toast v-if="isShowToast" class="fixed top-4 lg:top-16 right-4 z-50 font-bold text-lg" type="success">
        <div class="flex items-center gap-3">
            <p>Summary updated successfully.</p>
        </div>
    </fwb-toast>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import { FwbButton, FwbModal, FwbTextarea, FwbToast } from 'flowbite-vue'

const props = defineProps(['summaryPos', 'summaryNeg', 'typeTopic' ,'summaryId'])
const summary1 = ref('')
const summary2 = ref('')
const emit = defineEmits(['updated'])


const isShowModal = ref(false)

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}

watch(isShowModal, (val) => {
    if (val) {
        summary1.value = props.summaryPos.content || ''
        summary2.value = props.summaryNeg.content || ''
    }
})


const isShowToast = ref(false)


const baseUrl = import.meta.env.VITE_API_URL;

async function saveChanges() {
    const payload = [
        { id: props.summaryPos.id, content: summary1.value },
        { id: props.summaryNeg.id, content: summary2.value }
    ]


    try {
        const res = await fetch(`${baseUrl}/api/summaries/bulk-update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const err = await res.json()
            console.error('Update failed:', err)
            return
        }

        emit('updated')

        isShowModal.value = false
        setTimeout(() => {
            isShowToast.value = true
            setTimeout(() => {
                isShowToast.value = false
            }, 3000)
        }, 10)
    } catch (err) {
        console.error('Network error:', err)
    }
}

</script>