<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch">
            <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col ">
                <div class="flex-grow flex flex-col">
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Positive Topic Highlights
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 1</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea praesentium quis
                                    architecto. Consequuntur saepe enim corporis dignissimos ratione ex neque.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 2</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, sapiente delectus
                                    sint ratione doloremque debitis.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 3</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Voluptas corporis eveniet, rem asperiores ipsum itaque nemo deserunt id repellendus
                                    consequatur.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 4</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Eius repellendus aliquid, voluptates voluptate error cumque odit blanditiis earum,
                                    porro enim eveniet?
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 5</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Aspernatur, reiciendis dicta. Impedit, soluta aut? Asperiores doloremque odit
                                    laboriosam voluptatibus rerum nisi.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 6</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Consequuntur illo fugit autem iusto, nihil nostrum architecto expedita labore?
                                    Molestiae, consequatur ex!
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Topic 7</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Numquam perferendis possimus consequatur placeat deserunt, sapiente alias laborum
                                    minus, tenetur dolore!
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
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt eligendi
                                        temporibus quo neque quisquam consequuntur quis eius, hic molestiae.
                                    </p>
                                </fwb-accordion-content>
                            </fwb-accordion-panel>
                            <fwb-accordion-panel>
                                <fwb-accordion-header>Topic 2</fwb-accordion-header>
                                <fwb-accordion-content>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni expedita
                                        exercitationem deserunt ipsam distinctio est, eligendi non ducimus?
                                    </p>
                                </fwb-accordion-content>
                            </fwb-accordion-panel>
                        </fwb-accordion>
                    </fwb-accordion>
                </div>
            </div>
        </div>

        <CoherenceTypeD />

        <div
            class="mb-5 overflow-hidden w-full h-[95vh] bg-white dark:bg-[#374151] rounded-lg shadow-md focus:outline-none border-1 border-gray-100">
            <p class="p-4 font-semibold text-gray-800 dark:text-gray-300">Positive Topic Distance Map</p>
            <iframe src="/public/assets/visualization/lda_visualization_positif_d.html" class="w-full h-screen"
                style="border: none;"></iframe>
        </div>

        <div
            class="mb-5 overflow-hidden w-full h-[95vh] bg-white dark:bg-[#374151] rounded-lg shadow-md focus:outline-none border-1 border-gray-100">
            <p class="p-4 font-semibold text-gray-800 dark:text-gray-300">Negative Topic Distance Map</p>
            <iframe src="/public/assets/visualization/lda_visualization_negatif_d.html" class="w-full h-screen"
                style="border: none;"></iframe>
        </div>

    </div>
</template>

<script setup>
import CoherenceTypeD from '@/components/coherence/CoherenceTypeD.vue'
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from 'flowbite-vue'
</script>

<style lang="scss" scoped></style>