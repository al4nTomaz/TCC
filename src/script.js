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
// Replace with your actual YouTube Data API Key
var YOUTUBE_API_KEY = 'AIzaSyANuau8o-pb0fryu3OkffWJcxeQ2rXAtTI';
document.addEventListener('DOMContentLoaded', function () {
    var videoLinkInput = document.getElementById('videoLink');
    var getInfoButton = document.getElementById('getInfoButton');
    var videoInfoDiv = document.getElementById('videoInfo');
    var errorMessageDiv = document.getElementById('errorMessage');
    getInfoButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var videoLink, videoId, videoData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    videoLink = videoLinkInput.value.trim();
                    errorMessageDiv.textContent = ''; // Clear previous errors
                    videoInfoDiv.innerHTML = ''; // Clear previous info
                    if (!videoLink) {
                        errorMessageDiv.textContent = 'Por favor, insira um link de vídeo do YouTube.';
                        return [2 /*return*/];
                    }
                    videoId = extractVideoId(videoLink);
                    if (!videoId) {
                        errorMessageDiv.textContent = 'Link de vídeo do YouTube inválido. Por favor, verifique o formato.';
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchVideoData(videoId)];
                case 2:
                    videoData = _a.sent();
                    displayVideoInfo(videoData);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    errorMessageDiv.textContent = "Erro ao obter informa\u00E7\u00F5es do v\u00EDdeo: ".concat(error_1.message);
                    console.error('Error fetching video data:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Extracts the YouTube video ID from various URL formats.
     * @param url The YouTube video URL.
     * @returns The video ID or null if not found.
     */
    function extractVideoId(url) {
        var regExp = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/;
        var match = url.match(regExp);
        return (match && match[1]) ? match[1] : null;
    }
    /**
     * Fetches video data from the YouTube Data API.
     * @param videoId The ID of the YouTube video.
     * @returns A Promise that resolves with the video data.
     */
    function fetchVideoData(videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, response, errorText, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "https://www.googleapis.com/youtube/v3/videos?id=".concat(videoId, "&key=").concat(YOUTUBE_API_KEY, "&part=snippet,statistics,contentDetails");
                        return [4 /*yield*/, fetch(apiUrl)];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        errorText = _a.sent();
                        throw new Error("HTTP error! status: ".concat(response.status, " - ").concat(errorText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        if (data.items.length === 0) {
                            throw new Error('Vídeo não encontrado ou ID inválido.');
                        }
                        return [2 /*return*/, data.items[0]];
                }
            });
        });
    }
    /**
     * Converts ISO 8601 duration format (e.g., PT1H2M3S) to a human-readable string.
     * @param isoDuration The duration in ISO 8601 format.
     * @returns A human-readable duration string.
     */
    function convertIsoDurationToHumanReadable(isoDuration) {
        var matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!matches) {
            return 'N/A';
        }
        var hours = matches[1] ? parseInt(matches[1]) : 0;
        var minutes = matches[2] ? parseInt(matches[2]) : 0;
        var seconds = matches[3] ? parseInt(matches[3]) : 0;
        var parts = [];
        if (hours > 0)
            parts.push("".concat(hours, "h"));
        if (minutes > 0)
            parts.push("".concat(minutes, "m"));
        if (seconds > 0 || (hours === 0 && minutes === 0))
            parts.push("".concat(seconds, "s")); // Ensure seconds always show if it's 0:0:X
        return parts.join(' ');
    }
    /**
     * Displays the fetched video information on the HTML page.
     * @param video The video data object.
     */
    function displayVideoInfo(video) {
        var _a, _b;
        var snippet = video.snippet;
        var statistics = video.statistics;
        var contentDetails = video.contentDetails; // Get contentDetails
        // Get and format duration
        var duration = (contentDetails === null || contentDetails === void 0 ? void 0 : contentDetails.duration) ? convertIsoDurationToHumanReadable(contentDetails.duration) : 'N/A';
        videoInfoDiv.innerHTML = "\n            <div>\n                <strong>T\u00EDtulo:</strong> ".concat(snippet.title, "\n            </div>\n            <div>\n                <strong>Canal:</strong> ").concat(snippet.channelTitle, "\n            </div>\n            <div>\n                <strong>Publicado em:</strong> ").concat(new Date(snippet.publishedAt).toLocaleDateString(), "\n            </div>\n            <div>\n                <strong>Dura\u00E7\u00E3o:</strong> ").concat(duration, "\n            </div>\n            <div>\n                <strong>Descri\u00E7\u00E3o:</strong> ").concat(snippet.description ? snippet.description.substring(0, 200) + '...' : 'N/A', "\n            </div>\n            <div>\n                <strong>Visualiza\u00E7\u00F5es:</strong> ").concat((statistics === null || statistics === void 0 ? void 0 : statistics.viewCount) ? parseInt(statistics.viewCount).toLocaleString() : 'N/A', "\n            </div>\n            <div>\n                <strong>Likes:</strong> ").concat((statistics === null || statistics === void 0 ? void 0 : statistics.likeCount) ? parseInt(statistics.likeCount).toLocaleString() : 'N/A', "\n            </div>\n            <div>\n                <strong>Coment\u00E1rios:</strong> ").concat((statistics === null || statistics === void 0 ? void 0 : statistics.commentCount) ? parseInt(statistics.commentCount).toLocaleString() : 'N/A', "\n            </div>\n            ").concat(((_b = (_a = snippet.thumbnails) === null || _a === void 0 ? void 0 : _a.high) === null || _b === void 0 ? void 0 : _b.url) ? "<img id=\"thumbnail\" src=\"".concat(snippet.thumbnails.high.url, "\" alt=\"Miniatura do V\u00EDdeo\">") : '', "\n        ");
    }
});
