import jsPDF from "jspdf";
import "jspdf-autotable";


export const DownloadReport = () => {
  if (!bills.length) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("My Bills Report", 14, 22);

  const tableColumn = ["Username", "Email", "Amount", "Address", "Phone", "Date"];
  const tableRows = [];

  bills.forEach((bill) => {
    const billData = [
      bill.username,
      bill.email,
      `৳${bill.amount}`,
      bill.address,
      bill.phone,
      bill.date
    ];
    tableRows.push(billData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: "grid",
    headStyles: { fillColor: [30, 144, 255] }, // optional styling
  });

  // total amount at bottom
  doc.text(`Total Amount Paid: ৳${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);

  doc.save("my-bills-report.pdf");
};
