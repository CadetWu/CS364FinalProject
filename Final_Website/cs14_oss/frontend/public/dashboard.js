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
        //const UMDTable = document.getElementById("display-rows");
        
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

async function display(event) {

    console.log("here we are in display");
   //event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById("display-form"));

    // different than other similar example
    const table_to_display = {  
        table : formData.get("data_table_dropdown")
    };

    const jsonBody = JSON.stringify(table_to_display);

    try {
        const response = await fetch("/api/display_given_table", {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody // JSON.stringify(userData)
        });

        const result = await response.json();
        console.log(result)

        // Check if tableRows is an array (from PerplexityAI)
        if (Array.isArray(result)) {
            console.log("tablerows.forEach should be good to use. result: ")
            console.log(result)
        } else {
            console.error("Backend error:", result.message); // 
        }

        if (response.ok) {
            // Show success alert
            console.log("/display OK:");
            // pull table headers from return json body
            //const headers = result.length > 0 ? Object.keys(result[0]) : [];
             // get table headers and rows
            const tableHeaders = document.getElementById("display-headers");
            tableHeaders.innerHTML = ""; // clear the previous content of the table
            const tableRows = document.getElementById("display-rows");
            tableRows.innerHTML = "";

            // Series of If/then based on what table selected
            const tablename = JSON.parse(jsonBody);
            if (tablename.table == "UMD") {
                
                // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>Class Year</th><th>Rank</th><th>Phone Number</th><th>USAFA Email Address</th>`;
                tableHeaders.appendChild(headerRow);
                
                result.forEach(cadet => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${cadet.name}</td><td>${cadet.student_id}</td><td>${cadet.class_year}</td><td>${cadet.cadet_rank}</td><td>${cadet.phone_num}</td><td>${cadet.email_addr}</td>`;
                tableRows.appendChild(row);
                });

            }
            else if (tablename.table == "SAMI_grades") {
                 // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>SAMI 1</th><th>SAMI 2</th><th>SAMI 3</th>`;
                tableHeaders.appendChild(headerRow);
                 
                result.forEach(cadet => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${cadet.name}<td>${cadet.student_id}</td><td>${cadet.sami_1}</td><td>${cadet.sami_2}</td><td>${cadet.sami_3}</td>`;
                tableRows.appendChild(row);
                });
            }
            else if (tablename.table == "AMI_grades") {
                // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>AMI 1</th><th>AMI 2</th><th>AMI 3</th><th>AMI 4</th><th>AMI 5</th><th>AMI 6</th><th>AMI 7</th>`;
                tableHeaders.appendChild(headerRow);
                
                result.forEach(cadet => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${cadet.name}</td><td>${cadet.student_id}</td><td>${cadet.ami_1}</td><td>${cadet.ami_2}</td><td>${cadet.ami_3}</td><td>${cadet.ami_4}</td><td>${cadet.ami_5}</td><td>${cadet.ami_6}</td><td>${cadet.ami_7}</td>`;
                tableRows.appendChild(row);
                });

            }
            else if (tablename.table == "PAI_grades") {
                // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>PAI 1</th><th>PAI 2</th><th>PAI 3</th>`;
                tableHeaders.appendChild(headerRow);
                
                result.forEach(cadet => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${cadet.name}</td><td>${cadet.student_id}</td><td>${cadet.pai_1}</td><td>${cadet.pai_2}</td><td>${cadet.pai_3}</td>`;
                tableRows.appendChild(row);
                });

            }
            else if (tablename.table == "rooming") {
                // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>Room Number</th>`;
                tableHeaders.appendChild(headerRow);
                
                result.forEach(room => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${room.name}</td><td>${room.student_id}</td><td>${room.room_num}</td>`;
                tableRows.appendChild(row);
                });

            } 
            else if (tablename.table == "lunch_arrangement") {
                // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>Table ID</th>`;
                tableHeaders.appendChild(headerRow);
                
                result.forEach(cadet => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${cadet.name}</td><td>${cadet.student_id}</td><td>${cadet.table_id}</td>`;
                tableRows.appendChild(row);
                });

            }
            else if (tablename.table == "birthdays") {
                // hardcode headers into display-headers
                const headerRow = document.createElement("tr");
                tableHeaders.innerHTML = `<th>Name</th><th>Student ID</th><th>Birthday</th>`;
                tableHeaders.appendChild(headerRow);
                
                result.forEach(cadet => {  
                const row = document.createElement("tr");
                row.innerHTML = `<td>${cadet.name}</td><td>${cadet.student_id}</td><td>${cadet.birthday}</td>`;
                tableRows.appendChild(row);
                });

            }

        } else {
            // Show error alert if registration fails
            console.log("display not OK");
        }

    } catch (error) {
        console.error("... error in display_given_table");
        console.error("Error during display_given_table:", error);
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


