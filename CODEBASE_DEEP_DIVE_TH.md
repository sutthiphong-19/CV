# เอกสารเชิงลึกสำหรับมือใหม่: อธิบายทีละบรรทัด + แผนภาพ + วิธีเริ่มแก้

เอกสารนี้เป็นภาคต่อจาก [CODEBASE_EXPLANATION_TH.md](/C:/Users/thana/OneDrive/เอกสาร/GitHub/CV/Frontend/CODEBASE_EXPLANATION_TH.md)

ไฟล์นี้จะเน้น 4 เรื่องตามที่ต้องการ:

1. อธิบายโค้ดเวอร์ชัน “ทีละบรรทัด”
2. วาด flow diagram แบบง่าย
3. ทำคู่มือ “วิธีเริ่มแก้โปรเจกต์นี้” สำหรับมือใหม่
4. ทำแผนภาพว่า component ไหนเรียก component ไหน

เอกสารนี้เขียนให้คนที่ยังไม่คุ้นกับ React อ่านได้ โดยจะค่อย ๆ อธิบายจากง่ายไปยาก

---

## 1. อ่านโปรเจกต์นี้ยังไงไม่ให้หลง

ก่อนอ่านทีละบรรทัด อยากให้จำภาพใหญ่ไว้ก่อน:

- `main.jsx` = ปุ่มเปิดเครื่อง
- `App.jsx` = โครงหลักของบ้าน
- `Header` / `Sidebar` / `BackButton` = ระบบนำทาง
- `pages/*` = ห้องแต่ละห้องในบ้าน
- `hooks/*` = สมองช่วยคิดงานซ้ำ ๆ
- `App.css` = งานตกแต่งทั้งหมด

ถ้าจำภาพนี้ได้ เวลาลงลึกทีละบรรทัดจะเข้าใจง่ายขึ้นมาก

---

## 2. Flow Diagram แบบง่าย

## 2.1 Flow ตอนเปิดเว็บครั้งแรก

```text
ผู้ใช้เปิดเว็บ
   |
   v
main.jsx
   |
   v
โหลด i18n + CSS + App
   |
   v
App.jsx
   |
   +--> Header
   |
   +--> Sidebar
   |
   +--> BackButton / Breadcrumb
   |
   +--> Routes เลือกหน้าตาม URL
            |
            +--> Home
            +--> About
            +--> Contact
            +--> Projects
            +--> Portfolio
            +--> Game
```

---

## 2.2 Flow ตอนผู้ใช้กด “ดูรายละเอียดโปรเจกต์”

```text
หน้า /projects
   |
   v
Projects.jsx แสดงการ์ดโปรเจกต์
   |
   v
ผู้ใช้กด Link "ดูรายละเอียด"
   |
   v
URL เปลี่ยนเป็น /portfolio/:section
   |
   v
App.jsx ส่งงานให้ Portfolio.jsx
   |
   v
Portfolio.jsx อ่านค่า :section จาก URL
   |
   +--> ถ้าเจอใน projectDetails
   |        |
   |        v
   |     แสดง ProjectDetail
   |
   +--> ถ้าไม่เจอใน projectDetails แต่เจอใน portfolioData
   |        |
   |        v
   |     แสดง portfolio section ปกติ
   |
   +--> ถ้าไม่เจอเลย
            |
            v
         แสดง not found
```

---

## 2.3 Flow ตอนเปลี่ยนภาษา

```text
ผู้ใช้กดปุ่ม TH / EN ที่ Header
   |
   v
i18n.changeLanguage(...)
   |
   v
i18next แจ้งว่า languageChanged
   |
   v
useTranslation() รับ event นี้
   |
   v
React re-render component ที่เรียก t(...)
   |
   v
ข้อความทั้งเว็บเปลี่ยนภาษา
```

---

## 2.4 Flow ตอนเปลี่ยนธีม

```text
ผู้ใช้กดปุ่ม Theme
   |
   v
useTheme().toggleTheme()
   |
   v
theme state เปลี่ยน light <-> dark
   |
   v
useEffect ใน useTheme ทำงาน
   |
   +--> เขียนค่าไว้ใน localStorage
   +--> ใส่ data-theme ลง body/html
   |
   v
CSS ของ dark mode / light mode เปลี่ยนตาม
```

---

## 3. Component ไหนเรียก component ไหน

```text
main.jsx
└── App
    ├── Header
    ├── Sidebar
    ├── BackButton
    └── Routes
        ├── Home
        │   └── SkillsSection
        ├── About
        │   └── SkillsSection
        ├── Contact
        ├── Projects
        │   └── ProjectCard (ประกาศอยู่ในไฟล์เดียวกัน)
        ├── Portfolio
        │   └── ProjectDetail (ประกาศอยู่ในไฟล์เดียวกัน)
        ├── Game
        ├── SnakeGame
        ├── QuizGame
        └── TypingGame
```

---

## 4. Dependency Diagram แบบมองเป็นระบบ

```text
App.jsx
  |
  +--> ใช้ react-router-dom
  +--> ใช้ App.css
  +--> ใช้ components/*
  +--> ใช้ pages/*

Header / Sidebar / BackButton / Pages
  |
  +--> useTranslation()
  |      |
  |      +--> i18n.js
  |      +--> locales/th.js
  |      +--> locales/en.js
  |
  +--> useTheme()   (เฉพาะ Header)
         |
         +--> localStorage
         +--> body[data-theme]

Portfolio.jsx
  |
  +--> portfolioData.js
  +--> assets/*
```

---

## 5. อธิบายทีละบรรทัด: `src/main.jsx`

ไฟล์นี้มีไม่กี่บรรทัด แต่สำคัญที่สุด เพราะมันคือจุดเริ่มต้น

### บรรทัด 1

```js
import { StrictMode } from 'react'
```

- ดึง `StrictMode` มาจาก React
- ใช้ช่วยตรวจพฤติกรรมที่อาจไม่เหมาะในช่วงพัฒนา
- ไม่ใช่สิ่งที่ผู้ใช้เห็นโดยตรง แต่ช่วยนักพัฒนา

### บรรทัด 2

```js
import { createRoot } from 'react-dom/client'
```

- ดึงฟังก์ชันสำหรับเริ่ม render React ลงหน้าเว็บจริง

### บรรทัด 3

```js
import 'primeflex/primeflex.css'
```

- โหลด CSS utility ของ PrimeFlex
- ช่วยเรื่อง layout เช่น grid, flex, spacing

### บรรทัด 4

```js
import './i18n'
```

- เรียกไฟล์ตั้งค่าภาษา
- แค่ import ไฟล์นี้ก็เพียงพอให้ระบบภาษาเริ่มทำงาน

### บรรทัด 5

```js
import './index.css'
```

- โหลด CSS พื้นฐานทั้งเว็บ

### บรรทัด 6

```js
import App from './App.jsx'
```

- ดึง component หลักของทั้งแอปเข้ามา

### บรรทัด 8-12

```js
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

อธิบายทีละส่วน:

- `document.getElementById('root')`
  - หา `<div id="root">` จากไฟล์ HTML
- `createRoot(...)`
  - บอก React ว่า “ตรงนี้คือพื้นที่ที่จะแสดงแอป”
- `.render(...)`
  - สั่งแสดง component ที่กำหนด
- `<App />`
  - ตัวแอปจริง
- `<StrictMode>`
  - ครอบเพื่อช่วยตรวจพฤติกรรมตอนพัฒนา

สรุป:

> `main.jsx` ทำหน้าที่เอาแอป React ไปเสียบลงหน้าเว็บจริง

---

## 6. อธิบายทีละบรรทัด: `src/App.jsx`

ไฟล์นี้เป็นศูนย์กลางของ routing และ layout

### บรรทัด 1

```js
import { BrowserRouter, Routes, Route } from "react-router-dom";
```

- `BrowserRouter` เปิดระบบ route
- `Routes` คือกล่องรวม route
- `Route` คือกฎว่า URL ไหนต้องแสดงหน้าอะไร

### บรรทัด 2-14

เป็นการ import component และ page ต่าง ๆ

- `Header`, `Sidebar`, `BackButton` = ส่วน layout ที่ใช้ร่วมกัน
- `Home`, `About`, `Contact`, `Projects`, `Portfolio`, `Game` = หน้าหลัก
- `SnakeGame`, `QuizGame`, `TypingGame` = หน้าเกมย่อย

### บรรทัด 15

```js
function App() {
```

- ประกาศ component หลักชื่อ `App`

### บรรทัด 17

```jsx
<BrowserRouter>
```

- ครอบทั้งแอปด้วย router
- ถ้าไม่มีตัวนี้ `Link`, `Route`, `useLocation`, `useParams` จะใช้ไม่ได้

### บรรทัด 18

```jsx
<Header />
```

- แสดง header ทุกหน้า

### บรรทัด 20-21

```jsx
<div className="app-layout">
  <Sidebar />
```

- สร้าง layout หลัก
- Sidebar อยู่ซ้ายของหน้า

### บรรทัด 23-24

```jsx
<div className="main-content" id="content">
  <BackButton />
```

- พื้นที่ตรงนี้คือเนื้อหาหลักของแต่ละหน้า
- `BackButton` หรือ breadcrumb จะโผล่อยู่เหนือเนื้อหาหน้า

### บรรทัด 26-36

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  ...
</Routes>
```

คือกฎการเปลี่ยนหน้า

ตัวอย่าง:

- `/` -> `Home`
- `/projects` -> `Projects`
- `/portfolio/:section` -> `Portfolio`

บรรทัดนี้สำคัญมาก:

```jsx
<Route path="/portfolio/:section" element={<Portfolio />} />
```

เพราะ `:section` เป็นค่าที่เปลี่ยนได้

เช่น:

- `/portfolio/portfolio`
- `/portfolio/sport-booking`
- `/portfolio/erp`

ทั้งหมดใช้หน้า `Portfolio` เหมือนกัน แต่ข้อมูลข้างในต่างกัน

### บรรทัด 43

```js
export default App;
```

- ส่ง component นี้ออกไปให้ `main.jsx` ใช้งาน

---

## 7. อธิบายทีละบรรทัด: `src/hooks/useTheme.js`

ไฟล์นี้คือระบบเปลี่ยนธีม

### บรรทัด 1

```js
import { useEffect, useState } from "react";
```

- `useState` ใช้เก็บค่าธีม
- `useEffect` ใช้ทำงานหลังจากค่าเปลี่ยน

### บรรทัด 3

```js
const THEME_STORAGE_KEY = "cv-theme";
```

- ตั้งชื่อ key ที่จะใช้เก็บค่าลงใน `localStorage`

### บรรทัด 5-17

```js
function getPreferredTheme() { ... }
```

ฟังก์ชันนี้มีหน้าที่ “ตัดสินใจธีมเริ่มต้น”

ลำดับความคิดของมันคือ:

1. ถ้าไม่มี `window` แปลว่าอาจไม่ได้รันใน browser
2. ลองดูว่าผู้ใช้เคยเลือกธีมไว้ไหม
3. ถ้าเคยเลือก `light` หรือ `dark` ก็ใช้ค่านั้น
4. ถ้าไม่เคยเลือก ให้ดูค่าที่ระบบปฏิบัติการชอบ

### บรรทัด 19

```js
export function useTheme() {
```

- ประกาศ custom hook

### บรรทัด 20

```js
const [theme, setTheme] = useState(getPreferredTheme);
```

- สร้าง state ชื่อ `theme`
- ค่าตั้งต้นมาจาก `getPreferredTheme`

### บรรทัด 22-26

```js
useEffect(() => {
  document.body.dataset.theme = theme;
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}, [theme]);
```

อธิบายทีละบรรทัด:

- เมื่อ `theme` เปลี่ยน ให้ทำสิ่งต่อไปนี้
- ใส่ `data-theme` ลง `body`
- ใส่ `data-theme` ลง `<html>`
- เก็บค่าธีมไว้ใน `localStorage`

ข้อดีคือ CSS สามารถเขียนแบบนี้ได้:

```css
body[data-theme="dark"] { ... }
```

### บรรทัด 28-32

```js
return {
  theme,
  isDark: theme === "dark",
  toggleTheme: () => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark")),
};
```

hook นี้คืนค่า 3 อย่าง:

- `theme` = ค่าปัจจุบัน
- `isDark` = true/false
- `toggleTheme` = ฟังก์ชันสลับธีม

---

## 8. อธิบายทีละบรรทัด: `src/i18n.js`

ไฟล์นี้คือสมองของระบบหลายภาษา

### บรรทัด 1-3

- import `i18next`
- import ไฟล์ภาษาอังกฤษ
- import ไฟล์ภาษาไทย

### บรรทัด 5-6

```js
const savedLanguage =
  typeof window !== "undefined" ? window.localStorage.getItem("cv-language") : null;
```

- อ่านภาษาที่ผู้ใช้เลือกไว้จาก `localStorage`
- ถ้าไม่ได้รันใน browser ให้ใช้ `null`

### บรรทัด 8-18

```js
i18n.init({ ... })
```

เป็นการตั้งค่าระบบภาษา

ส่วนสำคัญ:

- `resources`
  - บอกว่าเว็บมีภาษาอะไรบ้าง
- `lng`
  - ภาษาที่จะใช้ตอนเริ่ม
- `fallbackLng`
  - ถ้าหาคำแปลไม่เจอ ให้กลับไปใช้ภาษาไทย
- `escapeValue: false`
  - React จัดการเรื่อง escaping ให้อยู่แล้ว

### บรรทัด 20-22

- ตั้งค่า `<html lang="...">`
- ช่วยเรื่อง accessibility และมาตรฐานเว็บ

### บรรทัด 24-32

```js
i18n.on("languageChanged", (language) => { ... })
```

ถ้าภาษาเปลี่ยน:

- เก็บภาษาลง `localStorage`
- อัปเดต `lang` ของ `<html>`

### บรรทัด 34

- export `i18n` ออกไปให้ไฟล์อื่นใช้

---

## 9. อธิบายทีละบรรทัด: `src/hooks/useTranslation.js`

ไฟล์นี้เป็นสะพานเชื่อมระหว่าง React กับ `i18next`

### บรรทัด 1

```js
import { useSyncExternalStore } from "react";
```

- hook นี้เหมาะกับการฟังข้อมูลจาก “ภายนอก React state”
- ในที่นี้คือ `i18n`

### บรรทัด 4-14

```js
function subscribe(onStoreChange) { ... }
```

หน้าที่:

- สมัครฟัง event จาก `i18n`
- ถ้าภาษาเปลี่ยนหรือโหลดข้อความเพิ่ม ให้ React รู้ว่าต้อง re-render

### บรรทัด 16-18

```js
function getSnapshot() {
  return i18n.language;
}
```

- บอก React ว่า “ค่าปัจจุบัน” ของระบบภาษาคืออะไร

### บรรทัด 20-26

```js
export function useTranslation() {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    i18n,
    t: (key, options) => i18n.t(key, options),
  };
}
```

สิ่งที่เกิดขึ้น:

- React จะ subscribe กับการเปลี่ยนภาษา
- เมื่อภาษาเปลี่ยน component จะ render ใหม่
- hook นี้คืน `t()` เอาไว้แปลข้อความ

---

## 10. อธิบายทีละบรรทัด: `src/components/BackButton.jsx`

ไฟล์นี้เป็น breadcrumb navigation

### บรรทัด 1-3

- import `Link`, `useLocation`
- import `useTranslation`
- import `portfolioData`

### บรรทัด 5-10

`projectTitleMap` คือแผนที่ชื่อโปรเจกต์

เอาไว้แปลง URL เช่น:

- `sport-booking` -> `Sport Booking Platform`

### บรรทัด 12-16

`gameTitleMap` ทำเหมือนกัน แต่ใช้กับ mini game

### บรรทัด 18-20

- อ่าน URL ปัจจุบัน
- ดึงฟังก์ชันแปลภาษา

### บรรทัด 22

```js
if (location.pathname === "/") return null;
```

- ถ้าอยู่หน้าแรก ไม่ต้องแสดง breadcrumb

### บรรทัด 24-25

```js
const segments = location.pathname.split("/").filter(Boolean);
const crumbs = [{ to: "/", label: t("nav.home") }];
```

อธิบาย:

- แยก URL เป็นส่วน ๆ
- เริ่ม breadcrumb ด้วย `Home` เสมอ

ตัวอย่าง:

- `/portfolio/sport-booking`
  -> `["portfolio", "sport-booking"]`

### บรรทัด 27-57

เป็น logic ว่าแต่ละ path ต้องสร้าง breadcrumb แบบไหน

ตัวอย่าง:

- ถ้า `about`
  - เพิ่ม `About`
- ถ้า `projects`
  - เพิ่ม `Projects`
- ถ้า `game/snake`
  - เพิ่ม `Game / Snake Game`
- ถ้า `portfolio/sport-booking`
  - เพิ่ม `Projects / Sport Booking Platform`

### บรรทัด 59-84

เป็นส่วน render จริง

หลักคิด:

- ถ้าเป็นตัวสุดท้ายใน breadcrumb -> แสดงเป็นข้อความธรรมดา
- ถ้ายังไม่ใช่ตัวสุดท้ายและมี `to` -> แสดงเป็นลิงก์กดได้

---

## 11. อธิบายทีละบรรทัด: `src/components/Header.jsx`

ไฟล์นี้ค่อนข้างสำคัญ เพราะรวมทั้ง route info, theme, และ language

### บรรทัด 1-13

- import React hooks
- import router tools
- import icons
- import `useTranslation`
- import `useTheme`

### บรรทัด 15-46

`routeMeta` คือ object ที่เก็บ metadata ของ route หลัก

แต่ละ route บอกว่า:

- ชื่อ page ใช้ key อะไร
- badge ใช้ key อะไร
- detail ใช้ key อะไร
- ใช้ icon ตัวไหน

จุดดี:

- แก้ข้อมูลของ route ง่าย
- Header ไม่ต้อง if/else ยาวเกินไป

### บรรทัด 48-53

- ดึง `t` และ `i18n`
- ดึงข้อมูล theme
- อ่านตำแหน่ง route ปัจจุบัน
- สร้าง `ref` สำหรับจับ element header
- ตรวจว่าใช้ภาษาไทยหรือไม่

### บรรทัด 55-67

สร้างข้อความของปุ่ม theme ตามภาษา

ถ้าเป็นไทยก็ใช้ข้อความไทย  
ถ้าเป็นอังกฤษก็ใช้ข้อความอังกฤษ

### บรรทัด 69-84

กำหนดข้อมูลของหน้า current page

มี 2 กรณี:

1. ถ้าเป็น `/portfolio/...`
   - ใช้ meta แบบรวมของ portfolio
2. ถ้าเป็น route ทั่วไป
   - ใช้ข้อมูลจาก `routeMeta`

### บรรทัด 88-114

`useEffect` นี้ใช้คำนวณความสูงของ header

ทำไมต้องมี:

- เพราะ header อาจสูงไม่เท่ากันในแต่ละภาษา
- ถ้าความสูงเปลี่ยน layout อื่นต้องรู้

สิ่งที่มันทำ:

- วัดความสูงของ header
- เอาค่าไปใส่ใน CSS variable `--app-header-height`
- ใช้ `ResizeObserver` คอยดูว่า header เปลี่ยนขนาดไหม
- ฟัง event `resize`
- cleanup ตอน component ถูกถอดออก

### บรรทัด 116-183

เป็น JSX ของ Header

โครงสร้าง:

- โลโก้/ชื่อเว็บ
- card บอกว่าตอนนี้อยู่หน้าไหน
- ปุ่มเปลี่ยนธีม
- pill บอกภาษา
- ปุ่มเลือกภาษา
- ปุ่มไป Contact

---

## 12. อธิบายทีละบรรทัด: `src/components/Sidebar.jsx`

Sidebar เป็นเมนูซ้ายที่มีทั้งเมนูหลักและ shortcut

### บรรทัด 18-55

`mainLinks` คือข้อมูลของเมนูหลัก

แต่ละรายการมี:

- path
- key สำหรับแปลข้อความ
- icon
- เลข accent
- detailKey

### บรรทัด 57-62

`portfolioLinks` คือ shortcut ไป section ย่อยของ portfolio

### บรรทัด 64-68

`gameLinks` คือ shortcut ไปหน้าเกมย่อย

### บรรทัด 70

`quickMetaKeys` คือรายการข้อมูลสั้น ๆ ที่จะโชว์ใน sidebar

### บรรทัด 72-74

- ใช้ `useTranslation`
- สร้าง state `isMenuOpen`

### บรรทัด 77

```jsx
<aside className={`sidebar${isMenuOpen ? " is-open" : ""}`}>
```

- ถ้าเมนูเปิด จะเติม class `is-open`
- CSS เอา class นี้ไปใช้ควบคุมหน้าตา

### บรรทัด 85-96

เป็นปุ่ม hamburger menu

เมื่อกด:

```js
setIsMenuOpen((prev) => !prev)
```

แปลว่า:

> ถ้าเปิดอยู่ก็ปิด ถ้าปิดอยู่ก็เปิด

### บรรทัด 100-116

section แรกของ sidebar

เอาไว้โชว์:

- ชื่อเจ้าของเว็บ
- role
- meta chips

### บรรทัด 118-148

section เมนูหลัก

ใช้:

```jsx
mainLinks.map(...)
```

แปลว่า:

> เอาข้อมูลใน `mainLinks` มาสร้างเมนูทีละรายการ

### บรรทัด 150-171

section shortcut ไป portfolio

### บรรทัด 173-194

section shortcut ไป mini games

### บรรทัด 196-204

CTA card สำหรับไปหน้า contact

---

## 13. อธิบายทีละบรรทัด: `src/pages/Projects.jsx`

ไฟล์นี้แบ่งออกเป็น 3 ส่วนใหญ่

1. ข้อมูลโปรเจกต์
2. helper สำหรับคัดโปรเจกต์เด่น
3. JSX สำหรับวาดหน้า

### บรรทัด 1-4

- import `Link`
- import รูปที่ใช้ในหน้า

### บรรทัด 6-61

`projects` คือ array ของข้อมูลโปรเจกต์

ทุก object ใน array นี้คือ 1 โปรเจกต์

ข้อมูลสำคัญที่เก็บ:

- `number`
- `badge`
- `title`
- `type`
- `description`
- `stack`
- `status`
- `link`
- `image`

บางโปรเจกต์มีค่าเพิ่ม:

- `featured`
- `demoUrl`
- `summary`

### บรรทัด 63-64

```js
const featuredProject = projects.find((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);
```

อธิบาย:

- `find` = หาโปรเจกต์เด่น 1 ตัว
- `filter` = เอาตัวที่เหลือทั้งหมด

### บรรทัด 66-138

`ProjectCard` เป็น component ย่อยในไฟล์เดียวกัน

รับ props:

- `project`
- `featured`

สิ่งที่มันทำ:

- แสดงรูป
- แสดงเลข project และ status
- แสดง title / description
- แสดง tech stack
- ถ้าเป็น featured ให้แสดง summary เพิ่ม
- ถ้ามี demoUrl ก็แสดงปุ่มเปิดเดโม

### บรรทัด 140-206

เป็น component `Projects`

โครงสร้างหน้า:

- hero intro
- สถิติสั้น ๆ
- featured project
- selected works ที่เหลือ

หลักการสำคัญคือ:

- ใช้ข้อมูลจาก array
- แล้วให้ React วาด UI จากข้อมูลนั้น

นี่เป็นแนวทางมาตรฐานของ React:

> เก็บข้อมูลไว้เป็น object/array แล้วใช้ `.map()` หรือ logic ต่าง ๆ มาสร้างหน้าจอ

---

## 14. อธิบายทีละบรรทัด: `src/pages/Portfolio.jsx`

นี่คือไฟล์ที่ใหญ่และซับซ้อนที่สุดในโปรเจกต์

เพื่อให้อ่านง่าย จะอธิบายเป็นช่วงบรรทัดแทนการไล่ทีละบรรทัดทุกบรรทัด

## 14.1 บรรทัด 1-35: imports

ส่วนนี้ import:

- `useParams`
- `useTranslation`
- `portfolioData`
- `useState`
- รูปภาพจำนวนมาก

เหตุผลที่ไฟล์นี้ยาว:

- มันรวมข้อมูลของหลายโปรเจกต์ไว้ในไฟล์เดียว

## 14.2 บรรทัด 37-42: `imageMap`

object นี้ใช้จับคู่:

- section
- item id
- รูปภาพ

ตัวอย่าง:

```js
prayuen: { 1: PY1, 2: PY2 }
```

แปลว่า:

- ถ้าอยู่ section `prayuen`
- item 1 ใช้รูป `PY1`
- item 2 ใช้รูป `PY2`

## 14.3 บรรทัด 44-313: `projectDetails`

object นี้คือหัวใจของหน้ารายละเอียดโปรเจกต์

มันเก็บข้อมูลของ:

- `portfolio`
- `sport-booking`
- `erp`
- `ai`

แต่ละโปรเจกต์จะมีข้อมูลอย่างน้อย:

- title
- type
- summary
- stack
- coverImage
- images
- highlights
- roles
- learned

ใน `sport-booking` มีเพิ่ม:

- `focus`
- `demoUrl`
- `stats`

นี่คือ “ฐานข้อมูลแบบเขียนตรงในไฟล์”

## 14.4 บรรทัด 315-484: `ProjectDetail`

นี่คือ component ที่ใช้แสดงรายละเอียดโปรเจกต์จริง

### บรรทัด 316

```js
const [selectedImage, setSelectedImage] = useState(null);
```

state นี้ใช้เก็บรูปที่ผู้ใช้คลิก

- ถ้าเป็น `null` = modal ปิด
- ถ้ามี object รูป = modal เปิด

### บรรทัด 320-376

hero section ของ project detail

สิ่งที่แสดง:

- เลขโปรเจกต์
- สถานะ
- รูป cover
- ประเภทโปรเจกต์
- focus (ถ้ามี)
- title
- summary
- stack
- stats
- ปุ่มเดโม

### บรรทัด 351-360

```jsx
{project.stats?.length > 0 && (...)}
```

หมายถึง:

> ถ้ามี `stats` และยาวมากกว่า 0 ค่อยแสดง block นี้

เครื่องหมาย `?.` ช่วยกัน error กรณี `stats` ไม่มี

### บรรทัด 362-373

```jsx
{project.demoUrl && (...)}
```

หมายถึง:

> ถ้ามีลิงก์ demo ค่อยแสดงปุ่ม

### บรรทัด 378-406

gallery ของรูปโปรเจกต์

ใช้:

```jsx
project.images.map(...)
```

แปลว่า:

> เอารูปทุกใบมาสร้างเป็นปุ่มการ์ด

เมื่อกด:

```js
onClick={() => setSelectedImage(image)}
```

ก็จะเปิด modal

### บรรทัด 408-441

แสดง 3 ส่วนสำคัญของโปรเจกต์

- Highlights
- My Role
- Learning

ทั้งหมดใช้ `.map()` วนลูปจาก array ข้อมูล

### บรรทัด 444-481

modal preview ของรูป

logic สำคัญ:

- ถ้า `selectedImage` มีค่า -> แสดง modal
- ถ้าคลิกฉากหลัง -> ปิด modal
- ถ้าคลิกปุ่มปิด -> ปิด modal
- ถ้าคลิกในกล่อง modal -> ใช้ `stopPropagation()` เพื่อไม่ให้เด้งปิดทันที

## 14.5 บรรทัด 486-572: `Portfolio`

component หลักของไฟล์

### บรรทัด 487-489

- อ่าน `params` จาก URL
- เลือกค่า `section`
- ใช้ระบบแปลภาษา

### บรรทัด 491

```js
const projectDetail = projectDetails[section];
```

ลองหา section นี้ใน object `projectDetails`

### บรรทัด 493-495

```js
if (projectDetail) {
  return <ProjectDetail project={projectDetail} />;
}
```

ถ้าเจอข้อมูลแบบ project detail:

- ส่งข้อมูลเข้า `ProjectDetail`
- จบการทำงานทันที

### บรรทัด 497

```js
const data = portfolioData[section];
```

ถ้าไม่เจอใน `projectDetails`  
ก็ลองหาใน `portfolioData`

### บรรทัด 499-511

ถ้าไม่เจอใน `portfolioData` ด้วย

- แสดงหน้า not found

### บรรทัด 513-570

ถ้าเจอใน `portfolioData`

- แสดงหน้า portfolio แบบปกติ
- วนลูป `data.items`
- ใช้ `imageMap` หา image ตาม item id
- แสดงรูป + title + desc

---

## 15. วิธีเริ่มแก้โปรเจกต์นี้สำหรับมือใหม่

ถ้ายังไม่มั่นใจเรื่องโค้ด อย่าพยายามแก้ทุกอย่างพร้อมกัน  
ให้เริ่มแบบนี้

## ขั้นที่ 1: ดู route ก่อน

เปิด [App.jsx](/C:/Users/thana/OneDrive/เอกสาร/GitHub/CV/Frontend/src/App.jsx)

ดูว่า URL ไหนไปหน้าไหน

จำให้ง่าย:

- `/` -> Home
- `/projects` -> Projects
- `/portfolio/:section` -> Portfolio detail

ถ้าอยากแก้ “หน้าไหน” ให้เริ่มจาก route นั้นก่อนเสมอ

## ขั้นที่ 2: หาไฟล์ของหน้านั้น

ตัวอย่าง:

- อยากแก้หน้า projects -> เปิด `src/pages/Projects.jsx`
- อยากแก้หน้า sport-booking detail -> เปิด `src/pages/Portfolio.jsx`
- อยากแก้เมนูบน -> เปิด `src/components/Header.jsx`

## ขั้นที่ 3: ดูว่าเป็น “ข้อมูล” หรือ “หน้าตา”

ก่อนแก้ ให้ถามตัวเอง:

- อยากแก้ข้อความ/ข้อมูล?
- หรืออยากแก้หน้าตา?

ถ้าอยากแก้ข้อความ:

- ดูใน JSX
- หรือดูใน `locales/*.js`

ถ้าอยากแก้ layout/สี/spacing:

- ดูใน `App.css`

## ขั้นที่ 4: เวลาแก้ React ให้มอง 3 อย่าง

ทุก component ให้ถาม 3 คำถามนี้:

1. รับข้อมูลจากไหน
2. ใช้ state อะไร
3. render อะไรออกมา

ตัวอย่างใน `ProjectDetail`

1. รับ `project` จาก props
2. ใช้ `selectedImage` เป็น state
3. render hero, gallery, modal

## ขั้นที่ 5: เวลาแก้ UI ให้ค้น class ก่อน

เช่นอยากแก้ gallery

1. หา class ใน JSX เช่น `project-detail-gallery-grid`
2. ใช้ค้นใน `App.css`
3. ปรับ style ที่เกี่ยวข้อง

นี่ง่ายกว่าเลื่อนหาแบบสุ่มมาก

## ขั้นที่ 6: แก้ทีละจุดแล้ว build

คำแนะนำ:

1. แก้ทีละเรื่อง
2. เปิดหน้าเช็กผล
3. รัน build

คำสั่ง:

```bash
npm run dev
```

หรือเช็ก build:

```bash
npm run build
```

ถ้า PowerShell รัน `npm` ตรง ๆ ไม่ได้ อาจใช้:

```bash
npm.cmd run build
```

## ขั้นที่ 7: มือใหม่ควรเลี่ยงอะไร

- อย่าแก้ JSX กับ CSS พร้อมกันเยอะมากในครั้งเดียว
- อย่ารีแฟกเตอร์ทั้งไฟล์ถ้ายังไม่เข้าใจ flow
- อย่าลบ component ที่คิดว่าไม่ได้ใช้ทันที ถ้ายังไม่ได้ตรวจ route/import ให้ครบ

---

## 16. ถ้าจะเริ่มพัฒนาต่อ ควรแยกงานเป็นอะไรบ้าง

## งานง่าย

- แก้ข้อความ
- เปลี่ยนสี
- เปลี่ยน spacing
- เพิ่มรูป
- เพิ่มโปรเจกต์ใหม่ใน array

## งานระดับกลาง

- เพิ่ม route ใหม่
- เพิ่ม section ใหม่ใน `Portfolio.jsx`
- เพิ่มภาษาใหม่
- ปรับระบบ breadcrumb

## งานระดับยาก

- แยก `projectDetails` ออกเป็นไฟล์ data ใหม่
- ดึงข้อมูลจาก API จริง
- แยก `ProjectDetail` ออกเป็น component ย่อยหลายตัว
- รีแฟกเตอร์ `Portfolio.jsx`

---

## 17. จุดเริ่มต้นที่ดีที่สุดถ้าอยาก “เข้าใจจริง”

ให้ลองทำตามนี้

1. อ่าน `main.jsx`
2. อ่าน `App.jsx`
3. เปิดเว็บแล้วคลิกไป `/projects`
4. อ่าน `Projects.jsx`
5. กดเข้า `/portfolio/sport-booking`
6. อ่าน `Portfolio.jsx`
7. ลองเปลี่ยนข้อความ 1 จุด
8. ลองเปลี่ยนสี 1 จุดใน `App.css`

ถ้าทำครบนี้ได้ จะเริ่ม “เชื่อมภาพในหัว” ได้ดีมาก

---

## 18. Component Map แบบละเอียดขึ้น

```text
App
├─ Header
│  ├─ ใช้ useTranslation
│  ├─ ใช้ useTheme
│  └─ ใช้ useLocation
│
├─ Sidebar
│  ├─ ใช้ useTranslation
│  ├─ ใช้ NavLink
│  └─ ใช้ state isMenuOpen
│
├─ BackButton
│  ├─ ใช้ useLocation
│  ├─ ใช้ useTranslation
│  └─ ใช้ portfolioData
│
└─ Routes
   ├─ Home
   │  ├─ ใช้ useNavigate
   │  ├─ ใช้ useTranslation
   │  └─ SkillsSection
   │
   ├─ About
   │  ├─ ใช้ useNavigate
   │  ├─ ใช้ useTranslation
   │  └─ SkillsSection
   │
   ├─ Contact
   │  ├─ ใช้ useTranslation
   │  └─ ใช้ state isLineQrOpen
   │
   ├─ Projects
   │  └─ ProjectCard (inner component)
   │
   ├─ Portfolio
   │  ├─ ใช้ useParams
   │  ├─ ใช้ useTranslation
   │  ├─ ใช้ portfolioData
   │  └─ ProjectDetail (inner component)
   │     └─ ใช้ state selectedImage
   │
   └─ Game
      └─ ใช้ Link สร้าง game cards
```

---

## 19. สรุปแบบสั้นมากสำหรับคนเริ่มต้น

ถ้าจะจำแค่ใจความเดียวของเอกสารนี้ ให้จำว่า:

- React component คือฟังก์ชันที่คืน JSX
- Route คือกฎว่าหน้าไหนแสดง component อะไร
- Hook คือ logic ที่เอามาใช้ซ้ำได้
- State คือข้อมูลที่เปลี่ยนแล้วทำให้หน้าจออัปเดต
- `map()` คือวิธีสร้าง UI ซ้ำ ๆ จากข้อมูล array
- `App.jsx` คือศูนย์กลางของหน้า
- `Portfolio.jsx` คือไฟล์ที่ซับซ้อนที่สุดของโปรเจกต์นี้

---

## 20. ถ้าอยากให้ผมต่อจากเอกสารนี้

ผมช่วยต่อได้อีก เช่น:

- ทำเวอร์ชัน “อธิบายเฉพาะ `Portfolio.jsx` แบบละเอียดมาก”
- ทำ cheat sheet React สำหรับอ่านโปรเจกต์นี้
- ทำไฟล์ “ศัพท์ React ที่เจอในโปรเจกต์นี้” สำหรับมือใหม่
- ทำ roadmap ว่า 7 วันควรฝึกอ่านไฟล์ไหนบ้าง

