# 🎥 YouTube Viewer — Enhanced Version

This is an extended version of the YouTube Viewer starter project.
→ Built with **React**, **Redux Toolkit**, **TypeScript**, and **Hooks**.
→ Added functionality to preview comments and replies for each selected video.

---

## 🚀 Features Added

- ✅ Search and play YouTube videos.
- ✅ View **comments** for each selected video.
- ✅ Expand/collapse **replies** for each comment.
- ✅ Sort comments by **Top Comments** or **Newest First**.
- ✅ Converted the entire app to **TypeScript** for type safety.
- ✅ Refactored to use **React Hooks** and **Redux Toolkit** for state management.
- ✅ Structured for a production-ready approach.

---

## 🛠️ Tech Stack

- React
- Redux Toolkit
- TypeScript
- YouTube Data API v3

---

## 📆 Getting Started

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/Sathya0608/youtube-viewer.git
cd youtube-viewer
```

### 2️⃣ Install dependencies:

```bash
yarn install
# or
npm install
```

### 3️⃣ Add API Key:

- Open `App.tsx`.
- Update this line with your API key:

```ts
const API_KEY = "YOUR_API_KEY";
```

- You can use the provided key:

```
AIzaSyCbcQMTPqAevOao2BQsQadm5SFTZljP2dM
```

- Or generate one from [Google Developer Console](https://console.developers.google.com/).

---

## 🔥 Run the Project:

```bash
yarn start
# or
npm start
```

Open [http://localhost:3000](http://localhost:3000) or [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

---

## 🗂️ Folder Structure

```
src/
🔼︎ components/        // UI Components
🔼︎ store/             // Redux slices and store setup
🔼︎ types/             // TypeScript interfaces
🔼︎ App.tsx            // Main app file
🔼︎ App.css            // Styling
🔼︎ index.tsx          // App entry point
```

---

## 💡 Suggestions for Future Improvements

- Pagination or infinite scroll for comments and video list.
- Improved error handling with user-friendly UI.
- Add a loading spinner for data fetches.
- UI enhancements with Tailwind CSS or Material UI.

---

## 📄 License

This project is for educational and assessment purposes only.

---

## 🔗 Credits

Original boilerplate provided by: [g-ioannidi5/youtube-viewer](https://github.com/g-ioannidi5/youtube-viewer)

---

## ✅ Final Note

→ The app runs fully with Redux, Hooks, and TypeScript.
→ Comments feature with replies and sorting is fully functional.

---
