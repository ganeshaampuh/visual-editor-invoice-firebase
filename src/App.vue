<template>
    <main>
        <div class="grid grid-cols-1 gap-2 mb-3 hide-on-print p-3">
            <div>
                <button class="border p-1 text-sm w-full" @click="handlePrint">
                    Print Now
                </button>
            </div>
        </div>

        <!-- Here We Go Template -->
        <div id="printable-area" class="p-2 border mx-auto">
            <div id="receiver" class="mt-0">
                <div class="grid grid-cols-4 gap-3">
                    <div>
                        <p class="border border-dashed py-1 px-2 text-xs rounded inline">
                            Dari : 
                        </p>
                    </div>
                    <div class="col-span-2"></div>
                </div>
                
                <div>
                    <img src="https://via.placeholder.com/500" alt="" class="w-20 mx-auto block mb-3 rounded">
                    <p class="text-xs font-bold text-center mb-4" contenteditable @input="event => sender.name = event.target.textContent">
                        {{ sender.name }}
                    </p>
                </div>
                
                <div class="grid grid-cols-4 gap-3">
                    <div>
                        <p class="text-xs font-bold text-right">
                            Alamat : 
                        </p>
                    </div>
                    <div class="col-span-3">
                        <p class="text-xs" contenteditable @input="event => sender.address = event.target.textContent">
                            {{ sender.address }}
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-4 gap-3">
                    <div>
                        <p class="text-xs font-bold text-right">
                            Telepon : 
                        </p>
                    </div>
                    <div class="col-span-3">
                        <p class="text-xs" contenteditable @input="event => sender.phoneNumber = event.target.textContent">
                            {{ sender.phoneNumber }}
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="border border-dashed mt-5"></div>
            
            <div id="sender" class="mt-5">
                <div>
                    <p class="border border-dashed py-1 px-2 text-xs rounded inline">
                        Kepada : 
                    </p>
                </div>

                <div>
                    <p class="text-xs font-bold text-center mb-4" contenteditable @input="event => receiver.name = event.target.textContent">
                        {{ receiver.name }}
                    </p>
                </div>

                <div class="grid grid-cols-4 gap-3">
                    <div>
                        <p class="text-xs font-bold text-right">
                            Alamat : 
                        </p>
                    </div>
                    <div class="col-span-3">
                        <p class="text-xs" contenteditable @input="event => receiver.adress = event.target.textContent">
                            {{ receiver.address }}
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-4 gap-3">
                    <div>
                        <p class="text-xs font-bold text-right">
                            Telepon : 
                        </p>
                    </div>
                    <div class="col-span-3">
                        <p class="text-xs" contenteditable @input="event => receiver.phoneNumber = event.target.textContent">
                            {{ receiver.phoneNumber }}
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2"></div>
            </div>
            
            <div class="border border-dashed mt-5"></div>

            <div id="notes" class="mt-5">
                <div class="mb-3">
                    <p class="border border-dashed py-1 px-2 text-xs rounded inline">
                        Catatan
                    </p>
                </div>

                <div>
                    <p class="text-xs text-left mb-4 px-3" contenteditable @input="event => notes = event.target.textContent">
                        {{ notes }}
                    </p>
                </div>
            </div>
        </div>
        <!-- Here We Go Template -->
    </main>
</template>

<script lang="ts">
    import { defineComponent, onMounted, reactive, ref } from 'vue'

    import * as firebase from './firebase.js'
    import print from 'print-js'

    
    interface User {
        name?: string,
        address?: string,
        phoneNumber?: string
    }
    
    export default defineComponent({
        name: "VisualEditorInvoice",
        setup() {
            const sender = reactive<User> ({
                name: 'PT Indie Marketindo Ceria',
                address: 'Ruko Mekar Agung, Mekarwangi, Bandung, Indonesia',
                phoneNumber: '08123456789'
            })

            const receiver = reactive<User> ({
                name: 'Ganesha Ampuh',
                address: 'Sumedang, Indonesia',
                phoneNumber: '08112162229'
            })

            const notes = ref('Default Notes')
            
            const fetchUsers = async () => {
                const users = await firebase.usersCollection.doc().get()
                console.log(users)
            }

            const addUser = async () => {
                await firebase.usersCollection.add(sender)
                await firebase.usersCollection.add(receiver)
            }

            const handlePrint = () => {
                window.print()
            }
            
            onMounted(() => {
                fetchUsers()
            })

            return {
                receiver,
                sender,
                addUser,
                handlePrint,
                notes
            }
        }
    })
</script>

<style>
#printable-area {
    max-width: 100%;
    width: 11cm;
    height: 15cm;
    margin-top: 10px;
}

@media print {
    .hide-on-print {
        display: none;
    }
}   

@page {
    margin: 0.5cm;
}
</style>