# Requirements Document

## Introduction

Website destinasi wisata sederhana yang terdiri dari dua halaman frontend yang menampilkan data destinasi wisata secara dinamis. Data diambil dari backend API dengan data dummy. Frontend dibangun menggunakan HTML, CSS, dan Vanilla JavaScript.

## Glossary

- **Destination_List_Page**: Halaman yang menampilkan daftar semua destinasi wisata dalam bentuk grid atau list
- **Destination_Detail_Page**: Halaman yang menampilkan informasi lengkap dari satu destinasi wisata
- **Frontend_App**: Aplikasi client-side yang dibangun dengan HTML, CSS, dan Vanilla JavaScript
- **Backend_API**: API server yang menyediakan endpoint untuk data destinasi wisata
- **Destination_Object**: Object yang berisi informasi destinasi (id, nama, lokasi, deskripsi, harga tiket, gambar)

## Requirements

### Requirement 1: Display Destination List

**User Story:** As a visitor, I want to view a list of available destinations, so that I can browse all tourism destinations

#### Acceptance Criteria

1. WHEN THE Destination_List_Page loads, THE Frontend_App SHALL fetch destination data from THE Backend_API
2. WHEN destination data is successfully fetched, THE Destination_List_Page SHALL display all destinations in a grid or list layout
3. THE Destination_List_Page SHALL display at least the destination name and image for each destination in the list
4. WHEN a destination item is clicked, THE Frontend_App SHALL navigate to THE Destination_Detail_Page for that destination

### Requirement 2: Display Destination Details

**User Story:** As a visitor, I want to view complete information about a destination, so that I can learn more about a specific tourism destination

#### Acceptance Criteria

1. WHEN THE Destination_Detail_Page loads with a destination id, THE Frontend_App SHALL fetch that destination's data from THE Backend_API
2. WHEN destination data is successfully fetched, THE Destination_Detail_Page SHALL display the destination name
3. WHEN destination data is successfully fetched, THE Destination_Detail_Page SHALL display the destination location
4. WHEN destination data is successfully fetched, THE Destination_Detail_Page SHALL display the destination description
5. WHEN destination data is successfully fetched, THE Destination_Detail_Page SHALL display the ticket price
6. WHEN destination data is successfully fetched, THE Destination_Detail_Page SHALL display the destination image

### Requirement 3: Backend API Endpoints

**User Story:** As a frontend developer, I want API endpoints with dummy data, so that I can fetch destination data dynamically

#### Acceptance Criteria

1. THE Backend_API SHALL provide an endpoint that returns a list of all destinations
2. THE Backend_API SHALL provide an endpoint that returns a single destination by id
3. THE Backend_API SHALL return Destination_Object data in JSON format
4. THE Destination_Object SHALL contain id, name, location, description, ticket price, and image URL fields

### Requirement 4: Handle API Loading State

**User Story:** As a visitor, I want to see a loading indicator, so that I know the page is fetching data

#### Acceptance Criteria

1. WHILE THE Frontend_App is fetching data from THE Backend_API, THE Frontend_App SHALL display a loading indicator
2. WHEN data is successfully loaded, THE Frontend_App SHALL hide the loading indicator
3. WHEN data is successfully loaded, THE Frontend_App SHALL display the fetched content

### Requirement 5: Handle API Errors

**User Story:** As a visitor, I want to see an error message when data fails to load, so that I understand what went wrong

#### Acceptance Criteria

1. IF THE Backend_API request fails, THEN THE Frontend_App SHALL display an error message to the user
2. IF THE Backend_API returns no data, THEN THE Frontend_App SHALL display a "no destinations found" message
3. IF a destination id is invalid on THE Destination_Detail_Page, THEN THE Frontend_App SHALL display a "destination not found" message

### Requirement 6: Navigation Between Pages

**User Story:** As a visitor, I want to navigate between list and detail pages, so that I can explore destinations and return to the list

#### Acceptance Criteria

1. WHEN viewing THE Destination_Detail_Page, THE Frontend_App SHALL provide a way to return to THE Destination_List_Page
2. WHEN a user returns to THE Destination_List_Page from THE Destination_Detail_Page, THE Frontend_App SHALL display the destination list
3. THE Frontend_App SHALL update the browser URL when navigating between pages

### Requirement 7: Responsive Layout

**User Story:** As a visitor, I want the website to work on different screen sizes, so that I can view it on desktop and mobile devices

#### Acceptance Criteria

1. THE Destination_List_Page SHALL display destinations in a responsive grid layout that adapts to screen width
2. THE Destination_Detail_Page SHALL display content in a readable layout on both desktop and mobile screen sizes
3. WHEN the screen width is below 768 pixels, THE Frontend_App SHALL adjust the layout for mobile viewing
