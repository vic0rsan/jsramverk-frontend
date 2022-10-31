import { jsPDF } from "jspdf";

export default async function textToPdf(html) {
    html = `<div style="width:800px">${html}</div>`;
    const pdf = new jsPDF("p", "pt", "a4");

    pdf.html(html, {
        callback: function (pdf) {
            pdf.save('document.pdf');
        }
    });

    console.log("Text has been converted to a pdf");
    console.log(html);
}
