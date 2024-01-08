import { defineStore } from 'pinia';
import { AES, enc } from 'crypto-js';

export const usePermissionStore = defineStore('permission', {
  id: 'permissions',
  state: () => ({
    permissions: localStorage.getItem('permissions'),
  }),
  actions: {
    setPermissions(permissions) {
      const encryptedPermissions = AES.encrypt(JSON.stringify(permissions), 'your-secret-key').toString();
      this.permissions = encryptedPermissions;
      localStorage.setItem('permissions', encryptedPermissions);
    },
    clearPermissions() {
      this.permissions = null;
      localStorage.removeItem('permissions');
    },
    getDecryptedPermissions() {
      if (this.permissions) {
        const decryptedPermissions = AES.decrypt(this.permissions, 'your-secret-key').toString(enc.Utf8);
        return JSON.parse(decryptedPermissions);
      }
      return null;
    },
  },
});
