# Implementation Plan: Tourism Destination Website

## Overview

Website destinasi wisata ini akan diimplementasikan sebagai aplikasi web sederhana dengan frontend vanilla JavaScript dan backend REST API. Implementasi akan dilakukan secara incremental, dimulai dari setup project structure, kemudian backend API dengan dummy data, lalu frontend components dengan routing, styling, error handling, dan terakhir testing implementation.

**Technology Stack:**
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Backend: Node.js dengan Express.js
- Testing: Jest dengan fast-check untuk property-based testing
- Data Format: JSON

## Tasks

- [ ] 1. Setup project structure dan initialize projects
  - Create frontend directory structure (index.html, css/, js/, assets/)
  - Create backend directory structure (server.js, routes/, data/, middleware/)
  - Initialize Node.js project untuk backend dengan npm
  - Install Express.js dan CORS middleware dependencies
  - Create basic package.json dengan scripts untuk development
  - _Requirements: All requirements (project foundation)_

- [ ] 2. Implement backend API with dummy data
  - [ ] 2.1 Create dummy destinations data file
    - Create `backend/data/destinations.js` dengan minimal 5 destinasi wisata Indonesia
    - Each destination harus memiliki: id, name, location, description, ticketPrice, imageUrl
    - Export destinations array untuk digunakan di routes
    - _Requirements: 3.4_
  
  - [ ] 2.2 Implement destinations routes and endpoints
    - Create `backend/routes/destinations.js` dengan Express router
    - Implement GET /api/destinations endpoint yang return semua destinations
    - Implement GET /api/destinations/:id endpoint yang return single destination
    - Handle invalid ID dengan 404 response dan error message
    - Return consistent JSON format: `{ success: true, data: ... }` atau `{ success: false, error: ... }`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.3_
  
  - [ ]* 2.3 Write property test for API response schema validation
    - **Property 4: API Response Schema Validation**
    - **Validates: Requirements 3.3, 3.4**
    - Generate arbitrary destination objects menggunakan fast-check
    - Verify API response adalah valid JSON dengan all required fields
    - Verify data types correct untuk each field (string, number)
    - Run 100 iterations
  
  - [ ]* 2.4 Write property test for API destination retrieval
    - **Property 3: API Destination Retrieval**
    - **Validates: Requirements 3.2**
    - Generate arbitrary valid IDs dari existing dataset
    - Call GET /api/destinations/:id untuk each ID
    - Verify returned destination matches expected destination object
    - Run 100 iterations
  
  - [ ] 2.5 Setup Express server with CORS middleware
    - Create `backend/server.js` yang initialize Express app
    - Setup CORS middleware untuk allow frontend requests
    - Mount destinations routes ke /api path
    - Setup error handling middleware
    - Add server listening on port (e.g., 3000)
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 3. Checkpoint - Test backend API manually
  - Run backend server dan verify it starts without errors
  - Test GET /api/destinations endpoint menggunakan browser atau curl
  - Test GET /api/destinations/:id dengan valid dan invalid IDs
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement frontend foundation and routing
  - [ ] 4.1 Create HTML shell and base structure
    - Create `frontend/index.html` sebagai SPA entry point
    - Add viewport meta tag untuk responsive design
    - Include CSS files dan JavaScript modules dengan type="module"
    - Create container div untuk dynamic content rendering
    - Add basic semantic HTML structure
    - _Requirements: 1.1, 2.1, 6.1, 6.2, 7.1, 7.2_
  
  - [ ] 4.2 Implement client-side router module
    - Create `frontend/js/router.js` dengan Router class
    - Implement hash-based routing (#/ dan #/destination/:id)
    - Listen to hashchange events untuk detect navigation
    - Parse URL hash dan extract route parameters (destination ID)
    - Implement navigate() method untuk programmatic navigation
    - Implement route handler registration dengan on() method
    - _Requirements: 1.4, 6.2, 6.3_
  
  - [ ]* 4.3 Write property test for URL hash updates on navigation
    - **Property 7: URL Hash Updates on Navigation**
    - **Validates: Requirements 6.3**
    - Generate arbitrary valid routes (list route, detail routes dengan IDs)
    - Trigger navigation untuk each route
    - Verify browser URL hash updated correctly
    - Run 100 iterations
  
  - [ ]* 4.4 Write unit tests for router module
    - Test hash parsing untuk list route (#/ atau empty hash)
    - Test hash parsing untuk detail route (#/destination/dest-1)
    - Test route handler registration dan triggering
    - Test edge case: malformed hash strings

- [ ] 5. Implement API service layer
  - [ ] 5.1 Create API service module for backend communication
    - Create `frontend/js/api.js` dengan ApiService class
    - Implement getAllDestinations() method menggunakan Fetch API
    - Implement getDestinationById(id) method menggunakan Fetch API
    - Configure base URL untuk backend API (e.g., http://localhost:3000)
    - Handle fetch errors (network errors, timeout)
    - Parse JSON responses dan check response.ok status
    - Throw appropriate errors untuk different failure scenarios
    - _Requirements: 1.1, 2.1, 3.1, 3.2, 5.1_
  
  - [ ]* 5.2 Write unit tests for API service error handling
    - Test network error handling dengan mocked fetch
    - Test HTTP 4xx response handling
    - Test HTTP 5xx response handling
    - Test JSON parsing errors
    - Test timeout scenarios

- [ ] 6. Implement UI utility components
  - [ ] 6.1 Create loading indicator component
    - Create `frontend/js/components/loading.js`
    - Implement showLoading(container) function yang inject loading spinner HTML
    - Implement hideLoading(container) function yang remove loading indicator
    - _Requirements: 4.1, 4.2_
  
  - [ ] 6.2 Create error message component
    - Create `frontend/js/components/error.js`
    - Implement showError(container, message) function yang display error message
    - Implement clearError(container) function yang remove error message
    - Support different error types (network, not found, server error)
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 6.3 Create DOM utility helpers
    - Create `frontend/js/utils/dom.js`
    - Implement helper functions: createElement, clearContainer, appendChildren
    - Add sanitization helpers untuk prevent XSS attacks
    - _Requirements: 1.2, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 7. Implement destination list page component
  - [ ] 7.1 Create destination list component with rendering logic
    - Create `frontend/js/components/destinationList.js` dengan DestinationList class
    - Implement render() method yang fetch dan display destinations
    - Show loading indicator saat fetching data
    - Render destination cards dalam grid layout
    - Each card harus display: destination image, name (minimum)
    - Add click handlers pada cards untuk navigate ke detail page
    - Handle errors dan display error messages
    - Implement destroy() method untuk cleanup event listeners
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3, 5.1_
  
  - [ ]* 7.2 Write property test for list card rendering completeness
    - **Property 1: List Card Rendering Completeness**
    - **Validates: Requirements 1.3**
    - Generate arbitrary valid Destination objects menggunakan fast-check
    - Render each destination sebagai list card
    - Verify rendered HTML contains destination name dan image URL
    - Run 100 iterations
  
  - [ ]* 7.3 Write unit tests for destination list component
    - Test successful data fetch dan rendering
    - Test loading state display
    - Test error state display
    - Test click handler navigation
    - Test edge case: empty destinations array

- [ ] 8. Implement destination detail page component
  - [ ] 8.1 Create destination detail component with rendering logic
    - Create `frontend/js/components/destinationDetail.js` dengan DestinationDetail class
    - Implement render(id) method yang fetch dan display single destination
    - Show loading indicator saat fetching data
    - Render destination detail dengan ALL fields: name, location, description, ticketPrice, imageUrl
    - Format ticket price dalam Rupiah currency format
    - Add back button untuk navigate ke list page
    - Handle errors (network, invalid ID) dan display appropriate messages
    - Implement destroy() method untuk cleanup event listeners
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 4.1, 4.2, 4.3, 5.1, 5.3, 6.1_
  
  - [ ]* 8.2 Write property test for detail page rendering completeness
    - **Property 2: Detail Page Rendering Completeness**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6**
    - Generate arbitrary valid Destination objects menggunakan fast-check
    - Render each destination di detail page
    - Verify rendered HTML contains ALL required fields
    - Verify fields: name, location, description, ticketPrice, imageUrl
    - Run 100 iterations
  
  - [ ]* 8.3 Write property test for invalid ID error handling
    - **Property 6: Invalid ID Error Handling**
    - **Validates: Requirements 5.3**
    - Generate arbitrary invalid destination IDs (not in dataset)
    - Attempt to load detail page untuk each invalid ID
    - Verify "destination not found" error message displayed
    - Run 100 iterations
  
  - [ ]* 8.4 Write unit tests for destination detail component
    - Test successful data fetch dan rendering dengan valid ID
    - Test loading state display
    - Test "destination not found" error untuk invalid ID
    - Test back button navigation
    - Test edge case: API returns null atau malformed data

- [ ] 9. Checkpoint - Test frontend components integration
  - Run backend server
  - Open frontend dalam browser
  - Test navigation dari list ke detail dan kembali ke list
  - Verify loading indicators muncul dan hilang dengan benar
  - Test dengan network throttling untuk verify loading states
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement application initialization and wiring
  - [ ] 10.1 Create main application entry point
    - Create `frontend/js/app.js` yang initialize application
    - Initialize Router instance
    - Initialize ApiService instance dengan backend URL
    - Register route handlers untuk list page (#/) dan detail page (#/destination/:id)
    - Setup default route handling (redirect ke list jika route not found)
    - Initialize router dan load initial route
    - _Requirements: 1.1, 1.4, 2.1, 6.2, 6.3_
  
  - [ ]* 10.2 Write integration tests for end-to-end flows
    - Test complete flow: load list → click destination → view detail → click back → return to list
    - Test direct navigation ke detail page via URL
    - Test navigation dengan browser back/forward buttons
    - Verify state persistence dan cleanup

- [ ] 11. Implement CSS styling and responsive design
  - [ ] 11.1 Create global styles and CSS variables
    - Create `frontend/css/main.css` dengan global styles
    - Define CSS variables untuk colors, spacing, typography
    - Setup base typography dan reset styles
    - Define responsive breakpoints (mobile: <768px, tablet: 768-1024px, desktop: >1024px)
    - Style loading indicator dan error message components
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 11.2 Style destination list page
    - Create `frontend/css/list.css`
    - Implement responsive grid layout untuk destination cards
    - Desktop: 3 columns grid
    - Tablet: 2 columns grid
    - Mobile: 1 column (stacked)
    - Style destination cards: image, title, hover effects
    - Add smooth transitions dan animations
    - _Requirements: 1.2, 1.3, 7.1, 7.3_
  
  - [ ] 11.3 Style destination detail page
    - Create `frontend/css/detail.css`
    - Implement responsive layout untuk detail content
    - Desktop: two-column layout (image + content)
    - Mobile: stacked layout (image di atas, content di bawah)
    - Style all detail fields dengan proper hierarchy
    - Style back button dengan clear affordance
    - Ensure readability pada all screen sizes
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 7.2, 7.3_

- [ ] 12. Implement comprehensive error handling
  - [ ] 12.1 Add error handling for all API failure scenarios
    - Handle network errors dengan user-friendly messages
    - Handle HTTP 4xx errors dengan appropriate messages
    - Handle HTTP 5xx errors dengan server error messages
    - Handle timeout scenarios dengan timeout messages
    - Implement retry mechanism atau retry button untuk failed requests
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ]* 12.2 Write property test for error display on API failures
    - **Property 5: Error Display for API Failures**
    - **Validates: Requirements 5.1**
    - Generate arbitrary API error conditions (network, 4xx, 5xx, timeout)
    - Trigger API calls yang produce errors
    - Verify error message displayed to user untuk each error type
    - Run 100 iterations
  
  - [ ]* 12.3 Write unit tests for edge cases and error scenarios
    - Test empty destinations array response
    - Test malformed JSON response
    - Test missing fields dalam destination objects
    - Test rapid navigation clicks
    - Test browser back button during loading state

- [ ] 13. Setup testing infrastructure
  - [ ] 13.1 Configure Jest and fast-check for testing
    - Install Jest testing framework: `npm install --save-dev jest`
    - Install fast-check untuk property-based testing: `npm install --save-dev fast-check`
    - Configure Jest untuk support ES6 modules
    - Create test directory structure: `__tests__/unit/`, `__tests__/properties/`, `__tests__/integration/`
    - Setup test scripts dalam package.json
    - Configure code coverage reporting
    - _Requirements: All requirements (testing foundation)_
  
  - [ ] 13.2 Create test data generators for property tests
    - Create `__tests__/generators/destinationArbitrary.js`
    - Implement destination arbitrary generator dengan fast-check
    - Implement error arbitrary generator untuk API errors
    - Implement route arbitrary generator untuk navigation tests
    - Ensure generated data matches Destination schema
    - _Requirements: Testing data for properties_

- [ ] 14. Final checkpoint and validation
  - Run all unit tests dan verify 100% pass
  - Run all property-based tests (7 properties, 100 iterations each)
  - Test complete application flows manually
  - Test responsive design pada different screen sizes
  - Test browser compatibility (Chrome, Firefox, Safari)
  - Verify code coverage meets goals (>80% line coverage)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements untuk traceability back to original specifications
- Testing tasks (unit tests dan property-based tests) are placed as sub-tasks under their related implementation tasks
- Property-based tests validate the 7 universal correctness properties defined in the design document
- Checkpoints ensure incremental validation at critical integration points
- Backend should be implemented first sebagai foundation untuk frontend development
- Frontend implementation follows dependency order: utilities → services → components → integration
- Styling can be done incrementally alongside component development atau as separate phase
- All property tests must run 100 iterations dan be tagged dengan design property number
- Integration tests verify end-to-end flows dan state management
- Manual testing phase validates responsive design dan browser compatibility yang cannot be automated easily

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.5"] },
    { "id": 3, "tasks": ["2.3", "2.4", "4.1"] },
    { "id": 4, "tasks": ["4.2", "5.1", "6.1", "6.2", "6.3"] },
    { "id": 5, "tasks": ["4.3", "4.4", "5.2", "7.1"] },
    { "id": 6, "tasks": ["7.2", "7.3", "8.1"] },
    { "id": 7, "tasks": ["8.2", "8.3", "8.4", "10.1", "11.1"] },
    { "id": 8, "tasks": ["10.2", "11.2", "11.3", "12.1"] },
    { "id": 9, "tasks": ["12.2", "12.3", "13.1"] },
    { "id": 10, "tasks": ["13.2"] }
  ]
}
```
