import { useStore } from '../stores/store';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default function useDownloadFormat() {
  const store = useStore();

  const downloadPDF = () => {
    const doc = new jsPDF();

    const tableData = store.users.map((user) => [
      user.id,
      user.consecutive,
      user.activityName,
      user.culturalRightId,
      user.nacId,
      user.activityDate,
      user.startTime,
      user.finalHour,
      user.expertiseId,
      user.fechaDb,
      user.state,
    ]);
    const tableHeaders = store.headers;
    const tableColumnWidths = [10, 30, 30, 40, 30, 30, 30, 30, 40, 40, 30];

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      columns: tableColumnWidths,
    });

    doc.save('tabla.pdf');
  };

  const downloadXLS = () => {
    const store = useStore();
    const tableData = store.users.map((user) => [
      user.id,
      user.consecutive,
      user.activityName,
      user.culturalRightId,
      user.nacId,
      user.activityDate,
      user.startTime,
      user.finalHour,
      user.expertiseId,
      user.fechaDb,
      user.state,
    ]);

    // Crea el contenido del archivo CSV
    let csvContent = 'data:text/csv;charset=utf-8,';
    tableData.forEach((row) => {
      const csvRow = row.map((cell) => `"${cell}"`).join(',');
      csvContent += csvRow + '\r\n';
    });

    // Crea un enlace de descarga y simula un clic
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'tabla.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    downloadPDF,
    downloadXLS,
  };
}
