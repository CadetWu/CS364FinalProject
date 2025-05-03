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

// Self added
async function display(event) {

    console.log("here we are in dashboard.js");
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById("display-form"));

    // different than other similar example
    const table_to_display = {  
        table : formData.get("data_table_dropdown")
    };

    const jsonBody = JSON.stringify(table_to_display);

    try {
        const response = await fetch("/api/diplay_given_table", {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody // JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            // Show success alert
            console.log("display OK:");
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

async function truncate(event) {

    const response = await fetch("/api/truncate", { credentials: "include" });
    const users = await response.json();

    if (response.ok) {

        console.log("Truncate is successful");
        fetchAlls();
    }
    else {
        alert("An error occured with truncate"); // comment this out when confident
        window.location.href = "/dashboard.html";
    }

}

async function add_info(event) {
    console.log("adding information to users");
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById("add_info-form"));

    // different than other similar example
    const new_cadet_info = {  
        student_id : formData.get("student_id"),
        class_year : formData.get("class_year"),
        cadet_rank : formData.get("rank"),
        phone_num : formData.get("phone_num"),
        email_addr : formData.get("email"),
        name : formData.get("name")
    };

    const jsonBody = JSON.stringify(new_cadet_info);

    try {
        const response = await fetch("/api/add_info", {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody // JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            // Show success alert
            console.log("add info OK:");
            fetchAlls();
        }
    }
    catch (error) {
        console.error("... error in adding info");
        console.error("Error during adding info:", error);
        console.error(`jsonBody: ${jsonBody}`);
        alert("An error occurred. Please try again.");
    }
}


