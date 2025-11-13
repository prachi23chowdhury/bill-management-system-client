import jsPDF from "jspdf";
import "jspdf-autotable";

export const DownloadReport = (bills, totalAmount) => {
  if (!bills || bills.length === 0) {
    alert("No bills to download!");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("My Bills Report", 14, 22);

  const tableColumn = ["Username", "Email", "Amount", "Address", "Phone", "Date"];
  const tableRows = bills.map((bill) => [
    bill.username,
    bill.email,
    `৳${bill.amount}`,
    bill.address,
    bill.phone,
    bill.date,
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: "grid",
    headStyles: { fillColor: [30, 144, 255] },
  });

  doc.text(
    `Total Amount Paid: ৳${totalAmount}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  doc.save("my-bills-report.pdf");
};
