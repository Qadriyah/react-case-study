## 🎯 Objective

Build a **React application** that lets users:

- View, search, and filter a list of issues
- Drag and drop issues between columns
- Automatically **sort issues** using a custom priority score
- **Undo** issue updates with rollback behavior
- Track and display **recently accessed issues**
- Apply **role-based permissions**
- Handle real-time updates (via polling or simulated sockets)

---

## 🛠️ Tech Stack

- React + TypeScript
- React Router
- Mock API via JSON
- LocalStorage
- (Optional) Drag & Drop: `@dnd-kit/core` or equivalent

---

## ✅ Functional Requirements

### 1. **Board View (`/board`)**

- Display issues in 3 columns: `Backlog`, `In Progress`, `Done`
- Support drag & drop or button-based movement between columns
- Optimistically update UI (simulate async save with 500ms delay)
- Allow undo within 5 seconds (use a toast or button)

### 2. **Search, Filter & Sort**

- Live search by title or tags
- Filter by assignee or severity
- Sort issues **by a priority score**, computed as:
  ```
  score = severity * 10 + (daysSinceCreated * -1) + userDefinedRank
  ```
    - Highest score appears first
    - If scores match, newer issues should appear higher

### 3. **Recently Accessed Sidebar**

- Track last 5 visited issues (clicks)
- Store in `localStorage`
- Display in a sidebar or modal

### 4. **Issue Detail Page (`/issue/:id`)**

- Show full issue info
- Include a “Mark as Resolved” action
- Clicking this updates status to `Done` and triggers UI update

### 5. **Role-Based Access**

- Use provided mock user:
  ```ts
  const currentUser = { name: "Alice", role: "admin" } // or "contributor"
  ```
- Only `admin` users can:
    - Move issues between columns
    - Update priority/status
    - Mark as resolved
- `contributor` users see a read-only view

### 6. **Polling / Real-Time**

- Poll issue list every 10 seconds OR simulate live updates
- Show last sync time in the UI

---

## ✨ Bonus

- Pagination or virtual scroll
- Custom hook for polling
- Dark mode toggle
- Unit test for sorting algorithm or update logic

---

## 🚀 Getting Started

```bash
npm install
npm start
```
