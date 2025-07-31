var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener('DOMContentLoaded', function () {
    var pdfFileInput = document.getElementById('pdfFileInput');
    var uploadButton = document.getElementById('uploadButton');
    var pdfViewer = document.getElementById('pdfViewer');
    var noPdfMessage = document.getElementById('noPdfMessage');
    uploadButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var file, formData, response, data, errorData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!pdfFileInput.files || pdfFileInput.files.length === 0) {
                        alert('Please select a PDF file first.');
                        return [2 /*return*/];
                    }
                    file = pdfFileInput.files[0];
                    formData = new FormData();
                    formData.append('pdfFile', file); // 'pdfFile' is the field name your server will look for
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch('/uploads', {
                            method: 'POST',
                            body: formData,
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('File uploaded successfully:', data);
                    // Assuming the server returns the URL/path to the uploaded PDF
                    if (data.pdfUrl) {
                        pdfViewer.src = data.pdfUrl;
                        pdfViewer.style.display = 'block';
                        noPdfMessage.style.display = 'none';
                        alert('PDF uploaded and displayed!');
                    }
                    else {
                        alert('PDF uploaded, but no URL returned from server.');
                    }
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    errorData = _a.sent();
                    alert("Error uploading PDF: ".concat(errorData.message || response.statusText));
                    console.error('Error uploading PDF:', errorData);
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Network error during PDF upload:', error_1);
                    alert('A network error occurred during upload. Check console for details.');
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    // Optional: If you want to load a previously uploaded PDF on page load
    // You would need an endpoint to list uploaded PDFs or retrieve a specific one.
    // For simplicity, we'll assume the iframe starts empty and loads on upload.
});
