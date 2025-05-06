//file: dashboard.js
// used by dashboard.html to fetch users from the database
// and udpate HTML table with user data

async function fetchUserData() {

    const formData = new FormData(document.getElementById("find-cobra"));

    // different than other similar example
    const cadet_name = {  
        name : formData.get("name")
    };


    const cadet = JSON.stringify(cadet_name);

    const responseUMD = await fetch("/api/cobraUMD", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userUMD = await responseUMD.json();

    //Now Response will be used for AMI
    const responseAMI = await fetch("/api/cobraAMI", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userAMI = await responseAMI.json();

    //Now Response will be use for SAMI
    
    const responseSAMI = await fetch("/api/cobraSAMI", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userSAMI = await responseSAMI.json();

    //Now Response will be used for PAI
    const responsePAI = await fetch("/api/cobraPAI", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userPAI = await responsePAI.json();

    
    const responseRoom = await fetch("/api/cobraRoom", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userRoom = await responseRoom.json();

    const responseLunch = await fetch("/api/cobraLunch", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userLunch = await responseLunch.json();

    const responseBirth = await fetch("/api/cobraBirth", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cadet
        })
    const userBirth = await responseBirth.json();

    if (responseUMD.ok && responseAMI.ok) {
        
        const userUMDRow = document.getElementById("userUMD");
        userUMDRow.innerHTML = ""; // clear the previous content of the table

        
        const userAMIRow = document.getElementById("userAMI");
        userAMIRow.innerHTML = ""; // clear the previous content of the table
        
        const userSAMIRow = document.getElementById("userSAMI");
        userAMIRow.innerHTML = ""; // clear the previous content of the table

        
        const userPAIRow = document.getElementById("userPAI");
        userAMIRow.innerHTML = ""; // clear the previous content of the table

        const userRoomRow = document.getElementById("userRoom");
        userRoomRow.innerHTML = ""; // clear the previous content of the table

        const userLunchRow = document.getElementById("userLunch");
        userLunchRow.innerHTML = ""; // clear the previous content of the table

        const userBirthRow = document.getElementById("userBirth");
        userBirthRow.innerHTML = ""; // clear the previous content of the table

        // for each user in result, create table row and append to table in DOM
        userUMD.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.name}</td><td>${user.student_id}</td><td>${user.class_year}</td><td>${user.cadet_rank}</td><td>${user.phone_num}</td><td>${user.email_addr}</td><td>${user.room_num}</td>`;
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

        userRoom.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.room_num}</td>`;
            userRoomRow.appendChild(row);
        });

        userLunch.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.table_id}</td>`;
            userLunchRow.appendChild(row);
        });

        userBirth.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.birthday}</td>`;
            userBirthRow.appendChild(row);
        });


    } else {
        alert("Unauthorized access!"); // comment this out when confident
        window.location.href = "/frontpage.html";
    }
}

//fetchUserData();
