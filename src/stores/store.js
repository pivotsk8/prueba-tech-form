import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('store', () => {
  const now = new Date();
  const currentDate = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
  });

  const users = ref([
    {
      id: 1,
      consecutive: 'FP2',
      activityName: 'FP2',
      culturalRightId: 'Referencias a comunidades culturales',
      nacId: 'ARGELIA',
      activityDate: '2023-01-03',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promoción de lectura',
      fechaDb: '2023-06-24',
      state: 'Aprobado',
    },
    {
      id: 2,
      consecutive: 'FP2',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'ARGELIA',
      activityDate: '2023-01-03',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promoción de lectura',
      fechaDb: '2/3/23',
      state: 'En revisión',
    },
    {
      id: 3,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-03',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 4,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-03',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 5,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-03',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 6,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-05',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 7,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-05',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 8,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-05',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 9,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-01-05',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 10,
      consecutive: 'FP3',
      activityName: 'FP2',
      culturalRightId: 'FP2',
      nacId: 'FP2',
      activityDate: '2023-02-05',
      startTime: 'FP2',
      finalHour: 'FP2',
      expertiseId: 'promocion de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
  ]);

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

  const originalUsers = ref([...users.value]);

  const hoursRange = ref({});

  // 👉 Actions
  function hoursData(object) {
    hoursRange.value = Object.assign({}, hoursRange.value, object);
  }
  function addUser(user) {
    const lastUser = users.value[users.value.length - 1];
    const lastId = lastUser ? lastUser.id : 1;
    const newUser = {
      id: lastId + 1,
      consecutive: `FP${lastId + 1}`,
      ...user,
      currentDate,
      state: 'en revision',
    };
    users.value.push(newUser);
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
    users,
    headers,
    addUser,
    filerForCulturalRigthId,
    hoursData,
  };
});
