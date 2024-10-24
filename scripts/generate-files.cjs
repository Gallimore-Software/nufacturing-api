"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
// Define the target directory and the file names
var targetDir = './src/infrastructure/persistence/entities/'; // You can adjust this path
var filesToGenerate = [
    'supplier.model.ts',
    'supplierAudit.model.ts',
    'supplierScoreCard.model.ts',
    'purchaseOrder.model.ts',
    'purchaseOrderStatus.model.ts',
    'receiving.model.ts',
    'supplierCertificate.model.ts',
    'purchaseOrderCOA.model.ts',
    'purchaseOrderShipment.model.ts',
    'supplierAgreement.model.ts',
    'supplierInvoice.model.ts',
    'supplierPerformance.model.ts',
    'purchaseOrderTracking.model.ts',
];
// Create the target directory if it doesn't exist
if (!(0, fs_1.existsSync)(targetDir)) {
    (0, fs_1.mkdirSync)(targetDir, { recursive: true });
    console.log("Directory created: ".concat(targetDir));
}
// Function to create a file with a basic template
var createFile = function (fileName) {
    var filePath = (0, path_1.join)(targetDir, fileName);
    var content = "// ".concat(fileName, " - Model definition\n\nexport class ").concat(fileName.split('.')[0], " {\n\n}");
    (0, fs_1.writeFileSync)(filePath, content);
    console.log("Created file: ".concat(filePath));
};
// Loop through the file names and create each file
filesToGenerate.forEach(createFile);
console.log('All files generated successfully!');
