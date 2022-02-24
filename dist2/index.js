//Run "npm run dev" for compiling any changes


//code to execute bi directional communication with chat bot.
window.onload = function() {

    // code to maximize, minimize chat bot.
    function toggle1() {
        var e = document.getElementById("containerchtbx");
        e.classList.toggle("active");
        var x = document.getElementById("active");
        if (x.style.display == "none" || x.style.display == '') {
            x.style.display = "block";
            if (first_toggle) {
                appendchatBx(false, "|start|");
                first_toggle = false;
            }
        } else
            x.style.display = "none";
    }

    window.toggle1 = toggle1;
    let first_toggle = true;
    // Stores choices of user
    let choice = [0, 0, 0, 0, 0, 0];
    // Stores current index of choice
    let index = 0;
    // 'true' when choices end
    let end = false;
    // User details
    let user_course = "";
    let user_name = "";
    let user_roll = "";
    let user_mail = "";
    let user_batch = "";
    let user_drop = "";
    let user_purpose = "";
    let user_year = "";
    // 'true' when taking input from user for email
    let taking_input = false;
    // 'true' when taking name of user (at start of chat)
    let taking_name = false;
    // iter is used when taking user details along with 'taking_input"
    let iter = 0;

    const courses = {
        1: "BBA",
        2: "BCA",
        3: "B.Com",
        4: "BA JMC",
        5: "BALLB"
    };

    const tips_syllabus = "https://www.tips.edu.in/syllabus";
    const tips_success = "https://tips.edu.in/tipsian-success-stories";
    const tips_fee = "https://tips.edu.in/fee-structure";
    const tips_migration_form = "#";
    const tips_whatsapp_student_support = "#";
    const tips_student_support_mail = "studentsupport@tips.edu.in";
    const tips_grace_marks_form = "#";
    const tips_dropout_form = "#";
    const tips_DDdetails = "#";
    const tips_hrd_email = "tipsdwarkahrd@gmail.com";
    const tips_hrd_form = "https://tips.edu.in/download_file/13.pdf";
    const tips_hrd_support_no = "9315911710";
    const tips_bca_no = "9654604666";
    const tips_bba_bcom_no = "9315911713";
    const tips_law_no = "9315911716";
    const tips_bjmc_no = "9315911707";

    const wrong_roll = "Wrong Enrollment Number: <br>Make sure number does not contain any alphabet <br>Enter again";
    const wrong_mail = "Wrong E-mail ID: <br>Please check entered E-mail ID <br>Enter again";
    const greetings = "Hello, I\'m Chat Bot of Trinity Institute Of Professional Studies. <br>Please enter your name:";
    const options = {
        // '|user_name|' will be replaced by user name
        "0": "Hello |user_name|. <br>I Operate best when asked short, direct questions. <br>Enter \'reset\' anytime to reset the options <br>What would you like to talk about <br>   1. Admissions <br>   2. Student Support <br>   3. Accounts <br>   4. HR",
        // Admission
        "1": {
            "0": "Courses Offered <br>   1. BBA <br>   2. BCA <br>   3. B.Com <br>   4. BA JMC <br>   5. BA LLB",
            "any": {
                "0": "Choose Action <br>   1. Contact Admission Counsellor <br>   2. Syllabus, Duration & Promotion Criteria <br>   3. Placements <br>   4. Fee Structure ",
                // '|course|' & '|c_number|' will be replaced by user course and respective department number
                "1": "Contact Admission counsellor of |course| at |c_number|.",
                "2": "To view syllabus visit <br><a href=\"" + tips_syllabus + "\" target=\"_blank\">This Site</a>",
                "3": "Placement Link <br><a href=\"" + tips_success + "\" target=\"_blank\">This Site</a>",
                "4": "Fee - <a href=\"" + tips_fee + "\" target=\"_blank\">This Site</a>"
            }
        },
        // Student cell
        "2": {
            "0": "Choose From: <br>   1. Degree <br>   2. Bonafide <br>   3. Requirement of Transcripts regarding higher studies <br>   4. Migration <br>   5. Correction of Name <br>   6. Marksheets / Provisional / Consolidated <br>   7. Issuance of Backlog Certificate <br>   8. Issuance of NOC for summer Internship <br>   9. Grace Marks <br>   10. Issuance of Provisioal Certificate <br>   11. Drop Out Form",
            "1": { // send Email
                "1a": "Query about Degree <br>Enter Enrollment number",
                "2a": "Enter E-mail ID",
                "3a": "Enter Course",
                "4a": "Enter Batch",
                "5a": "Are you Drop out (Yes/No)"
            },
            "2": { // Send email
                "1a": "Bonafide <br>Enter Enrollment number",
                "2a": "Enter E-mail ID",
                "3a": "Enter Purpose"
            },
            "3": "For Transcripts regarding higher studies: <br>1. University (Send application to Controller of Examination) + marksheets (Photocopy of Regular and Reappear) <br>2. Institute (Send application to Director) + Marksheets (Photocopy of Regular + Reappear)",
            // Add url
            "4": "Migration <br>Please follow Following instructions: <br>Download migration form from University Site-> <a href=\"" + tips_migration_form + "\" target=\"_blank\">Download Form</a> <br>Submit with Provisional + Consolidated Marksheets <br>Fill it and submit it in the university after getting attested from the Director of the Institute.",
            "5": "Correction of Name <br>Please follow Following instructions: <br>Hand written Application + 500 Rs Challan - To be submitted in the university, Along with 10th Certificate, 12th marksheet, All Xerox of Marksheet, Affidavit by the SDM and Adhar Card.",
            // Add whatsapp number
            "6": "Marksheets/Provisional/Consolidated <br>Whatsapp No. " + tips_whatsapp_student_support + " of student Cell for further communication email to" + tips_student_support_mail + ".",
            "7": "Issuance of Backlog Certificate <br>Follow these instructions: <br>Write application to the Director + All Regular and Reappear marksheets or pdf result <br>Then submit it in the institute.",
            "8": "Issuance of NOC for summer Internship: <br>Write an application in favor of the Director needs to be submitted / Shared with Student Support <br>Then submit it in the institute.",
            // Add site
            "9": "Grace Marks: <br>Download form from the University Site " + tips_grace_marks_form + " - All Regular + Reappear marksheets(xerox or pdf result) <br>Then Submit it in the univeristy / institute after getting attested from the Director of the Institute.",
            "10": "Issuance of provisional Certificate: <br>Write application to the Director + Marksheets(regular/ reappear) + pdf result <br>Then Submit it in the institute.",
            // Add site
            "11": "Drop Out Form <br>Download form from the University Site " + tips_dropout_form + " - All Regular + Reappear marksheets(xerox or pdf result) <br>Then Submit it in the univeristy / institute after getting attested from the Director of the Institute."
        },
        // Accounts
        "3": {
            "0": "Choose from: <br>   1. Fee Payment <br>   2. Fee Structure <br>   3. Security",
            "1": "Visit our official site and click on Pay fee ", // <br> OR <br>DD Details: " + tips_DDdetails, // Add DD details
            "2": "Visit <a href=\"" + tips_fee + "\" target=\"_blank\">this site</a> to see fee structure",
            "3": { // send Email
                "1a": "Security <br>Enter Enrollment number",
                "2a": "Enter E-mail ID",
                "3a": "Enter Batch",
                "4a": "Enter Year"
            }
        },
        // HR
        "4": {
            "0": "Job Options <br>   1. Teaching <br>   2. Non-Teaching",
            "1": "Teaching Jobs are available for: <br>B.COM, BBA, BCA, BA LLB, BA JMC <br>As: <br>Professor, Associate Professor, Assistant Professor <br><br>If Interested e-mail your resume at: " + tips_hrd_email + " <br>Along with this document - <a href=\"" + tips_hrd_form + "\" target=\"_blank\">Click Here</a> <br><br>For Further assistance Contact - " + tips_hrd_support_no,
            "2": "Non-Teaching Jobs include: <br>Accountant <br>HR / Admin Assistant <br>Examination <br>Receptionist <br>IT / Hardware engineer / Audio / Video Lab <br>Librarian <br><br>If Interested e-mail your resume at: " + tips_hrd_email + " <br>Along with this document - <a href=\"" + tips_hrd_form + "\" target=\"_blank\">Click Here</a> <br><br>For Further assistance Contact - " + tips_hrd_support_no
        }
    };

    const submit = document.querySelector(".chat-submit");
    const chatBx = document.querySelector(".chat-box");
    const chatInp = document.querySelector(".chat-input");
    document.getElementById("sub").focus();

    function chattemp(botOrhuman) {
        return (
            `
        <div class="bot-human-container">
          <div class="${botOrhuman.class}">
            <p>${botOrhuman.text}</p>
          </div>
          <span class="${botOrhuman.class}-date">${botOrhuman.date}</span>
        </div>
      `
        );
    }

    function callfun() {
        if (chatInp.value != "") {
            document.getElementById("sub").disabled = true;
            appendchatBx(true, chatInp.value);
            document.getElementById("sub").disabled = false;
            document.getElementById("sub").focus();
        }
    }

    submit.addEventListener("click", function(e) {
        callfun();
    });

    document.addEventListener("keypress", function(e) {
        if (e.keyCode == "13")
            callfun();
    });

    async function appendchatBx(fromhuman, input) {
        const date = new Date();

        if (!fromhuman)
            date.setSeconds(date.getSeconds() + 2);

        if (fromhuman && !chatInp.value.trim())
            return;

        const timestamp = date.toLocaleTimeString();
        const newChatDiv = chattemp({
            class: fromhuman ? "human" : "bot",
            text: fromhuman ? chatInp.value.trim() : await botResponse(input),
            date: timestamp
        });

        if (!fromhuman) {
            chatBx.innerHTML += newChatDiv;
            chatBx.scrollTop = chatBx.scrollHeight;
        } else {
            chatBx.innerHTML += newChatDiv;
            chatBx.scrollTop = chatBx.scrollHeight;
        }

        if (fromhuman) {
            chatInp.value = "";
            appendchatBx(false, input);
        }
    }

    function get_roll(content) {
        if (/^\d+$/.test(content) && content.length > 8) {
            user_roll = content;
            console.log("no. = " + user_roll);
            return true;
        }
        return false;
    }

    function get_mail(content) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(content)) {
            user_mail = content;
            console.log("Mail = " + user_mail);
            return true;
        }
        return false;
    }

    async function botResponse(content) {
        console.log("botResponse called " + content);

        content = content.trim();
        console.log("Content = " + content);
        content = content.toLowerCase();

        if (content == "reset") {
            choice = [0, 0, 0, 0, 0, 0];
            index = 0;
            iter = 0;
            taking_input = false;
            end = false;
            return options["0"];
        } else if (first_toggle || taking_name) {
            if (!taking_name) {
                console.log("not taking input");
                taking_name = true;
                return greetings;
            }
            content = content.toUpperCase();
            taking_name = false;
            console.log("user name = " + content);
            user_name = content;
            options["0"] = options["0"].replace("|user_name|", user_name);
            return options["0"];
        }


        let response = "";
        if ((content.length < 3 && Number.isInteger(parseInt(content)) || taking_input)) {
            if (end)
                return "Enter \'reset\' to go back to menu";

            if (!taking_input) {
                choice[index] = parseInt(content);
                index += 1;
            }
            console.log("choice = " + choice)
            return await normalChat(content);
        }

        response = await sendText(content);
        console.log("Back to botResponse = " + response);
        return response;
    }

    async function normalChat(content) {
        let response = "";
        switch (choice[0]) {
            case 1:
                // Admission
                console.log("Admission")
                if (choice[1] == 0) {
                    console.log("Course List")
                    return options["1"]["0"];
                } else {
                    user_course = courses[choice[1]];
                    console.log("Course = " + user_course)

                    if (choice[2] == 0) {
                        console.log("Action List")
                        return options["1"]["any"]["0"];
                    } else {
                        if (choice[2] == 1) {
                            // response = await sendEmail(1.1);
                            // return response;
                            let num = "";
                            if (choice[1] == 1 || choice[1] == 3)
                                num = tips_bba_bcom_no;
                            else if (choice[1] == 2)
                                num = tips_bca_no;
                            else if (choice[1] == 4)
                                num = tips_bjmc_no;
                            else if (choice[1] == 5)
                                num = tips_law_no;
                            else
                                num = "some internal error";
                            end = true;
                            return options["1"]["any"]["1"].replace("|c_number|", num).replace("|course|", user_course);
                        }
                        console.log("Info")
                        end = true;
                        return options["1"]["any"][choice[index - 1]];
                    }
                }
            case 2:
                // Student Support
                console.log("Student Support")

                switch (choice[1]) {
                    case 0:
                        console.log("Choice List")
                        return options["2"]["0"];
                    case 1:
                        console.log("Degree")
                        taking_input = true;
                        switch (iter) {
                            case 1:
                                if (get_roll(content))
                                    break;
                                return wrong_roll;
                            case 2:
                                if (get_mail(content))
                                    break;
                                return wrong_mail;
                            case 3:
                                user_course = content;
                                console.log("Course = " + user_course);
                                break;
                            case 4:
                                user_batch = content;
                                console.log("Batch = " + user_batch);
                                break;
                            case 5:
                                if (content.charAt(0) == "y")
                                    user_drop = "yes";
                                else
                                    user_drop = "no";
                                taking_input = false;
                                iter = 0;
                                end = true;
                                console.log("Drop = " + user_drop);
                                response = await sendEmail(2.1);
                                return response;
                                // return "Email sent";
                        }
                        iter += 1;
                        return options["2"]["1"][iter + "a"];
                    case 2:
                        console.log("Bonafied");
                        taking_input = true;
                        switch (iter) {
                            case 1:
                                if (get_roll(content))
                                    break;
                                return wrong_roll;
                            case 2:
                                if (get_mail(content))
                                    break;
                                return wrong_mail;
                            case 3:
                                user_purpose = content;
                                console.log("Purpose = " + user_purpose);
                                iter = 0;
                                end = true;
                                taking_input = false;
                                response = await sendEmail(2.2);
                                return response;
                                // return "Email sent";
                        }
                        iter += 1;
                        return options["2"]["2"][iter + "a"];
                    default:
                        console.log("3 - 11");
                        end = true;
                        return options["2"][choice[index - 1]];
                }
            case 3:
                // Accounts
                console.log("Accounts")

                switch (choice[1]) {
                    case 0:
                        console.log("Choice List")
                        return options["3"]["0"];
                    case 3:
                        console.log("DD")
                        taking_input = true;
                        switch (iter) {
                            case 1:
                                if (get_roll(content))
                                    break;
                                return wrong_roll;
                            case 2:
                                if (get_mail(content))
                                    break;
                                return wrong_mail;
                            case 3:
                                user_batch = content;
                                console.log("Batch = " + user_batch);
                                break;
                            case 4:
                                // check year
                                user_year = content;
                                taking_input = false;
                                iter = 0;
                                end = true;
                                console.log("Year = " + user_year);
                                response = await sendEmail(3.3);
                                return response;
                                // return "Email sent";
                        }
                        iter += 1;
                        return options["3"]["3"][iter + "a"];
                    default:
                        console.log("1, 2");
                        end = true;
                        return options["3"][choice[index - 1]];
                }
            case 4:
                // HR
                console.log("HR")
                if (choice[1] == 0) {
                    return options["4"]["0"];
                } else {
                    console.log("1, 2");
                    end = true;
                    return options["4"][choice[index - 1]];
                }
        }
    }

    async function sendText(text) {
        console.log("sendText called " + text);
        const target = "Bot-response-function";
        const content = {
            "method": "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "user-input": text,
                "response": ""
            })
        };
        const response = await https_request(target, content);
        console.log("Sending Response: " + response.body.response);
        return response.body.response;
    }

    async function sendEmail(option) {
        let content = "";
        switch (option) {
            // case 1.1:
            //     console.log("Counsellor (Incomplete)");
            //     break;
            case 2.1:
                console.log("Degree Email");
                content = {
                    "method": "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "case": 2.1,
                        "name": user_name,
                        "roll": user_roll,
                        "mail": user_mail,
                        "course": user_course,
                        "batch": user_batch,
                        "drop": user_drop
                    })
                };
                break;
            case 2.2:
                console.log("Bonafide");
                content = {
                    "method": "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "case": 2.2,
                        "name": user_name,
                        "mail": user_mail,
                        "roll": user_roll,
                        "purpose": user_purpose
                    })
                };
                break;
            case 2.3:
                console.log("Transcripts (Incomplete)")
                break;
            case 3.3:
                console.log("Security");
                content = {
                    "method": "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "case": 3.3,
                        "name": user_name,
                        "roll": user_roll,
                        "mail": user_mail,
                        "batch": user_batch,
                        "year": user_year
                    })
                };
                break;
            default:
                console.log("Internal error");
                return "Internal error";
        }
        const target = "email-function";
        const response = await https_request(target, content);
        console.log("Sending Response: " + response.body.response);
        return response.body.response;
    }

    function https_request(target, content) {

        console.log("https start");
        const https = require("node-fetch");

        // const url = "https://sharadjain1999.pythonanywhere.com/" + target;
        const url = "http://127.0.0.1:5000/" + target;

        return new Promise(function(resolve, reject) {
            fetch(url, content)
                .then(response => response.json())
                .then(response => {
                    console.log("String " + JSON.stringify(response))
                    resolve(response)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })

    }
}