<template>
    <main class="p-3">
        <div class="grid grid-cols-2 gap-2 mb-3">
            <div>
                <button class="border p-1 text-sm w-full" @click="addUser">
                    Save History
                </button>
            </div>    
            <div>
                <button class="border p-1 text-sm w-full">
                    Print Now
                </button>
            </div>
        </div>

        <!-- Here We Go Template -->
        <div id="receiver" class="mt-5">
            <div class="grid grid-cols-4 gap-3">
                <div>
                    <p class="border border-dashed py-1 px-2 text-sm rounded inline">
                        Dari : 
                    </p>
                </div>
                <div class="col-span-2"></div>
                <div class="col-span-1">
                    <select class="border w-full"></select>
                </div>
            </div>
            
            <div>
                <img src="https://via.placeholder.com/500" alt="" class="w-20 mx-auto block mb-3 rounded">
                <p class="text-sm font-bold text-center mb-4" contenteditable @input="event => sender.name = event.target.textContent">
                    {{ sender.name }}
                </p>
            </div>
            
            <div class="grid grid-cols-4 gap-3">
                <div>
                    <p class="text-sm font-bold text-right">
                        Alamat : 
                    </p>
                </div>
                <div class="col-span-3">
                    <p class="text-sm" contenteditable @input="event => sender.address = event.target.textContent">
                        {{ sender.address }}
                    </p>
                </div>
            </div>
            
            <div class="grid grid-cols-4 gap-3">
                <div>
                    <p class="text-sm font-bold text-right">
                        Telepon : 
                    </p>
                </div>
                <div class="col-span-3">
                    <p class="text-sm" contenteditable @input="event => sender.phoneNumber = event.target.textContent">
                        {{ sender.phoneNumber }}
                    </p>
                </div>
            </div>
        </div>
        
        <div class="border border-dashed mt-5"></div>
        
        <div id="sender" class="mt-5">
            <div>
                <p class="border border-dashed py-1 px-2 text-sm rounded inline">
                    Kepada : 
                </p>
            </div>

            <div>
                <p class="text-sm font-bold text-center mb-4" contenteditable @input="event => receiver.name = event.target.textContent">
                    {{ receiver.name }}
                </p>
            </div>

            <div class="grid grid-cols-4 gap-3">
                <div>
                    <p class="text-sm font-bold text-right">
                        Alamat : 
                    </p>
                </div>
                <div class="col-span-3">
                    <p class="text-sm" contenteditable @input="event => receiver.adress = event.target.textContent">
                        {{ receiver.address }}
                    </p>
                </div>
            </div>
            
            <div class="grid grid-cols-4 gap-3">
                <div>
                    <p class="text-sm font-bold text-right">
                        Telepon : 
                    </p>
                </div>
                <div class="col-span-3">
                    <p class="text-sm" contenteditable @input="event => receiver.phoneNumber = event.target.textContent">
                        {{ receiver.phoneNumber }}
                    </p>
                </div>
            </div>
            
            <div class="grid grid-cols-2"></div>
        </div>
        
        <div class="border border-dashed mt-5"></div>
        <!-- Here We Go Template -->
    </main>
</template>

<script lang="ts">
    import { defineComponent, onMounted, reactive } from 'vue'

    import * as firebase from './firebase.js'
    
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
            
            const fetchUsers = async () => {
                // const users = await firebase.usersCollection.doc().get()
            }

            const addUser = async () => {
                await firebase.usersCollection.add(sender)
                await firebase.usersCollection.add(receiver)
            }
            
            onMounted(() => {
                fetchUsers()
            })

            return {
                receiver,
                sender,
                addUser
            }
        }
    })
</script>