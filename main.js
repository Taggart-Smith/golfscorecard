async function fetchGolfData(courseId) {
    try {
        const response = await fetch(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`);
        if (!response.ok) {
            throw new Error('Problem in fetching data');
        }
        const data = await response.json();
        const holes = data.holes;

        for (let i = 0; i < holes.length; i++) {
            const holeNumber = holes[i];

            if (i < 9) {
                updateHTML('handicapfront', holeNumber.teeBoxes[0].hcp);
                updateHTML('parfront', holeNumber.teeBoxes[0].par);
                updateHTML('yardagefront', holeNumber.teeBoxes[0].yards);
            } else {
                updateHTML('handicapback', holeNumber.teeBoxes[0].hcp);
                updateHTML('parback', holeNumber.teeBoxes[0].par);
                updateHTML('yardageback', holeNumber.teeBoxes[0].yards);
            }
        }

    } catch (error) {
        console.log("There was an error in fetching the data", error);
    }
}

function updateHTML(rowId, value) {
    const row = document.getElementById(rowId);
    if (row) {
        row.innerHTML += `<td>${value}</td>`;
    } else {
        console.error(`Element with ID ${rowId} not found`);
    }
}

fetchGolfData(18300);
