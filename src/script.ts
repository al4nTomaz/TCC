// Replace with your actual YouTube Data API Key
const YOUTUBE_API_KEY = 'AIzaSyANuau8o-pb0fryu3OkffWJcxeQ2rXAtTI';

document.addEventListener('DOMContentLoaded', () => {
    const videoLinkInput = document.getElementById('videoLink') as HTMLInputElement;
    const getInfoButton = document.getElementById('getInfoButton') as HTMLButtonElement;
    const videoInfoDiv = document.getElementById('videoInfo') as HTMLDivElement;
    const errorMessageDiv = document.getElementById('errorMessage') as HTMLDivElement;

    getInfoButton.addEventListener('click', async () => {
        const videoLink = videoLinkInput.value.trim();
        errorMessageDiv.textContent = ''; // Clear previous errors
        videoInfoDiv.innerHTML = ''; // Clear previous info

        if (!videoLink) {
            errorMessageDiv.textContent = 'Por favor, insira um link de vídeo do YouTube.';
            return;
        }

        const videoId = extractVideoId(videoLink);

        if (!videoId) {
            errorMessageDiv.textContent = 'Link de vídeo do YouTube inválido. Por favor, verifique o formato.';
            return;
        }

        try {
            const videoData = await fetchVideoData(videoId);
            displayVideoInfo(videoData);
        } catch (error: any) {
            errorMessageDiv.textContent = `Erro ao obter informações do vídeo: ${error.message}`;
            console.error('Error fetching video data:', error);
        }
    });

    /**
     * Extracts the YouTube video ID from various URL formats.
     * @param url The YouTube video URL.
     * @returns The video ID or null if not found.
     */
    function extractVideoId(url: string): string | null {
        const regExp = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/;
        const match = url.match(regExp);
        return (match && match[1]) ? match[1] : null;
    }

    /**
     * Fetches video data from the YouTube Data API.
     * @param videoId The ID of the YouTube video.
     * @returns A Promise that resolves with the video data.
     */
    async function fetchVideoData(videoId: string): Promise<any> {
        // Added 'contentDetails' to the 'part' parameter
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,statistics,contentDetails`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        const data = await response.json();

        if (data.items.length === 0) {
            throw new Error('Vídeo não encontrado ou ID inválido.');
        }

        return data.items[0];
    }

    /**
     * Converts ISO 8601 duration format (e.g., PT1H2M3S) to a human-readable string.
     * @param isoDuration The duration in ISO 8601 format.
     * @returns A human-readable duration string.
     */
    function convertIsoDurationToHumanReadable(isoDuration: string): string {
        const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!matches) {
            return 'N/A';
        }

        const hours = matches[1] ? parseInt(matches[1]) : 0;
        const minutes = matches[2] ? parseInt(matches[2]) : 0;
        const seconds = matches[3] ? parseInt(matches[3]) : 0;

        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0 || (hours === 0 && minutes === 0)) parts.push(`${seconds}s`); // Ensure seconds always show if it's 0:0:X

        return parts.join(' ');
    }

    /**
     * Displays the fetched video information on the HTML page.
     * @param video The video data object.
     */
    function displayVideoInfo(video: any): void {
        const snippet = video.snippet;
        const statistics = video.statistics;
        const contentDetails = video.contentDetails; // Get contentDetails

        // Get and format duration
        const duration = contentDetails?.duration ? convertIsoDurationToHumanReadable(contentDetails.duration) : 'N/A';

        videoInfoDiv.innerHTML = `
            <div>
                <strong>Título:</strong> ${snippet.title}
            </div>
            <div>
                <strong>Canal:</strong> ${snippet.channelTitle}
            </div>
            <div>
                <strong>Publicado em:</strong> ${new Date(snippet.publishedAt).toLocaleDateString()}
            </div>
            <div>
                <strong>Duração:</strong> ${duration}
            </div>
            <div>
                <strong>Descrição:</strong> ${snippet.description ? snippet.description.substring(0, 200) + '...' : 'N/A'}
            </div>
            <div>
                <strong>Visualizações:</strong> ${statistics?.viewCount ? parseInt(statistics.viewCount).toLocaleString() : 'N/A'}
            </div>
            <div>
                <strong>Likes:</strong> ${statistics?.likeCount ? parseInt(statistics.likeCount).toLocaleString() : 'N/A'}
            </div>
            <div>
                <strong>Comentários:</strong> ${statistics?.commentCount ? parseInt(statistics.commentCount).toLocaleString() : 'N/A'}
            </div>
            ${snippet.thumbnails?.high?.url ? `<img id="thumbnail" src="${snippet.thumbnails.high.url}" alt="Miniatura do Vídeo">` : ''}
        `;
    }
});