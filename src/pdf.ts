document.addEventListener('DOMContentLoaded', () => {
    const pdfFileInput = document.getElementById('pdfFileInput') as HTMLInputElement;
    const uploadButton = document.getElementById('uploadButton') as HTMLButtonElement;
    const pdfViewer = document.getElementById('pdfViewer') as HTMLIFrameElement;
    const noPdfMessage = document.getElementById('noPdfMessage') as HTMLParagraphElement;

    uploadButton.addEventListener('click', async () => {
        if (!pdfFileInput.files || pdfFileInput.files.length === 0) {
            alert('Please select a PDF file first.');
            return;
        }

        const file = pdfFileInput.files[0];
        const formData = new FormData();
        formData.append('pdfFile', file); // 'pdfFile' is the field name your server will look for

        try {
            const response = await fetch('/uploads', { // This is your backend endpoint
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully:', data);
                // Assuming the server returns the URL/path to the uploaded PDF
                if (data.pdfUrl) {
                    pdfViewer.src = data.pdfUrl;
                    pdfViewer.style.display = 'block';
                    noPdfMessage.style.display = 'none';
                    alert('PDF uploaded and displayed!');
                } else {
                    alert('PDF uploaded, but no URL returned from server.');
                }
            } else {
                const errorData = await response.json();
                alert(`Error uploading PDF: ${errorData.message || response.statusText}`);
                console.error('Error uploading PDF:', errorData);
            }
        } catch (error) {
            console.error('Network error during PDF upload:', error);
            alert('A network error occurred during upload. Check console for details.');
        }
    });

    // Optional: If you want to load a previously uploaded PDF on page load
    // You would need an endpoint to list uploaded PDFs or retrieve a specific one.
    // For simplicity, we'll assume the iframe starts empty and loads on upload.
});