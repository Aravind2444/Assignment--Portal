document.addEventListener('DOMContentLoaded', async () => {
    const assignmentList = document.getElementById('assignment-list');

    try {
        const response = await fetch('http://localhost:3000/assignments');
        if (response.ok) {
            const assignments = await response.json();
            if (assignments.length > 0) {
                const list = document.createElement('ul');
                assignments.forEach(assignment => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = `http://localhost:3000/uploads/${assignment}`;
                    link.textContent = assignment;
                    link.target = '_blank'; // Open in new tab
                    listItem.appendChild(link);
                    list.appendChild(listItem);
                });
                assignmentList.appendChild(list);
            } else {
                assignmentList.textContent = 'No assignments have been uploaded yet.';
            }
        } else {
            assignmentList.textContent = 'Failed to load assignments.';
        }
    } catch (error) {
        console.error('Error fetching assignments:', error);
        assignmentList.textContent = 'An error occurred while loading assignments.';
    }
});