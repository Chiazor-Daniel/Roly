# Project Report: Conference Registration Web Application

**Course:** CSC412 - Web Application Development
**Client:** Rolly and Ini Human Resource Centre

---

## 1. Introduction

This report details the design and development of a modern, full-stack web application built to manage registrations for a conference hosted by the Rolly and Ini Human Resource Centre. The application provides a seamless and user-friendly experience for attendees to register, while also offering an administrative view to manage and review submissions.

The primary objective was to fulfill a set of specific requirements, including a dynamic homepage, a comprehensive registration form with robust validation, data persistence, and clear user feedback.

---

## 2. Technology Stack

The application was built using a modern, industry-standard technology stack to ensure performance, scalability, and a high-quality user experience.

-   **Framework:** [Next.js](https://nextjs.org/) (v15) - A React framework for building server-rendered and statically generated web applications.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript that enhances code quality and developer productivity.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and reusable components.
-   **Form Management:** [React Hook Form](https://react-hook-form.com/) - For efficient and powerful form state management.
-   **Schema Validation:** [Zod](https://zod.dev/) - A TypeScript-first schema declaration and validation library used for ensuring data integrity.
-   **Backend Logic:** [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - Used for handling form submissions and server-side logic without needing a separate backend server.

---

## 3. Features Implemented

The application successfully implements all the core requirements outlined in the project brief.

### 3.1. Homepage
-   **Dynamic Content:** The homepage (`/`) features a large, welcoming hero section with a background image of the conference city, as specified.
-   **Call to Action:** A prominent "Register" button is displayed, which, when clicked, smoothly transitions the user to the registration form.
-   **Informational Sections:** Additional sections highlight the key benefits of attending the conference, such as expert speakers, networking opportunities, and cutting-edge content.

### 3.2. Registration Form
-   **Comprehensive Fields:** The form, located at `/register`, includes all required input fields:
    -   First Name
    -   Last Name
    -   Street Address
    -   Email Address
    -   School or Company Affiliation
    -   Registration Date (with a calendar picker)
    -   Status (e.g., Undergraduate, Professor)
    -   Payment Method (Credit/Debit Card or PayPal)
-   **User-Friendly Design:** The form is presented in a clean, multi-column layout within a card component, with icons and realistic placeholders to guide the user. The payment method selection is enhanced with visual, clickable cards for a better user experience.

### 3.3. Form Validation
-   **Real-Time Feedback:** Each field is validated using a Zod schema (`src/lib/schema.ts`). Validation is triggered in real-time as the user interacts with the form.
-   **Clear Error Messages:** If a user enters data in an incorrect format (e.g., an invalid email) or leaves a required field blank, a descriptive error message is displayed directly below the corresponding field, allowing for immediate correction.

### 3.4. Data Submission and Storage
-   **Backend Logic:** Form submission is handled securely by a Next.js Server Action (`src/app/actions.ts`).
-   **Mock Database:** To demonstrate data persistence without requiring a live database setup, submissions are saved to a `registrations.json` file in the `src/data` directory. This file acts as a simple, file-based database.
-   **Success Confirmation:** Upon successful submission, the user is redirected to a success page that displays a confirmation message, assuring them that their registration was completed.

### 3.5. Admin Dashboard
-   **Viewing Submissions:** An administrative page is available at `/admin`.
-   **Data Table:** This page fetches all entries from the `registrations.json` file and displays them in a clean, organized table, allowing the Rolly and Ini team to review all conference registrations at a glance.

---

## 4. Code and Project Structure

The project is organized following Next.js App Router conventions, promoting maintainability and separation of concerns.

-   `src/app/page.tsx`: The main landing page component.
-   `src/app/admin/page.tsx`: The admin dashboard for viewing registrations.
-   `src/components/registration-form.tsx`: The self-contained, reusable registration form component.
-   `src/app/actions.ts`: Contains the server-side logic (`registerForConference`) for handling form submission.
-   `src/lib/schema.ts`: Defines the Zod validation schema for the registration form.
-   `src/data/registrations.json`: Acts as the mock database for storing submission data.
-   `src/components/ui/`: Contains the ShadCN UI components used throughout the application (Button, Card, Input, etc.).
-   `src/app/globals.css`: Defines global styles and Tailwind CSS theme variables.

---

## 5. Conclusion and Future Work

This project successfully delivers a robust and feature-complete conference registration platform that meets all specified requirements. The use of modern web technologies ensures a high-quality product that is both functional and easy to use.

For future development, the application is well-positioned for enhancements:
-   **Database Integration:** The file-based storage could be seamlessly upgraded to a production-grade database like **Firebase Firestore** or **PostgreSQL** to provide persistent, scalable storage.
-   **User Authentication:** An authentication system could be added to allow users to manage their registrations.
-   **Email Notifications:** Automated confirmation emails could be sent to users upon successful registration.
