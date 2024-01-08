<template>
  <div>
    <h1>Permission Management</h1>

    <!-- Button to open the modal for creating a new permission -->
    <button @click="openCreateModal">Create New Permission</button>

    <!-- Table to display permissions -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="permissions && permissions.length" v-for="permission in permissions" :key="permission.id">
          <td>{{ permission.name }}</td>
          <td>{{ permission.title }}</td>
          <td>{{ permission.type }}</td>
          <td>
            <button v-if="permission.id" @click="openEditModal(permission)">Edit</button>
            <button v-if="permission.id" @click="deletePermission(permission.id)">Delete</button>
          </td>
        </tr>
        <tr v-else>
          <td colspan="4">No permissions available.</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for creating/editing a permission -->
    <div v-if="showModal">
      <div>
        <label for="permissionName">Permission Name:</label>
        <input type="text" v-model="permissionName" id="permissionName" />
      </div>
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" />
      </div>
      <div>
        <label for="type">Type:</label>
        <input type="text" v-model="type" id="type" />
      </div>
      <button @click="savePermission">Save</button>
      <button @click="closeModal">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const permissions = ref([]);
const showModal = ref(false);
const permissionName = ref('');
const title = ref('');
const type = ref('');
const selectedPermissionId = ref(null);

const fetchPermissions = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/permissions');
    permissions.value = response.data.data;
  } catch (error) {
    console.error('Error fetching permission data:', error);
  }
};

const openCreateModal = () => {
  showModal.value = true;
  permissionName.value = '';
  title.value = '';
  type.value = '';
  selectedPermissionId.value = null;
};

const openEditModal = (permission) => {
  showModal.value = true;
  permissionName.value = permission.name;
  title.value = permission.title;
  type.value = permission.type;
  selectedPermissionId.value = permission.id !== null ? permission.id : null;
};

const savePermission = async () => {
  const data = {
    name: permissionName.value,
    title: title.value,
    type: type.value,
  };

  try {
    if (selectedPermissionId.value === null) {
      const response = await axios.post('http://localhost:8000/api/permissions/create', data);
      showModal.value = false;
      Swal.fire('Success', 'Permission สร้างสำเร็จ!', 'success');
      fetchPermissions();
    } else {
      const response = await axios.put(`http://localhost:8000/api/permissions/update/${selectedPermissionId.value}`, data);
      showModal.value = false;
      Swal.fire('Success', 'Permissionอัปเดตสำเร็จ!', 'success');
      fetchPermissions();
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'เกิดข้อผิดพลาดโปรดลองอีกครั้ง', 'error');
  }
};

const deletePermission = async (permissionId) => {
  try {
    await axios.delete(`http://localhost:8000/api/permissions/delete/${permissionId}`);
    fetchPermissions();
    Swal.fire('Success', 'ลบ Permission สำเร็จ!', 'success');
  } catch (error) {
    console.error('Error deleting permission', error);
    Swal.fire('Error', 'เกิดข้อผิดพลาดโปรดลองอีกครั้ง', 'error');
  }
};

const closeModal = () => {
  showModal.value = false;
  permissionName.value = '';
  title.value = '';
  type.value = '';
  selectedPermissionId.value = null;
};

onMounted(() => {
  fetchPermissions();
});
</script>

<style>
/* Add your component styles here */
</style>
