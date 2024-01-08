<template>
    <div>
      <h1>Role Management</h1>
  
      <!-- Button to open the modal for creating a new role -->
      <button @click="openCreateModal">Create New Role</button>
  
      <!-- Table to display roles -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>permission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <tr v-if="roles && roles.length" v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>{{ role.title }}</td>
                <td>{{ role.permissions.map(permission => permission.name).join(', ') }}</td>
                <td>
                    <button v-if="role.id" @click="openEditModal(role)">Edit</button>
                    <button v-if="role.id" @click="deleteRole(role.id)">Delete</button>
                </td>
            </tr>
            <tr v-else>
                <td colspan="5">No roles available.</td>
            </tr>
        </tbody>
      </table>
  
      <!-- Modal for creating/editing a role -->
        <div v-if="showModal">
            <div>
                <label for="roleName">Role Name:</label>
                <input type="text" v-model="roleName" id="roleName" />
            </div>
            <div>
                <label for="title">Title:</label>
                <input type="text" v-model="title" id="title" />
            </div>
            <div>
                <label>Permissions:</label>
                <div v-for="permission in allPermissions" :key="permission.id">
                    <input type="checkbox" :id="permission.name" :value="permission.id" v-model="selectedPermissions">
                    <label :for="permission.name">{{ permission.name }}</label>
                </div>
            </div>
            <button @click="saveRole">Save</button>
            <button @click="closeModal">Cancel</button>
        </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';
  
    const roles = ref([]);
    const showModal = ref(false);
    const roleName = ref('');
    const title = ref('');
    const selectedRoleId = ref(null);
    const selectedPermissions = ref([]);
    const allPermissions = ref([]);
  
  
    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/roles')
            roles.value = response.data.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/permissions/all');
            allPermissions.value = response.data;
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };
  
    const openCreateModal = () => {
        showModal.value = true;
        roleName.value = '';
        title.value = '';
        selectedRoleId.value = null;
    };
  
    const saveRole = async () => {
        const permissionsArray = selectedPermissions.value.map(permissionId => ({ permission_id: permissionId }));
        const data = {
            name: roleName.value,
            title: title.value,
            permissions: permissionsArray,
        };

        console.log('Data to be sent:', data);

        try {
            if (selectedRoleId.value === null) {
                const response = await axios.post('http://localhost:8000/api/roles/create', data);
                showModal.value = false;
                fetchRoles();
                // Success notification
                Swal.fire('Success', 'Role created successfully!', 'success');
            } else {
                const response = await axios.put(`http://localhost:8000/api/roles/update/${selectedRoleId.value}`, data);
                showModal.value = false;
                fetchRoles();
                // Success notification
                Swal.fire('Success', 'Role updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Error:', error);
            // Error notification
            Swal.fire('Error', 'Failed to create/update role', 'error');
        }
    };

    const openEditModal = (role) => {
        showModal.value = true;
        roleName.value = role.name;
        title.value = role.title;
        selectedPermissions.value = role.permissions.map(permission => permission.id); // รับค่า permissions ที่ role มีอยู่
        selectedRoleId.value = role.id !== null ? role.id : null;
    };


    const deleteRole = async (roleId) => {
        try {
            await axios.delete(`http://localhost:8000/api/roles/delete/${roleId}`);
            fetchRoles();
            // Success notification
            Swal.fire('Success', 'ลบ Role สำเร็จ!', 'success');
        } catch (error) {
            console.error('Error deleting role', error);
            // Error notification
            Swal.fire('Error', 'เกิดข้อผิดพลาดโปรดลองอีกครั้ง', 'error');
        }
    };
  
    const closeModal = () => {
        showModal.value = false;
        roleName.value = '';
        title.value = '';
        selectedRoleId.value = null;
    };
  
  onMounted(() => {
    fetchRoles();
    fetchPermissions();
  });
  </script>
  
  <style>
  /* Add your component styles here */
  </style>
  