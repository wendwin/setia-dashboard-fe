<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 items-start">
            <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
               <div>
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Positive Topic Highlights
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 1</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea praesentium quis architecto. Consequuntur saepe enim corporis dignissimos ratione ex neque.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 2</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, sapiente delectus sint ratione doloremque debitis.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                    </fwb-accordion>
                </div>
            </div>

            <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div>
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Negative Topic Highlights
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 1</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt eligendi temporibus quo neque quisquam consequuntur quis eius, hic molestiae.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 2</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni expedita exercitationem deserunt ipsam distinctio est, eligendi non ducimus?
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 3</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sunt quasi laborum. Possimus earum sint iusto optio magni.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                    </fwb-accordion>
                    </fwb-accordion>
                </div>
            </div>
        </div>

        <CoherenceTypeB/>

    </div>
</template>

<script setup>
import CoherenceTypeB from '@/components/coherence/CoherenceTypeB.vue'
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from 'flowbite-vue'
</script>

<style lang="scss" scoped>

</style>