// import "bootstrap/dist/css/bootstrap.min.css";
// import "./main.css";

import { PDFDocument, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faEye, faFilePdf } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faFilePdf);

dom.watch();

var year, month, day;
const loadedDate = new Date();

const generateQR = async (text) => {
  try {
    var opts = {
      errorCorrectionLevel: "M",
      type: "image/png",
      quality: 0.92,
      margin: 1,
    };
    return await QRCode.toDataURL(text, opts);
  } catch (err) {
    console.error(err);
  }
};

function pad(str) {
  return String(str).padStart(2, "0");
}

const hour = pad(loadedDate.getHours());
const minute = pad(loadedDate.getMinutes());

function setDateNow(date) {
  year = date.getFullYear();
  month = pad(date.getMonth() + 1); // Les mois commencent à 0
  day = pad(date.getDate());
}

document.addEventListener("DOMContentLoaded", setReleaseDateTime);

function setReleaseDateTime() {
  const loadedDate = new Date();
  setDateNow(loadedDate);
  const releaseDateInput = `${year}-${month}-${day}`;
  releaseDateInput.value = `${year}-${month}-${day}`;

  const releaseTimeInput = `${hour}:${minute}`;
  releaseTimeInput.value = `${hour}:${minute}`;
}

function idealFontSize(font, text, maxWidth, minSize, defaultSize) {
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
}

async function generatePdf(reasons) {
  const creationDate = new Date().toLocaleDateString("fr-FR");
  const creationHour = new Date()
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");

  const firstname = localStorage.getItem("prenom");
  const lastname = localStorage.getItem("nom");
  const birthday = localStorage.getItem("dateNaissance");
  const lieunaissance = localStorage.getItem("lieuNaissance");
  const address = localStorage.getItem("adresse");
  const town = localStorage.getItem("ville");
  const zipcode = localStorage.getItem("codePostal");
  const datesortie = `${year}-${month}-${day}`;
  const heuresortie = `${hour}:${minute}`;
  const releaseHours = String(heuresortie).substring(0, 2);
  const releaseMinutes = String(heuresortie).substring(3, 5);

  const data = [
    `Cree le: ${creationDate} a ${creationHour}`,
    `Nom: ${lastname}`,
    `Prenom: ${firstname}`,
    `Naissance: ${birthday} a ${lieunaissance}`,
    `Adresse: ${address} ${zipcode} ${town}`,
    `Sortie: ${datesortie} a ${releaseHours}h${releaseMinutes}`,
    `Motifs: ${reasons}`,
  ].join("; ");

  const existingPdfBytes = await fetch("/static/certificate.pdf").then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page1 = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text, x, y, size = 11) => {
    page1.drawText(text, { x, y, size, font });
  };

  drawText(`${firstname} ${lastname}`, 123, 686);
  drawText(birthday, 123, 661);
  drawText(lieunaissance, 92, 638);
  drawText(`${address} ${zipcode} ${town}`, 134, 613);

  if (reasons.includes("travail")) {
    drawText("x", 76, 527, 19);
  }
  if (reasons.includes("courses")) {
    drawText("x", 76, 478, 19);
  }
  if (reasons.includes("sante")) {
    drawText("x", 76, 436, 19);
  }
  if (reasons.includes("famille")) {
    drawText("x", 76, 400, 19);
  }
  if (reasons.includes("sport")) {
    drawText("x", 76, 345, 19);
  }
  if (reasons.includes("judiciaire")) {
    drawText("x", 76, 298, 19);
  }
  if (reasons.includes("missions")) {
    drawText("x", 76, 260, 19);
  }
  let locationSize = idealFontSize(font, town, 83, 7, 11);

  if (!locationSize) {
    alert(
      "Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. " +
        'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.'
    );
    locationSize = 7;
  }

  drawText(town, 111, 226, locationSize);

  if (reasons !== "") {
    // Date sortie
    drawText(`${datesortie}`, 92, 200);
    drawText(releaseHours, 200, 201);
    drawText(releaseMinutes, 220, 201);
  }

  // Date création
  drawText("Date de création:", 464, 150, 7);
  drawText(`${creationDate} à ${creationHour}`, 455, 144, 7);

  const generatedQR = await generateQR(data);

  const qrImage = await pdfDoc.embedPng(generatedQR);

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 170,
    y: 155,
    width: 100,
    height: 100,
  });

  pdfDoc.addPage();
  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: "application/pdf" });
}

function downloadBlob(blob, fileName) {
  const link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}

function getAndSaveReasons() {
  // const values = $$('input[name="field-reason"]:checked')
  //   .map((x) => x.value)
  //   .join("-");
  return localStorage.getItem("reasons");
}

export let GenererPDF = async () => {
  const reasons = getAndSaveReasons();
  const pdfBlob = await generatePdf(reasons);
  // localStorage.clear();
  const creationDate = new Date().toLocaleDateString("fr-CA");
  const creationHour = new Date()
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "-");
  downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`);
};
