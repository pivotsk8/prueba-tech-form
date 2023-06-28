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
      consecutive: 'FP1',
      activityName: 'karla',
      culturalRightId: 'Referencias a comunidades culturales',
      nacId: 'ARGELIA',
      activityDate: '2023-06-05',
      startTime: '23:00',
      finalHour: '1:00',
      expertiseId: 'Teatro',
      fechaDb: '2023-06-24',
      state: 'En revisión',
    },
    {
      id: 2,
      consecutive: 'FP2',
      activityName: 'Felipe',
      culturalRightId: 'Identidad y patrimonios culturales',
      nacId: 'ARGELIA',
      activityDate: '2023-06-07',
      startTime: '15:00',
      finalHour: '16:00',
      expertiseId: 'Danza',
      fechaDb: '2/3/23',
      state: 'En revisión',
    },
    {
      id: 3,
      consecutive: 'FP3',
      activityName: 'Raul',
      culturalRightId: 'Acceso y participación en la vida cultural',
      nacId: 'ALCALÁ',
      activityDate: '2023-05-01',
      startTime: '14:00',
      finalHour: '15:00',
      expertiseId: 'Música',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 4,
      consecutive: 'FP4',
      activityName: 'Juan',
      culturalRightId: 'Educación y formación',
      nacId: 'BUGA',
      activityDate: '2023-05-02',
      startTime: '15:00',
      finalHour: '20:00',
      expertiseId: 'Cocina tradicional',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 5,
      consecutive: 'FP5',
      activityName: 'Kely',
      culturalRightId: 'Información y comunicación',
      nacId: 'ANSERMANUEVA',
      activityDate: '2023-01-03',
      startTime: '17:00',
      finalHour: '19:00',
      expertiseId: 'Juegos tradicionales',
      fechaDb: '2/3/23',
      state: 'Aprobado',
    },
    {
      id: 6,
      consecutive: 'FP6',
      activityName: 'John',
      culturalRightId: 'Cooperación cultural',
      nacId: 'BUENAVENTURA',
      activityDate: '2023-07-05',
      startTime: '12:00',
      finalHour: '14:00',
      expertiseId: 'Promoción de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 7,
      consecutive: 'FP7',
      activityName: 'Pepe',
      culturalRightId: 'Identidad y patrimonios culturales',
      nacId: 'BOLÍVAR',
      activityDate: '2023-01-05',
      startTime: '12:00',
      finalHour: '18:00',
      expertiseId: 'Artes plásticas',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 8,
      consecutive: 'FP8',
      activityName: 'Homer',
      culturalRightId: 'Educación y formación',
      nacId: 'BUGA',
      activityDate: '2023-01-05',
      startTime: '13:00',
      finalHour: '16:00',
      expertiseId: 'Teatro',
      fechaDb: '2/3/23',
      state: 'En revisíon',
    },
    {
      id: 9,
      consecutive: 'FP9',
      activityName: 'Marge',
      culturalRightId: 'Acceso y participación en la vida cultural',
      nacId: 'ANDALUCÍA',
      activityDate: '2022-06-05',
      startTime: '14:00',
      finalHour: '15:00',
      expertiseId: 'Promoción de lectura',
      fechaDb: '2/3/23',
      state: 'Rechazado',
    },
    {
      id: 10,
      consecutive: 'FP10',
      activityName: 'Rick',
      culturalRightId: 'Referencias a comunidades culturales',
      nacId: 'ANDALUCÍA',
      activityDate: '2022-02-05',
      startTime: '18:00',
      finalHour: '20:00',
      expertiseId: 'Cocina tradicional',
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
