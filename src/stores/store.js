import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import axios from 'axios';

const STORAGE_KEY = 'my-app-store';
export const useStore = defineStore('store', () => {
  const users = ref([]);

  const headers = ref([
    '#',
    'CONSECUTIVO',
    'NOMBRE',
    'DERECHO CULTURAL',
    'NAC',
    'FECHA',
    'HORA INICIO',
    'HORA FINAL',
    'EXPERIENCIA',
    'FECHA CARGAR',
    'ESTADO',
  ]);

  const originalUsers = ref([]);

  const hoursRange = ref({});

  async function getUsers() {
    try {
      const response = (
        await axios.get(
          'https://aouss9hah5.execute-api.us-east-1.amazonaws.com/users',
        )
      ).data.body;
      users.value = JSON.parse(response);
      originalUsers.value = [...users.value];
      saveStateToStorage();
    } catch (error) {
      console.error(error);
    }
  }

  function saveStateToStorage() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        users: users.value,
        originalUsers: originalUsers.value,
      }),
    );
  }

  function loadStateFromStorage() {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      const { users: storedUsers, originalUsers: storedOriginalUsers } =
        JSON.parse(storedState);
      users.value = storedUsers;
      originalUsers.value = storedOriginalUsers;
    }
  }

  loadStateFromStorage();

  watch(
    users,
    () => {
      saveStateToStorage();
    },
    { deep: true },
  );

  // 👉 Actions
  function hoursData(object) {
    hoursRange.value = Object.assign({}, hoursRange.value, object);
  }
  async function addUser(user) {
    try {
      const lastUser = users.value[users.value.length - 1];
      const lastId = lastUser ? lastUser.id : 1;
      const newUser = {
        id: lastId + 1,
        consecutive: `FP${lastId + 1}`,
        ...user,
        state: 'en revision',
      };
      await axios.post(
        'https://aouss9hah5.execute-api.us-east-1.amazonaws.com/users',
        newUser,
      );
      getUsers()
    } catch (error) {
      console.log(error);
    }
  }

  function filerForCulturalRigthId(value) {
    if (value) {
      if (typeof value === 'number') {
        users.value = [...originalUsers.value].slice(0, value);
      }

      if (value === 'Todos') {
        users.value = [...originalUsers.value];
        return;
      }

      if (value !== 'Todos') {
        users.value = originalUsers.value.filter((user) => {
          const userValues = Object.values(user);
          return userValues.some((userValue) =>
            String(userValue).toLowerCase().includes(value.toLowerCase()),
          );
        });
        return;
      }
    }
    if (Object.keys(hoursRange.value).length > 0) {
      const startDate = hoursRange.value.inicial;
      const endDate = hoursRange.value.final;

      const filteredUsers = originalUsers.value.filter((user) => {
        const activityDate = user.activityDate;
        return activityDate >= startDate && activityDate <= endDate;
      });
      users.value = filteredUsers;
    } else {
      users.value = [...originalUsers.value];
    }
  }

  return {
    getUsers,
    users,
    headers,
    addUser,
    filerForCulturalRigthId,
    hoursData,
  };
});
