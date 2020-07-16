A design of an API for the doctors of a Hospital to keep details of testing, quarantine and well being of COVID-19 patients.

Set up the project using command "npm init"
Moreover you can also use postman for sending requests.

Theme of the api is as follows:-

- Doctors can log in
- Each time a patient visits, the doctor will follow 2 steps
- Register the patient  (using phone number, if the patient
  already exists, it would return the patient info in the API)
- After the checkup, doctor will create a Report
- Patient Report will have the following fields
      - Created by doctor
      - Status : Can be either of: [Negative, Travelled-Quarantine,
         Symptoms-Quarantine, Positive-Admit]
      - Date



FOLDER STRUCTURE EXPLAINATION
-> Actions of the api are stored in controllers/api.v1(version)
-> All the routes of api are stored in routes/api/v1(version)
-> In "models" folder there are 3 schemas
   -doctor(contains information of doctor)
   -patient(contains information of each patient and its report)
   -patient-report(contains all the reports)

 Routes
- /doctors/register 
- /doctors/login (returns JWT)
- /patients/register
- /patients/:id/create_report
- /patients/:id/all_reports 
- /reports/:status ( List of all the reports of all the patients filtered by a specific status)
