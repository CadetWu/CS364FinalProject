//file: dashboard.js
// used by dashboard.html to fetch users from the database
// and udpate HTML table with user data

async function fetchAlls() {
    const response = await fetch("/api/users", { credentials: "include" });
    const users = await response.json();

        // self added
    const response1 = await fetch("/api/umd", { credentials: "include" });
    const UMD = await response1.json();

    if (response.ok) {
        // get HTML table (going to modify this)
        const userTable = document.getElementById("userList");
        userTable.innerHTML = ""; // clear the previous content of the table

        // Used for UMD 
        const UMDTable = document.getElementById("UMD_list");
        UMDTable.innerHTML = ""; // clear the previous content of the table

        // for each user in result, create table row and append to table in 
        //Pulls for User
        users.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.role}</td>`;
            userTable.appendChild(row);
        });
        //Pulls for UMD
        UMD.forEach(cadet => {  
            const rowUMD = document.createElement("tr");
            rowUMD.innerHTML = `<td>${cadet.student_id}</td><td>${cadet.class_year}</td><td>${cadet.cadet_rank}</td><td>${cadet.phone_num}</td><td>${cadet.email_addr}</td>`;
            UMDTable.appendChild(rowUMD);
        });

    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}

fetchAlls();

