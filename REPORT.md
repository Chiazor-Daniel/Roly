# Project Report: Conference Registration Web Application

**Course:** CSC412 - Web Application Development
**Client:** Rolly and Ini Human Resource Centre

---

## 1. Introduction

This report details the design and development of a modern, full-stack web application built to manage registrations for a conference hosted by the Rolly and Ini Human Resource Centre. The application provides a seamless and user-friendly experience for attendees to register, while also offering an administrative view to manage and review submissions.

The primary objective was to fulfill a set of specific requirements, including a dynamic homepage, a comprehensive registration form with robust validation, data persistence, and clear user feedback.

---

## 2. Features Implemented

The application successfully implements all the core requirements outlined in the project brief.

### 2.1. Homepage
-   **Welcoming Design:** The homepage (`/`) features a large, welcoming hero section with a background image of the conference city, as specified.
-   **Call to Action:** A prominent "Register" button is displayed, which, when clicked, smoothly transitions the user to the registration form.
-   **Informational Sections:** Additional sections highlight the key benefits of attending the conference, such as expert speakers, networking opportunities, and cutting-edge content.

### 2.2. Registration Form
-   **Comprehensive Fields:** The form, located at `/register`, includes all required input fields:
    -   First Name
    -   Last Name
    -   Street Address
    -   Email Address
    -   School or Company Affiliation
    -   Registration Date (with a calendar picker)
    -   Status (e.g., Undergraduate, Professor)
    -   Payment Method (Credit/Debit Card or PayPal)
-   **User-Friendly Design:** The form is presented in a clean, multi-column layout with icons and realistic placeholders to guide the user. The payment method selection is enhanced with visual, clickable cards for a better user experience.

### 2.3. Form Validation
-   **Real-Time Feedback:** Each field is validated as the user interacts with the form.
-   **Clear Error Messages:** If a user enters data in an incorrect format or leaves a required field blank, a descriptive error message is displayed directly below the corresponding field, allowing for immediate correction.

### 2.4. Data Submission and Storage
-   **Secure Submission:** Form submission is handled securely by the application's backend.
-   **Data Persistence:** To demonstrate data storage, submissions are saved to a file that acts as a simple, file-based database.
-   **Success Confirmation:** Upon successful submission, the user is redirected to a success page that displays a confirmation message, assuring them that their registration was completed.

### 2.5. Admin Dashboard
-   **Viewing Submissions:** An administrative page is available at `/admin`.
-   **Data Table:** This page fetches all entries from the stored data and displays them in a clean, organized table, allowing the Rolly and Ini team to review all conference registrations at a glance.

---

## 3. Conclusion and Future Work

This project successfully delivers a robust and feature-complete conference registration platform that meets all specified requirements. The application is both functional and easy to use, providing a high-quality experience for both attendees and administrators.

For future development, the application is well-positioned for enhancements:
-   **Database Integration:** The file-based storage could be upgraded to a production-grade database to provide more permanent and scalable storage.
-   **User Accounts:** An authentication system could be added to allow users to sign in and manage their own registrations.
-   **Email Notifications:** Automated confirmation emails could be sent to users upon successful registration.
