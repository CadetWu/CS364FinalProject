//file: dashboard.js
// used by dashboard.html to fetch users from the database
// and udpate HTML table with user data

async function fetchUserData() {
    const studentIDFetcher = await fetch("/api/session");
    const gotStudentID = await studentIDFetcher.json();
    const currentUser = {
        student_id: gotStudentID.user.username
    };

    const userString = JSON.stringify(currentUser);
    console.log(userString)
    const response = await fetch("/api/userUMD", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userString
        })
    const userUMD = await response.json();

    if (response.ok) {
        // get HTML table (going to modify this)
        const userUMDRow = document.getElementById("userUMD");
        // userUMDRow.innerHTML = ""; // clear the previous content of the table

        // for each user in result, create table row and append to table in DOM
        // users.forEach(user => {  
        //     const row = document.createElement("tr");
        //     row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.role}</td>`;
        //     userTable.appendChild(row);
        // });
        userUMDRow.innerHTML = `<td>${userUMD.student_id}</td><td>${userUMD.class_year}</td><td>${userUMD.cadet_rank}</td><td>${userUMD.phone_num}</td><td>${userUMD.email_addr}</td>`;


    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}

fetchUserData();