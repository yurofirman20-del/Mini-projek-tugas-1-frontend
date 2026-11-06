# Design Document: Tourism Destination Website

## Overview

Website destinasi wisata ini adalah aplikasi web sederhana yang terdiri dari frontend dan backend. Frontend dibangun menggunakan HTML, CSS, dan Vanilla JavaScript murni tanpa framework, mengikuti prinsip progressive enhancement dan separation of concerns. Backend adalah REST API sederhana yang menyediakan data dummy destinasi wisata.

**Arsitektur Utama:**
- **Frontend**: Single Page Application (SPA) dengan vanilla JavaScript, menggunakan client-side routing
- **Backend**: REST API server dengan data dummy yang disimpan dalam memory
- **Komunikasi**: Fetch API untuk HTTP requests ke backend endpoints

**Technology Stack:**
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Backend: Node.js dengan Express.js (atau teknologi serupa)
- Data Format: JSON

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         Browser (Client)                 │
│  ┌───────────────────────────────────┐  │
│  │  HTML Pages + CSS + JS            │  │
│  │  ┌─────────────┐  ┌────────────┐ │  │
│  │  │ List Page   │  │ Detail Page │ │  │
│  │  └─────────────┘  └────────────┘ │  │
│  │         │                │        │  │
│  │         └────────┬───────┘        │  │
│  │                  │                │  │
│  │         ┌────────▼────────┐       │  │
│  │         │  API Service    │       │  │
│  │         │  (Fetch API)    │       │  │
│  │         └────────┬────────┘       │  │
│  └──────────────────┼────────────────┘  │
└────────────────────┼─────────────────────┘
                     │ HTTP/JSON
                     │
┌────────────────────▼─────────────────────┐
│         Backend API Server               │
│  ┌───────────────────────────────────┐  │
│  │  REST API Endpoints               │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │ GET /api/destinations       │ │  │
│  │  │ GET /api/destinations/:id   │ │  │
│  │  └─────────────────────────────┘ │  │
│  │              │                   │  │
│  │         ┌────▼─────┐             │  │
│  │         │  Dummy   │             │  │
│  │         │  Data    │             │  │
│  │         └──────────┘             │  │
│  └───────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Frontend Architecture Pattern

Frontend menggunakan **Module Pattern** dengan separation of concerns:

1. **Presentation Layer** (HTML/CSS): Struktur dan styling
2. **Application Layer** (JavaScript Modules):
   - **Router**: Menangani client-side routing
   - **API Service**: Menangani komunikasi dengan backend
   - **UI Components**: Menangani rendering dan interaksi UI
   - **State Management**: Mengelola application state

### Client-Side Routing Strategy

Menggunakan **Hash-based routing** (`#/`) untuk kompatibilitas maksimal tanpa konfigurasi server:
- `/` atau `/#/` → List Page
- `/#/destination/:id` → Detail Page

## Components and Interfaces

### Frontend File Structure

```
frontend/
├── index.html              # Entry point, SPA shell
├── css/
│   ├── main.css           # Global styles
│   ├── list.css           # List page styles
│   └── detail.css         # Detail page styles
├── js/
│   ├── app.js             # Application initialization
│   ├── router.js          # Client-side routing
│   ├── api.js             # API service layer
│   ├── components/
│   │   ├── destinationList.js   # List page component
│   │   ├── destinationDetail.js # Detail page component
│   │   ├── loading.js           # Loading indicator
│   │   └── error.js             # Error message component
│   └── utils/
│       └── dom.js         # DOM utility functions
└── assets/
    └── images/            # Static images
```

### Backend File Structure

```
backend/
├── server.js              # Express server setup
├── routes/
│   └── destinations.js    # Destination routes
├── data/
│   └── destinations.js    # Dummy data
└── middleware/
    └── cors.js           # CORS configuration
```

### Component Breakdown

#### 1. Router Module (`router.js`)

**Responsibility**: Menangani navigasi dan routing

**Interface**:
```javascript
class Router {
  constructor()
  init()                          // Initialize router
  navigate(path)                  // Navigate to path
  getCurrentRoute()               // Get current route info
  on(path, handler)              // Register route handler
}
```

**Key Functions**:
- Listen to `hashchange` events
- Parse URL hash untuk extract route dan parameters
- Trigger appropriate page component

#### 2. API Service Module (`api.js`)

**Responsibility**: Menangani semua komunikasi dengan backend

**Interface**:
```javascript
class ApiService {
  constructor(baseURL)
  async getAllDestinations()      // Returns Promise<Destination[]>
  async getDestinationById(id)    // Returns Promise<Destination>
}
```

**Error Handling**:
- Network errors
- HTTP error responses (4xx, 5xx)
- JSON parsing errors
- Timeout handling

#### 3. Destination List Component (`destinationList.js`)

**Responsibility**: Render dan manage list page

**Interface**:
```javascript
class DestinationList {
  constructor(apiService, container)
  async render()                  // Render list page
  handleDestinationClick(id)      // Navigate to detail
  destroy()                       // Cleanup event listeners
}
```

**State**:
- `destinations`: Array of destination objects
- `loading`: Boolean loading state
- `error`: Error message string or null

**Rendering Flow**:
1. Show loading indicator
2. Fetch data via API service
3. Hide loading, render destination cards
4. Handle errors if any

#### 4. Destination Detail Component (`destinationDetail.js`)

**Responsibility**: Render dan manage detail page

**Interface**:
```javascript
class DestinationDetail {
  constructor(apiService, container)
  async render(id)                // Render detail for destination id
  handleBackClick()               // Navigate back to list
  destroy()                       // Cleanup event listeners
}
```

**State**:
- `destination`: Single destination object
- `loading`: Boolean loading state
- `error`: Error message string or null

#### 5. Loading Component (`loading.js`)

**Responsibility**: Display loading indicator

**Interface**:
```javascript
function showLoading(container)   // Show loading in container
function hideLoading(container)   // Remove loading indicator
```

#### 6. Error Component (`error.js`)

**Responsibility**: Display error messages

**Interface**:
```javascript
function showError(container, message)  // Display error message
function clearError(container)          // Remove error message
```

### Backend API Components

#### Destinations Routes (`routes/destinations.js`)

**Endpoints**:

1. **GET /api/destinations**
   - Returns: Array of all destinations
   - Response: `{ success: true, data: Destination[] }`

2. **GET /api/destinations/:id**
   - Returns: Single destination by id
   - Response: `{ success: true, data: Destination }`
   - Error: `{ success: false, error: "Destination not found" }` (404)

#### Dummy Data (`data/destinations.js`)

In-memory array berisi minimal 5 destinasi wisata dengan data lengkap.

## Data Models

### Destination Object

```typescript
interface Destination {
  id: string;              // Unique identifier (e.g., "dest-1")
  name: string;            // Destination name (e.g., "Pantai Kuta")
  location: string;        // Location (e.g., "Bali, Indonesia")
  description: string;     // Full description (paragraph)
  ticketPrice: number;     // Price in IDR (e.g., 50000)
  imageUrl: string;        // Image URL
}
```

**Example**:
```json
{
  "id": "dest-1",
  "name": "Pantai Kuta",
  "location": "Bali, Indonesia",
  "description": "Pantai Kuta adalah destinasi wisata populer di Bali dengan pemandangan sunset yang indah dan ombak yang cocok untuk surfing.",
  "ticketPrice": 50000,
  "imageUrl": "https://example.com/images/kuta-beach.jpg"
}
```

### API Response Models

#### Success Response
```typescript
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}
```

#### Error Response
```typescript
interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}
```

### Frontend State Models

#### Application State
```typescript
interface AppState {
  currentRoute: string;
  currentPage: 'list' | 'detail';
  destinations: Destination[];
  currentDestination: Destination | null;
  loading: boolean;
  error: string | null;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Assessment: Property-Based Testing Applicability

Setelah menganalisis requirements, feature ini **sebagian cocok** untuk property-based testing. Beberapa acceptance criteria melibatkan UI rendering dan interaksi browser yang lebih cocok untuk example-based testing, namun ada beberapa area yang cocok untuk PBT:

**Cocok untuk PBT**:
- API response parsing dan data transformation
- Destination object validation
- URL routing dan parsing
- Data serialization/deserialization

**Tidak cocok untuk PBT** (akan menggunakan example-based testing):
- DOM rendering dan layout
- User interaction events
- CSS responsive behavior
- Browser navigation behavior

Karena ada komponen yang cocok untuk PBT, saya akan melanjutkan dengan prework analysis untuk acceptance criteria yang relevan.

### Acceptance Criteria Testing Prework

#### Requirement 1: Display Destination List

1.1. WHEN THE Destination_List_Page loads, THE Frontend_App SHALL fetch destination data from THE Backend_API
  - Thoughts: Ini adalah integration test yang menguji bahwa fetch call dilakukan ke endpoint yang benar. Behavior tidak bervariasi dengan input—ini adalah one-time action saat page load.
  - Classification: INTEGRATION
  - Test Strategy: Verify fetch is called with correct endpoint once on page load

1.2. WHEN destination data is successfully fetched, THE Destination_List_Page SHALL display all destinations in a grid or list layout
  - Thoughts: Ini menguji DOM rendering dari data yang di-fetch. Ini adalah UI rendering test yang lebih cocok untuk snapshot atau example-based testing.
  - Classification: EXAMPLE
  - Test Strategy: Test with 2-3 example datasets, verify DOM contains expected elements

1.3. THE Destination_List_Page SHALL display at least the destination name and image for each destination in the list
  - Thoughts: Ini menguji bahwa rendering function menyertakan field yang diperlukan. Kita bisa generate random destination objects dan verify rendered HTML contains name dan imageUrl.
  - Classification: PROPERTY
  - Test Strategy: For any valid destination object, rendered HTML must contain name and image

1.4. WHEN a destination item is clicked, THE Frontend_App SHALL navigate to THE Destination_Detail_Page for that destination
  - Thoughts: Ini menguji event handler dan navigation. Ini adalah UI interaction test yang lebih cocok untuk example-based.
  - Classification: EXAMPLE
  - Test Strategy: Simulate click events and verify navigation is triggered

#### Requirement 2: Display Destination Details

2.1. WHEN THE Destination_Detail_Page loads with a destination id, THE Frontend_App SHALL fetch that destination's data from THE Backend_API
  - Thoughts: Integration test untuk memastikan fetch dipanggil dengan ID yang benar. Behavior adalah deterministic untuk given ID.
  - Classification: INTEGRATION
  - Test Strategy: Verify fetch is called with correct endpoint and ID parameter

2.2-2.6. WHEN destination data is successfully fetched, THE Destination_Detail_Page SHALL display [field]
  - Thoughts: Ini semua menguji bahwa render function menyertakan semua required fields. Kita bisa generate random destination objects dan verify bahwa semua fields (name, location, description, ticketPrice, imageUrl) ada di rendered HTML.
  - Classification: PROPERTY (combined into one property)
  - Test Strategy: For any valid destination object, rendered HTML must contain all required fields

#### Requirement 3: Backend API Endpoints

3.1. THE Backend_API SHALL provide an endpoint that returns a list of all destinations
  - Thoughts: Integration test untuk API endpoint existence dan response format.
  - Classification: INTEGRATION
  - Test Strategy: Call endpoint and verify it returns array

3.2. THE Backend_API SHALL provide an endpoint that returns a single destination by id
  - Thoughts: Integration test untuk API endpoint. Behavior varies dengan different IDs.
  - Classification: PROPERTY
  - Test Strategy: For any valid destination ID in the dataset, endpoint should return that exact destination

3.3. THE Backend_API SHALL return Destination_Object data in JSON format
  - Thoughts: Ini menguji serialization format. Kita bisa verify bahwa response bisa di-parse sebagai JSON dan structure-nya valid.
  - Classification: PROPERTY
  - Test Strategy: For any destination object, API response should be valid JSON and parseable

3.4. THE Destination_Object SHALL contain id, name, location, description, ticket price, and image URL fields
  - Thoughts: Ini schema validation. Kita bisa generate random API responses dan verify structure compliance.
  - Classification: PROPERTY
  - Test Strategy: For any destination object returned by API, it must have all required fields with correct types

#### Requirement 4: Handle API Loading State

4.1. WHILE THE Frontend_App is fetching data from THE Backend_API, THE Frontend_App SHALL display a loading indicator
  - Thoughts: Ini UI state test yang tergantung timing. Lebih cocok untuk example-based dengan mocking.
  - Classification: EXAMPLE
  - Test Strategy: Mock slow API response, verify loading indicator appears

4.2-4.3. WHEN data is successfully loaded, THE Frontend_App SHALL hide the loading indicator and display content
  - Thoughts: UI state transition test.
  - Classification: EXAMPLE
  - Test Strategy: Mock API response, verify loading indicator removed and content appears

#### Requirement 5: Handle API Errors

5.1. IF THE Backend_API request fails, THEN THE Frontend_App SHALL display an error message to the user
  - Thoughts: Error handling behavior. Kita bisa generate different error types dan verify error message ditampilkan.
  - Classification: PROPERTY
  - Test Strategy: For any API error (network, 4xx, 5xx), error message should be displayed

5.2. IF THE Backend_API returns no data, THEN THE Frontend_App SHALL display a "no destinations found" message
  - Thoughts: Edge case untuk empty array response.
  - Classification: EDGE_CASE
  - Test Strategy: Test with empty array response, verify specific message

5.3. IF a destination id is invalid on THE Destination_Detail_Page, THEN THE Frontend_App SHALL display a "destination not found" message
  - Thoughts: Error case untuk invalid ID. Kita bisa generate random invalid IDs dan verify error handling.
  - Classification: PROPERTY
  - Test Strategy: For any ID not in the dataset, "destination not found" message should appear

#### Requirement 6: Navigation Between Pages

6.1. WHEN viewing THE Destination_Detail_Page, THE Frontend_App SHALL provide a way to return to THE Destination_List_Page
  - Thoughts: UI element existence test.
  - Classification: EXAMPLE
  - Test Strategy: Verify back button/link exists on detail page

6.2. WHEN a user returns to THE Destination_List_Page from THE Destination_Detail_Page, THE Frontend_App SHALL display the destination list
  - Thoughts: Navigation flow test.
  - Classification: EXAMPLE
  - Test Strategy: Navigate to detail, navigate back, verify list is displayed

6.3. THE Frontend_App SHALL update the browser URL when navigating between pages
  - Thoughts: Router behavior. Kita bisa test bahwa untuk berbagai navigation actions, URL hash diupdate dengan benar.
  - Classification: PROPERTY
  - Test Strategy: For any valid route path, navigating should update URL hash correctly

#### Requirement 7: Responsive Layout

7.1-7.3. Responsive layout requirements
  - Thoughts: CSS media query dan layout tests. Ini adalah UI rendering test yang tidak cocok untuk PBT.
  - Classification: INTEGRATION/EXAMPLE
  - Test Strategy: Visual regression testing atau manual testing di berbagai screen sizes

### Properties Reflection Analysis

Setelah reviewing prework, saya mengidentifikasi properties yang bisa digabung atau disederhanakan:

**Properties yang bisa digabung**:
- 2.2-2.6 (all detail fields) → satu property tentang completeness of rendered detail
- 3.3 dan 3.4 → bisa digabung menjadi satu property tentang API response format validity

**Redundant properties**:
- Property tentang JSON format bisa di-subsume oleh property tentang field validation karena validating fields requires valid JSON

**Final properties** setelah consolidation:
1. List page renders required fields (name, image)
2. Detail page renders all required fields  
3. API returns destination by valid ID
4. API response contains all required fields with correct types
5. Error handling displays appropriate messages
6. Invalid destination ID shows not found message
7. Navigation updates URL hash

### Property 1: List Card Rendering Completeness

*For any* valid Destination object, when rendered as a list card, the resulting HTML must contain both the destination name and image URL.

**Validates: Requirements 1.3**

### Property 2: Detail Page Rendering Completeness

*For any* valid Destination object, when rendered on the detail page, the resulting HTML must contain all required fields: name, location, description, ticket price, and image URL.

**Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6**

### Property 3: API Destination Retrieval

*For any* valid destination ID that exists in the dataset, calling GET /api/destinations/:id should return a response containing that exact destination object.

**Validates: Requirements 3.2**

### Property 4: API Response Schema Validation

*For any* destination object returned by the API (either from /api/destinations or /api/destinations/:id), the response must be valid JSON containing all required fields (id, name, location, description, ticketPrice, imageUrl) with correct data types.

**Validates: Requirements 3.3, 3.4**

### Property 5: Error Display for API Failures

*For any* API error condition (network failure, 4xx response, 5xx response, or timeout), the frontend application must display an error message to the user.

**Validates: Requirements 5.1**

### Property 6: Invalid ID Error Handling

*For any* destination ID that does not exist in the dataset, attempting to load the detail page should display a "destination not found" error message.

**Validates: Requirements 5.3**

### Property 7: URL Hash Updates on Navigation

*For any* valid navigation action (to list page or to detail page with an ID), the browser's URL hash must be updated to reflect the current route.

**Validates: Requirements 6.3**

## Error Handling

### Frontend Error Scenarios

#### 1. Network Errors
**Scenario**: API server tidak terjangkau
**Handling**:
- Catch fetch errors dalam try-catch block
- Display user-friendly error: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
- Log detailed error ke console untuk debugging

#### 2. HTTP Error Responses
**Scenario**: API returns 4xx atau 5xx status
**Handling**:
- Check response.ok before parsing JSON
- For 404: Display "Data tidak ditemukan"
- For 500: Display "Terjadi kesalahan server. Silakan coba lagi nanti."
- Generic error untuk status codes lainnya

#### 3. JSON Parsing Errors
**Scenario**: Response bukan valid JSON
**Handling**:
- Catch JSON.parse() errors
- Display: "Format data tidak valid"
- Log error details untuk debugging

#### 4. Empty Data Scenarios
**Scenario**: API returns empty array atau null
**Handling**:
- For list page: Display "Belum ada destinasi wisata tersedia"
- For detail page: Display "Destinasi tidak ditemukan"

#### 5. Invalid Route Parameters
**Scenario**: User navigates ke route dengan invalid ID
**Handling**:
- Validate ID format before API call
- Handle 404 dari API dengan "Destinasi tidak ditemukan"
- Provide link back to list page

### Backend Error Scenarios

#### 1. Invalid Destination ID
**Response**:
```json
{
  "success": false,
  "error": "Destination not found"
}
```
**HTTP Status**: 404

#### 2. Malformed Requests
**Response**:
```json
{
  "success": false,
  "error": "Bad request",
  "message": "Invalid request format"
}
```
**HTTP Status**: 400

#### 3. Server Errors
**Response**:
```json
{
  "success": false,
  "error": "Internal server error"
}
```
**HTTP Status**: 500

### Error Recovery Strategies

1. **Retry Logic**: Untuk network errors, provide manual retry button
2. **Graceful Degradation**: Jika image gagal load, show placeholder
3. **Navigation Fallback**: Jika detail page error, provide link ke list page
4. **State Persistence**: Maintain last successful state di memory

## Testing Strategy

### Testing Approach Overview

Menggunakan **dual testing approach**:
- **Unit Tests**: Specific examples, edge cases, UI interactions
- **Property-Based Tests**: Universal properties untuk data handling dan API logic
- **Integration Tests**: End-to-end flow dan external service interactions

### Property-Based Testing Configuration

**Library**: 
- Frontend: `fast-check` (JavaScript property testing library)
- Backend: `fast-check` atau `jsverify`

**Configuration**:
- Minimum **100 iterations** per property test
- Each test tagged dengan comment referencing design property

**Tag Format**:
```javascript
// Feature: tourism-destination-website, Property 1: List Card Rendering Completeness
test('destination list card contains name and image', () => {
  fc.assert(
    fc.property(destinationArbitrary, (destination) => {
      // test implementation
    }),
    { numRuns: 100 }
  );
});
```

### Test Categories

#### 1. Property-Based Tests (Universal Properties)

**Test File**: `__tests__/properties/`

- **Property 1**: List card rendering completeness
  - Generate arbitrary Destination objects
  - Render as list card
  - Assert name and imageUrl present in HTML
  - Iterations: 100

- **Property 2**: Detail page rendering completeness
  - Generate arbitrary Destination objects
  - Render detail page
  - Assert all fields present in HTML
  - Iterations: 100

- **Property 3**: API destination retrieval
  - Generate arbitrary valid IDs from dataset
  - Call API endpoint
  - Assert returned destination matches expected
  - Iterations: 100

- **Property 4**: API response schema validation
  - Generate arbitrary destination objects
  - Serialize to JSON via API
  - Parse and validate schema
  - Assert all required fields with correct types
  - Iterations: 100

- **Property 5**: Error display for API failures
  - Generate arbitrary error conditions (network, 4xx, 5xx)
  - Trigger API call
  - Assert error message displayed
  - Iterations: 100

- **Property 6**: Invalid ID error handling
  - Generate arbitrary invalid IDs (not in dataset)
  - Attempt to load detail page
  - Assert "destination not found" message
  - Iterations: 100

- **Property 7**: URL hash updates on navigation
  - Generate arbitrary valid routes
  - Trigger navigation
  - Assert URL hash updated correctly
  - Iterations: 100

#### 2. Unit Tests (Examples and Edge Cases)

**Test File**: `__tests__/unit/`

- **Router Tests**:
  - Hash parsing for list route
  - Hash parsing for detail route with ID
  - Route handler registration
  - Edge case: malformed hash strings

- **API Service Tests**:
  - getAllDestinations() success case
  - getDestinationById() success case
  - Network error handling
  - Timeout handling
  - Edge case: empty response

- **Component Tests**:
  - Loading indicator show/hide
  - Error message display/clear
  - Event listener attachment/cleanup
  - Edge case: render with null data

- **UI Interaction Tests**:
  - Click on destination card navigates to detail
  - Back button returns to list
  - Edge case: rapid navigation clicks

#### 3. Integration Tests

**Test File**: `__tests__/integration/`

- **End-to-End Flow**:
  - Load list page → displays destinations
  - Click destination → navigates to detail
  - Click back → returns to list

- **API Integration**:
  - GET /api/destinations returns array
  - GET /api/destinations/:id returns object
  - Invalid ID returns 404
  - CORS headers present

- **Loading States**:
  - Loading indicator appears during fetch
  - Content replaces loading indicator
  - Error replaces loading on failure

#### 4. Visual/Manual Tests

- **Responsive Design**:
  - Desktop layout (>768px)
  - Mobile layout (<768px)
  - Tablet layout (768px - 1024px)

- **Browser Compatibility**:
  - Chrome/Edge (Chromium)
  - Firefox
  - Safari

### Test Data Generators (for Property Tests)

**Destination Arbitrary**:
```javascript
const destinationArbitrary = fc.record({
  id: fc.stringOf(fc.constantFrom('dest-'), fc.integer(1, 1000)),
  name: fc.string({ minLength: 3, maxLength: 50 }),
  location: fc.string({ minLength: 5, maxLength: 100 }),
  description: fc.string({ minLength: 20, maxLength: 500 }),
  ticketPrice: fc.integer({ min: 0, max: 1000000 }),
  imageUrl: fc.webUrl()
});
```

**Error Arbitrary**:
```javascript
const apiErrorArbitrary = fc.oneof(
  fc.constant({ type: 'network', message: 'Network Error' }),
  fc.record({ type: 'http', status: fc.integer(400, 599) }),
  fc.constant({ type: 'timeout', message: 'Request Timeout' })
);
```

### Testing Implementation Priority

1. **Phase 1**: Setup testing infrastructure (Jest + fast-check)
2. **Phase 2**: Implement property-based tests (Properties 1-7)
3. **Phase 3**: Implement unit tests for components
4. **Phase 4**: Implement integration tests
5. **Phase 5**: Manual responsive and browser testing

### Coverage Goals

- **Line Coverage**: >80%
- **Branch Coverage**: >75%
- **Function Coverage**: >90%
- **Property Coverage**: 100% (all 7 correctness properties tested)

