//file: dashboard.js
// used by dashboard.html to fetch users from the database
// and udpate HTML table with user data

async function fetchAlls() {
    const response = await fetch("/api/users", { credentials: "include" });
    const users = await response.json();

        // self added
    //const response1 = await fetch("/api/umd", { credentials: "include" });
    //const UMD = await response1.json();

    if (response.ok) {
        // get HTML table (going to modify this)
        const userTable = document.getElementById("userList");
        userTable.innerHTML = ""; // clear the previous content of the table

        // Used for UMD 
        //const UMDTable = document.getElementById("UMD_list");
        //UMDTable.innerHTML = ""; // clear the previous content of the table

        // for each user in result, create table row and append to table in 
        //Pulls for User
        users.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.role}</td>`;
            userTable.appendChild(row);
        });
        //Pulls for UMD
        //UMD.forEach(cadet => {  
            //const rowUMD = document.createElement("tr");
            //rowUMD.innerHTML = `<td>${cadet.student_id}</td><td>${cadet.class_year}</td><td>${cadet.cadet_rank}</td><td>${cadet.phone_num}</td><td>${cadet.email_addr}</td>`;
            //UMDTable.appendChild(rowUMD);
        //});

    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}

fetchAlls();

// Self added
async function truncate(event) {

    console.log("here we are in dashboard.js");
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById("truncate-form"));

    // different than other similar example
    const rows_to_display = {  
        num_rows : formData.get("num_rows")
    };

    const jsonBody = JSON.stringify(rows_to_display);

    try {
        const response = await fetch("/api/umd", {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody // JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            // Show success alert
            console.log("Truncate OK:");
             // Used for UMD 
            const UMDTable = document.getElementById("UMD_list");
            UMDTable.innerHTML = ""; // clear the previous content of the table

            //Pulls for UMD
            UMD.forEach(cadet => {  
                const rowUMD = document.createElement("tr");
                rowUMD.innerHTML = `<td>${cadet.student_id}</td><td>${cadet.class_year}</td><td>${cadet.cadet_rank}</td><td>${cadet.phone_num}</td><td>${cadet.email_addr}</td>`;
                UMDTable.appendChild(rowUMD);
        });
        } else {
            // Show error alert if registration fails
            console.log("Truncate not OK");
        }

    } catch (error) {
        console.error("... error in truncate");
        console.error("Error during truncate:", error);
        console.error(`jsonBody: ${jsonBody}`);
        alert("An error occurred. Please try again.");
    }


}

