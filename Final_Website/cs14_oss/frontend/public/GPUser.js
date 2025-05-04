//file: dashboard.js
// used by dashboard.html to fetch users from the database
// and udpate HTML table with user data

async function fetchUserData() {
    const studentIDFetcher = await fetch("/api/session");
    const gotStudentID = await studentIDFetcher.json();
    const currentUser = {
        student_id: gotStudentID.user.username
    };

    const userID = JSON.stringify(currentUser);

    const responseUMD = await fetch("/api/userUMD", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userID
        })
    const userUMD = await responseUMD.json();

    //Now Response will be used for AMI
    const responseAMI = await fetch("/api/userAMI", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userID
        })
    const userAMI = await responseAMI.json();

    //Now Response will be use for SAMI
        //Now Response will be used for AMI
    const responseSAMI = await fetch("/api/userSAMI", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userID
        })
    const userSAMI = await responseSAMI.json();

    //Now Response will be used for PAI
    const responsePAI = await fetch("/api/userPAI", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userID
        })
    const userPAI = await responsePAI.json();

    if (responseUMD.ok && responseAMI.ok) {
        // get HTML for UMD table (going to modify this)
        const userUMDRow = document.getElementById("userUMD");
        userUMDRow.innerHTML = ""; // clear the previous content of the table

        // get HTML for AMI table (going to modify this)
        const userAMIRow = document.getElementById("userAMI");
        userAMIRow.innerHTML = ""; // clear the previous content of the table
        // get HTML for SAMI table (going to modify this)
        const userSAMIRow = document.getElementById("userSAMI");
        userAMIRow.innerHTML = ""; // clear the previous content of the table

        // get HTML for SAMI table (going to modify this)
        const userPAIRow = document.getElementById("userPAI");
        userAMIRow.innerHTML = ""; // clear the previous content of the table
        // for each user in result, create table row and append to table in DOM
        userUMD.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.student_id}</td><td>${user.class_year}</td><td>${user.cadet_rank}</td><td>${user.phone_num}</td><td>${user.email_addr}</td><td>${user.room_num}</td>`;
            userUMDRow.appendChild(row);
        });

        userAMI.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.ami_1}</td><td>${user.ami_2}</td><td>${user.ami_3}</td><td>${user.ami_4}</td><td>${user.ami_5}</td><td>${user.ami_6}</td><td>${user.ami_7}</td>`;
            userAMIRow.appendChild(row);
        });

        userSAMI.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.sami_1}</td><td>${user.sami_2}</td><td>${user.sami_3}</td>`;
            userSAMIRow.appendChild(row);
        });
        
        userPAI.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.pai_1}</td><td>${user.pai_2}</td><td>${user.pai_3}</td>`;
            userPAIRow.appendChild(row);
        });

    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}

fetchUserData();