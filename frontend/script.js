const uploadForm = document.getElementById('upload-form');
const uploadStatus = document.getElementById('upload-status');
const assignmentInput = document.getElementById('assignment');
const previewArea = document.getElementById('preview-area');
const fileName = document.getElementById('file-name');
const pdfPreview = document.getElementById('pdf-preview');

assignmentInput.addEventListener('change', () => {
    const file = assignmentInput.files[0];
    if (file && file.type === 'application/pdf') {
        fileName.textContent = file.name;
        previewArea.style.display = 'block';

        const reader = new FileReader();
        reader.onload = (e) => {
            const loadingTask = pdfjsLib.getDocument(e.target.result);
            loadingTask.promise.then((pdf) => {
                pdf.getPage(1).then((page) => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });

                    const context = pdfPreview.getContext('2d');
                    pdfPreview.height = viewport.height;
                    pdfPreview.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            });
        };
        reader.readAsArrayBuffer(file);

    } else {
        previewArea.style.display = 'none';
    }
});

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const formData = new FormData(uploadForm);
    formData.set('studentName', studentName);
    
    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            uploadStatus.textContent = 'File uploaded successfully!';
            uploadStatus.style.color = '#28a745';
        } else {
            uploadStatus.textContent = 'File upload failed.';
            uploadStatus.style.color = '#dc3545';
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        uploadStatus.textContent = 'An error occurred during upload.';
        uploadStatus.style.color = '#dc3545';
    }
});