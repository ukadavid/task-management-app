# Task Management App for Hospital Nurses

The **Task Management App for Hospital Nurses** is a specialized application designed to assist nurses in tracking and managing the administration of drugs to patients within a hospital setting. This app streamlines the process of assigning, tracking, and updating drug administration tasks, ensuring accurate and timely medication management. Here is an overview of the app:

## Features

- **User Authentication and Authorization:**
  - Provides secure user authentication using JSON Web Tokens (JWT).
  - Implements authorization middleware to ensure that only authorized personnel can access and perform tasks.

- **Task Management:**
  - Allows nurses to view a list of medication administration tasks assigned to them.
  - Displays important details for each task, such as patient information, drug details, dosage, and scheduled times.

- **Task Assignment:**
  - Enables authorized staff to assign medication administration tasks to specific nurses.
  - Provides a user-friendly interface for selecting patients, drugs, dosage, and scheduling tasks.

- **Task Update and Completion:**
  - Enables nurses to mark tasks as completed once medication has been administered.
  - Allows nurses to update task status and record any observations or notes related to the medication administration.

- **Error Handling and Responses:**
  - Defines common error codes and response formats to provide clear and consistent feedback to users.

- **Data Security:**
  - Ensures the security of sensitive patient data by encrypting information using strong encryption algorithms.
  - Adheres to authentication and authorization best practices to prevent unauthorized access.

- **User-friendly Interface:**
  - Offers an intuitive and user-friendly interface that enables nurses to easily navigate through tasks and record medication administration.

## Technologies Used

- **Frontend:**
  - React.js for building the user interface.
  - Context API for state management.
  - Tailwind CSS
  - Axios for making API requests.

- **Backend:**
  - Node.js and Express with Typescript for building the server.
  - MongoDB for storing task and user data.
  - JWT for user authentication and authorization.

## Usage

1. Install dependencies using `npm install` in the project root.
2. Configure the backend server and database settings in `config.js`.
3. Run the backend server using `node server.js`.
4. Run the frontend development server using `npm start`.

## Future Enhancements

- Implement a mobile app version for nurses to manage tasks on-the-go.
- Integrate barcode scanning functionality for efficient drug administration tracking.
- Enhance user experience with additional filters, sorting, and search features.

## Conclusion

The **Task Management App for Hospital Nurses** aims to simplify and streamline medication administration tasks for nurses, ensuring accurate and timely patient care within a hospital environment. The app's user-friendly interface, authentication and authorization layers, and real-time notifications contribute to improved medication management and overall patient safety.
