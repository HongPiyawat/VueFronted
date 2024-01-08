<!-- UserManagement.vue -->
<template>
    <div>
        <h1>User Management</h1>
        
        <!-- Display a table with users and their roles -->
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.roles.map(role => role.name).join(', ') }}</td>
                    <td>
                        <button @click="showRoleModal(user)">Manage Roles</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="selectedUser" class="modal">
            <h2>Manage Roles for {{ selectedUser.username }}</h2>
            <div v-if="allRoles.length > 0" v-for="role in allRoles" :key="role.id">
                <input type="checkbox" :id="role.name" :value="role.name" v-model="selectedRoles">
                <label :for="role.name">{{ role.name }}</label>
            </div>
            <button @click="updateRoles">Update Roles</button>
            <button @click="closeRoleModal">Close</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';

    const users = ref([]);
    const allRoles = ref([]);
    const selectedUser = ref(null);
    const selectedRoles = ref([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            users.value = response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/roles');
            allRoles.value = response.data.data;
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const showRoleModal = (user) => {
        if (user.roles) {
            selectedUser.value = user;
            selectedRoles.value = user.roles.map(role => role.name);
        } else {
            // Handle the case when user.roles is null or undefined
            console.error('User roles are not available.');
        }
    };

    const closeRoleModal = () => {
        selectedUser.value = null;
    };

    const updateRoles = async () => {
        try {
            const userId = selectedUser.value.id;

            // Ensure selectedRoles is an array with at least one role selected
            if (!Array.isArray(selectedRoles.value) || selectedRoles.value.length === 0) {
                console.error('No roles selected.');
                return;
            }

            const response = await axios.put(`http://localhost:8000/api/users/${userId}/roles`, {
                roles: selectedRoles.value,
            });

            Swal.fire({
                icon: 'success',
                title: 'Roles updated successfully',
                text: response.data.message,
            });

            closeRoleModal();
        } catch (error) {
            console.error('Error updating roles:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error updating roles',
                text: 'An error occurred while updating roles.',
            });
        }
    };


    onMounted(() => {
        fetchUsers();
        fetchRoles();
    });
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid #ccc;
    }
</style>
