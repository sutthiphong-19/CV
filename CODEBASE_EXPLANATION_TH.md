# อธิบายโค้ดโปรเจกต์ `Frontend`

เอกสารนี้เขียนเพื่ออธิบายโค้ดของโปรเจกต์แบบคนเริ่มต้นก็อ่านเข้าใจได้  
เป้าหมายคือช่วยให้เห็นภาพว่า:

1. โปรเจกต์นี้คืออะไร
2. โครงสร้างไฟล์เป็นแบบไหน
3. เวลาเปิดเว็บขึ้นมา โค้ดทำงานยังไง
4. แต่ละส่วนสำคัญมีหน้าที่อะไร
5. ถ้าจะไปแก้หรือพัฒนาต่อ ควรเริ่มดูจากตรงไหน

---

## 1. โปรเจกต์นี้คืออะไร

โปรเจกต์นี้เป็นเว็บ Portfolio ที่สร้างด้วย **React + Vite**

หน้าที่หลักของเว็บคือ:

- แนะนำเจ้าของผลงาน
- แสดงประวัติและทักษะ
- แสดงโปรเจกต์ที่เคยทำ
- แสดงรายละเอียดของแต่ละโปรเจกต์
- มีหน้า Contact
- มีหน้า Mini Games สำหรับทดลองเล่น
- รองรับ 2 ภาษา คือ ไทยและอังกฤษ
- รองรับ Light / Dark theme

พูดง่าย ๆ คือเป็น “เว็บแนะนำตัว + เว็บรวมผลงาน + เว็บทดลองฟีเจอร์เล็ก ๆ”

---

## 2. เทคโนโลยีที่ใช้

ดูจากไฟล์ `Frontend/package.json`

- `react` ใช้สร้างหน้าจอเป็น component
- `react-dom` ใช้แสดง React ลงบนหน้าเว็บจริง
- `react-router-dom` ใช้ทำระบบเปลี่ยนหน้าโดยไม่ reload ทั้งเว็บ
- `i18next` ใช้ทำระบบแปลภาษา
- `axios` ใช้เรียก API
- `react-icons` ใช้ไอคอน
- `vite` ใช้เป็นเครื่องมือพัฒนาและ build โปรเจกต์
- `primeflex` ใช้ utility classes สำหรับ layout บางส่วน

---

## 3. โครงสร้างไฟล์หลัก

โฟลเดอร์สำคัญอยู่ใน `Frontend/src`

```text
src/
  assets/        รูปภาพ ไฟล์ PDF และภาพประกอบต่าง ๆ
  components/    ชิ้นส่วน UI ที่เอาไปใช้ซ้ำได้
  data/          ข้อมูลคงที่ของโปรเจกต์
  hooks/         hook ที่เขียนเอง เช่น theme และ translation
  locales/       ข้อความแปลภาษา ไทย / อังกฤษ
  pages/         หน้าแต่ละหน้าของเว็บ
  services/      ส่วนเรียก API
  App.jsx        โครงหลักของแอปและ route
  App.css        CSS หลักเกือบทั้งหมดของเว็บ
  i18n.js        ตั้งค่าระบบหลายภาษา
  main.jsx       จุดเริ่มต้นของ React
```

แนวคิดสำคัญคือ:

- `pages` = หน้าใหญ่
- `components` = ชิ้นส่วนย่อยที่ใช้ซ้ำ
- `hooks` = logic ที่ใช้ซ้ำ
- `data` = ข้อมูลคงที่
- `assets` = ไฟล์รูปหรือเอกสาร

---

## 4. เวลาเปิดเว็บขึ้นมา โค้ดทำงานยังไง

ลำดับการทำงานหลักมีประมาณนี้

### 4.1 `main.jsx`

ไฟล์นี้คือ “ประตูทางเข้า” ของแอป

มันทำ 3 เรื่องหลัก:

- โหลด CSS พื้นฐาน
- โหลดระบบภาษา (`./i18n`)
- เอา component `App` ไปแสดงบนหน้า HTML

โค้ดสำคัญ:

- `createRoot(...).render(...)` คือคำสั่งเริ่มแอป React
- `StrictMode` เป็นโหมดช่วยตรวจพฤติกรรมที่อาจผิดพลาดตอนพัฒนา

สรุปง่าย ๆ:

> ผู้ใช้เปิดเว็บ -> `main.jsx` ทำงาน -> React เริ่มทำงาน -> แสดง `App`

---

### 4.2 `App.jsx`

ไฟล์นี้คือ “โครงกระดูกหลักของเว็บไซต์”

มันรับผิดชอบ:

- เปิดระบบ route ด้วย `BrowserRouter`
- แสดง `Header`
- แสดง `Sidebar`
- แสดง `BackButton`
- เลือกว่าจะโชว์หน้าไหนตาม URL

Route ที่มีตอนนี้:

- `/` -> หน้า Home
- `/about` -> หน้า About
- `/contact` -> หน้า Contact
- `/projects` -> หน้า Projects
- `/portfolio/:section` -> หน้ารายละเอียด portfolio หรือ project detail
- `/game` -> หน้า Game Hub
- `/game/snake` -> Snake Game
- `/game/quiz` -> Quiz Game
- `/game/typing` -> Typing Game

แนวคิดของ route:

ถ้า URL เปลี่ยน React Router จะไม่ reload ทั้งเว็บ  
แต่จะ “สลับ component หน้าที่จะแสดง” แทน

ตัวอย่าง:

- ไป `/projects` -> React แสดง component `Projects`
- ไป `/portfolio/sport-booking` -> React แสดง `Portfolio` แล้วให้ `Portfolio` ไปเลือกข้อมูลโปรเจกต์อีกชั้น

---

## 5. Layout หลักของเว็บ

### 5.1 `Header.jsx`

Header คือแถบบนสุดของเว็บ

หน้าที่หลัก:

- แสดงชื่อเจ้าของเว็บ
- แสดงว่าตอนนี้ผู้ใช้อยู่หน้าไหน
- เปลี่ยนธีม Light / Dark
- เปลี่ยนภาษา TH / EN
- มีปุ่มไปหน้า Contact

สิ่งสำคัญในไฟล์นี้:

#### `routeMeta`

เป็น object ที่เก็บข้อมูลของแต่ละ route เช่น:

- route นี้ชื่ออะไร
- ใช้ข้อความแปล key ไหน
- ใช้ icon อะไร

ข้อดีคือ Header ไม่ต้องเขียน if ยาวมากทุกครั้ง  
แค่ดูจาก route ปัจจุบันแล้วหยิบข้อมูลจาก `routeMeta`

#### `useLocation()`

ใช้ดูว่า URL ตอนนี้คืออะไร  
Header จะได้รู้ว่าควรแสดงชื่อหน้าไหน

#### `useTheme()`

เป็น custom hook สำหรับเปลี่ยนธีม

#### `useTranslation()`

เป็น custom hook สำหรับแปลข้อความ

#### `ResizeObserver`

ใช้ตรวจความสูงของ header แล้วเก็บค่าไว้ใน CSS variable `--app-header-height`

ความหมายง่าย ๆ:

> ถ้า header สูงขึ้นหรือลดลง หน้าอื่นจะรู้ว่าควรเว้นพื้นที่ด้านบนเท่าไร

---

### 5.2 `Sidebar.jsx`

Sidebar คือเมนูด้านข้าง

หน้าที่หลัก:

- แสดงเมนูหลักของเว็บ
- แสดง shortcut ไปยัง portfolio ส่วนต่าง ๆ
- แสดง shortcut ไป mini games
- มีปุ่มเปิด/ปิดเมนูในกรณีจอเล็ก

สิ่งสำคัญ:

#### `mainLinks`

เก็บรายการเมนูหลัก เช่น Home, About, Projects, Contact, Game

#### `portfolioLinks`

เก็บลิงก์ย่อยของหน้า Portfolio

#### `gameLinks`

เก็บลิงก์ไปเกมแต่ละเกม

#### `NavLink`

ต่างจาก `Link` ตรงที่ `NavLink` รู้ว่าตอนนี้ “ลิงก์นี้กำลัง active อยู่ไหม”

จึงใช้ทำเมนูที่มีสถานะไฮไลต์ได้

#### `isMenuOpen`

ใช้เก็บสถานะว่าเมนูเปิดอยู่หรือปิดอยู่  
เหมาะกับ mobile layout

---

### 5.3 `BackButton.jsx`

จริง ๆ ตอนนี้ component นี้ไม่ได้เป็น “ปุ่มย้อนกลับธรรมดา” แล้ว  
แต่มันถูกพัฒนาให้เป็น **breadcrumb navigation**

breadcrumb คือแถบแบบนี้:

`Home / Projects / Sport Booking Platform`

หน้าที่:

- บอกผู้ใช้ว่าอยู่ตรงไหนในเว็บ
- กดย้อนกลับไปส่วนก่อนหน้าได้

มันทำงานโดย:

- อ่าน URL ปัจจุบันด้วย `useLocation()`
- แยก path ออกเป็นส่วน ๆ
- สร้างรายการ breadcrumb ตาม path

ตัวอย่าง:

- `/projects` -> `Home / Projects`
- `/portfolio/sport-booking` -> `Home / Projects / Sport Booking Platform`

ไฟล์นี้สำคัญมากในแง่ UX เพราะช่วยให้ผู้ใช้ไม่หลงทาง

---

## 6. Hook ที่สำคัญ

### 6.1 `useTheme.js`

hook นี้ใช้จัดการธีมสว่าง/มืด

มันทำงานแบบนี้:

1. ตอนเริ่มต้น จะเช็กก่อนว่าผู้ใช้เคยเลือกธีมไว้ใน `localStorage` ไหม
2. ถ้ามี ก็ใช้ค่าที่เคยเลือก
3. ถ้าไม่มี จะดูว่าระบบของเครื่องชอบ dark mode ไหม
4. เมื่อผู้ใช้เปลี่ยนธีม ก็จะ:
   - เปลี่ยน state
   - เขียนค่าเก็บไว้ใน `localStorage`
   - ใส่ `data-theme` ลงใน `body` และ `html`

พอ CSS เห็น `data-theme="dark"` ก็ใช้ style ของ dark mode ได้

พูดง่าย ๆ:

> hook นี้คือสมองของระบบเปลี่ยนธีม

---

### 6.2 `useTranslation.js`

hook นี้ใช้เชื่อม React กับระบบภาษา `i18next`

มันคืนค่า 2 อย่าง:

- `i18n` สำหรับจัดการภาษา
- `t(key)` สำหรับแปลข้อความ

ตัวอย่าง:

```js
t("nav.home")
```

หมายถึง:

> ไปหาข้อความของ key `nav.home` จากไฟล์ภาษา แล้วส่งข้อความจริงกลับมา

เช่นอาจได้:

- ไทย: `หน้าหลัก`
- อังกฤษ: `Home`

---

### 6.3 `i18n.js`

ไฟล์นี้คือจุดตั้งค่าระบบหลายภาษา

หน้าที่:

- โหลดไฟล์ภาษา `en` และ `th`
- ตั้งภาษาตั้งต้น
- อ่านภาษาที่เคยเลือกจาก `localStorage`
- เปลี่ยนค่า `lang` ของ `<html>`

ข้อดี:

- รองรับ SEO และ accessibility ดีขึ้น
- ผู้ใช้เปลี่ยนภาษาแล้วครั้งหน้าเว็บจะจำได้

---

## 7. หน้าแต่ละหน้าทำอะไร

## 7.1 `Home.jsx`

หน้าแรกของเว็บ

หน้าที่:

- แนะนำเจ้าของเว็บไซต์
- แสดง quick facts
- มีปุ่มไปหน้า Projects และ Contact
- แสดง highlight cards ของผลงาน
- แสดง `SkillsSection`

สิ่งสำคัญ:

#### `highlightItems`

เก็บข้อมูลการ์ดเด่นในหน้าแรก เช่นรูปอะไร คลิกไปหน้าไหน

#### `useNavigate()`

ใช้เปลี่ยนหน้าเมื่อกดปุ่ม

เช่น:

- กด `View Projects` -> ไป `/projects`
- กด `Contact` -> ไป `/contact`

สรุป:

> Home คือหน้าแนะนำตัวแบบสั้น ๆ และพาผู้ใช้ไปส่วนสำคัญของเว็บ

---

## 7.2 `About.jsx`

หน้าประวัติและแนวคิดการทำงาน

หน้าที่:

- แสดงตัวตนและแนวทางของเจ้าของเว็บ
- แสดง summary cards
- แสดง timeline การเรียนรู้
- แสดงความสนใจ/ทักษะ
- แสดงลิงก์ไป portfolio ย่อย
- ใช้ `SkillsSection` ซ้ำอีกครั้ง

สิ่งสำคัญ:

#### `summaryItems`

ใช้ควบคุมว่าแสดง summary เรื่องอะไรบ้าง เช่น focus, style, goal

#### `timelineIds`

ใช้ควบคุมลำดับ timeline

#### `portfolioRoutes`

ใช้สร้างปุ่มลัดไป portfolio หน้าอื่น ๆ

#### `openLink()`

ใช้เปิดลิงก์ภายนอกด้วย `window.open`

---

## 7.3 `Contact.jsx`

หน้าแสดงช่องทางติดต่อ

หน้าที่:

- แสดง email
- แสดงเบอร์โทร
- เปิด Facebook, GitHub, TikTok
- เปิด modal QR Code ของ LINE

สิ่งสำคัญ:

#### `isLineQrOpen`

state นี้ควบคุมว่า popup QR ของ LINE เปิดอยู่หรือไม่

#### modal logic

เมื่อกดปุ่ม LINE:

- `setIsLineQrOpen(true)` -> modal แสดงขึ้นมา

เมื่อกดปิดหรือกดฉากหลัง:

- `setIsLineQrOpen(false)` -> modal หายไป

สรุป:

> Contact เป็นตัวอย่างที่ดีของการใช้ state คุมการเปิดปิดหน้าต่างย่อย

---

## 7.4 `Projects.jsx`

หน้าแสดงรายการโปรเจกต์

หน้าที่:

- เก็บข้อมูลโปรเจกต์เป็น array
- แยกโปรเจกต์เด่นออกมา 1 ตัว
- แสดงการ์ดโปรเจกต์ทั้งหมด
- เชื่อมไปยังหน้ารายละเอียดแต่ละโปรเจกต์

สิ่งสำคัญ:

#### `projects`

เป็น array ของ object  
แต่ละ object คือ 1 โปรเจกต์

ข้อมูลที่เก็บ เช่น:

- `number`
- `badge`
- `title`
- `type`
- `description`
- `stack`
- `status`
- `link`
- `image`

บางโปรเจกต์มีข้อมูลเพิ่ม เช่น:

- `featured`
- `demoUrl`
- `summary`

#### `featuredProject`

ใช้ `find()` หาโปรเจกต์ที่มี `featured: true`

#### `otherProjects`

ใช้ `filter()` เอาเฉพาะโปรเจกต์ที่ไม่ใช่ตัวเด่น

#### `ProjectCard`

เป็น component ย่อยในไฟล์เดียวกัน  
ช่วยลดการเขียนซ้ำเวลาวาดการ์ดโปรเจกต์

มันรับ `project` เข้ามา แล้วแสดงข้อมูลออกมาเป็นการ์ด

สรุป:

> หน้า Projects คือหน้า “สารบัญโปรเจกต์”

---

## 7.5 `Portfolio.jsx`

ไฟล์นี้สำคัญมาก เพราะมันทำหน้าที่ 2 แบบในไฟล์เดียว

### แบบที่ 1: แสดง project detail

ถ้า URL เป็นโปรเจกต์ เช่น:

- `/portfolio/portfolio`
- `/portfolio/sport-booking`
- `/portfolio/erp`
- `/portfolio/ai`

ไฟล์นี้จะใช้ข้อมูลจาก `projectDetails`

### แบบที่ 2: แสดง portfolio data แบบทั่วไป

ถ้า URL เป็น section อื่น เช่น:

- `/portfolio/prayuen`
- `/portfolio/khonkaen`
- `/portfolio/project`
- `/portfolio/history`

ไฟล์นี้จะใช้ข้อมูลจาก `portfolioData`

---

### ส่วนสำคัญใน `Portfolio.jsx`

#### `projectDetails`

เป็น object ใหญ่ที่เก็บข้อมูลรายละเอียดของแต่ละโปรเจกต์

เช่นแต่ละโปรเจกต์จะมี:

- ชื่อ
- ประเภท
- summary
- stack
- cover image
- images
- highlights
- roles
- learned

สำหรับ `sport-booking` ยังมี:

- `focus`
- `demoUrl`
- `stats`

#### `ProjectDetail({ project })`

component นี้ใช้วาดหน้ารายละเอียดของโปรเจกต์

มันมีหน้าที่:

- แสดง hero section
- แสดง tech stack
- แสดงสถิติย่อย
- แสดง gallery
- แสดง highlights
- แสดง role
- แสดงสิ่งที่ได้เรียนรู้
- เปิด modal preview เมื่อกดรูป

#### `selectedImage`

state นี้ใช้เก็บรูปที่ผู้ใช้กดเลือก

ถ้ามีค่า:

- modal preview จะเปิด

ถ้าเป็น `null`:

- modal จะปิด

#### `useParams()`

ใช้ดึงค่าจาก URL

ตัวอย่าง:

ถ้า URL คือ `/portfolio/sport-booking`

`section` จะเท่ากับ `"sport-booking"`

จากนั้นโค้ดจะเอา `section` ไปหาใน `projectDetails` หรือ `portfolioData`

---

### logic สำคัญของไฟล์นี้

แนวคิดคือ:

```text
อ่านค่า section จาก URL
-> ถ้า section อยู่ใน projectDetails
   -> แสดง ProjectDetail
-> ถ้าไม่อยู่
   -> ลองหาใน portfolioData
-> ถ้าไม่เจออีก
   -> แสดงหน้า not found
```

นี่คือรูปแบบการเขียนที่ดี เพราะทำให้หน้าเดียวรองรับข้อมูลหลายแบบได้

---

## 7.6 `Game.jsx`

หน้า hub สำหรับเลือก mini games

หน้าที่:

- เก็บรายการเกมใน array `games`
- map ออกมาเป็นการ์ด
- กดแล้วเข้า route ของเกมนั้น

เกมที่มีตอนนี้:

- Snake
- Quiz
- Typing

ไฟล์นี้ทำหน้าที่คล้าย `Projects.jsx` แต่เปลี่ยนจากโปรเจกต์เป็นเกม

---

## 8. Component ที่ใช้ซ้ำ

## 8.1 `SkillsSection.jsx`

component นี้เอาไว้แสดงหมวดทักษะ

มันเก็บข้อมูลทักษะไว้ใน `skillGroups`

แบ่งกลุ่มเป็น:

- frontend
- backend
- database

แต่ละ skill มี:

- ชื่อ
- icon
- สี

ข้อดี:

- หน้า Home และ About ใช้ component เดียวกันได้
- ถ้าอยากเพิ่ม skill ใหม่ แก้ที่เดียว

---

## 8.2 `ProjectCard.jsx`

ไฟล์นี้เป็น component การ์ดโปรเจกต์แบบง่าย  
ดูจากโค้ดแล้วมีโอกาสเป็นของเก่าหรือสำรองไว้

เหตุผล:

- หน้า `Projects.jsx` ปัจจุบันไม่ได้ import มาใช้
- ใน `Projects.jsx` มี `ProjectCard` ของตัวเองอยู่ในไฟล์แล้ว

สรุป:

> ไฟล์นี้น่าจะยังไม่ได้ถูกใช้งานจริงใน flow ปัจจุบัน

---

## 8.3 `Tabs.jsx`

เป็น component tab แบบง่ายสำหรับ Home / About / Contact

ดูจากโค้ดตอนนี้ก็มีแนวโน้มว่า **ยังไม่ได้ใช้งานจริง**

เพราะ layout ปัจจุบันใช้ `Header` และ `Sidebar` เป็นเมนูหลักแทนแล้ว

---

## 9. ข้อมูลคงที่

### 9.1 `data/portfolioData.js`

ไฟล์นี้เก็บข้อมูลแบบง่าย ๆ ของ portfolio section บางหน้า

เช่น:

- `prayuen`
- `khonkaen`
- `project`
- `history`

แต่ละตัวมี `items`

ตัวอย่าง:

```js
prayuen: {
  items: [1, 2]
}
```

แปลว่า section นี้มีรายการย่อย 2 รายการ  
แล้วหน้า `Portfolio.jsx` จะใช้เลขพวกนี้ไปจับคู่กับรูปและข้อความแปล

---

## 10. ระบบ API

### `services/api.js`

ไฟล์นี้สร้าง axios instance

```js
const API = axios.create({
  baseURL: "http://localhost:8000"
});
```

และมีฟังก์ชัน:

```js
export const getProjects = () => API.get("/projects");
```

ความหมายคือ:

> ถ้าจะเรียกข้อมูลโปรเจกต์จาก backend ก็ใช้ฟังก์ชันนี้ได้

แต่จากโค้ดปัจจุบัน ดูเหมือนหน้าต่าง ๆ ส่วนใหญ่ยังใช้ข้อมูลแบบ hard-coded อยู่  
ยังไม่ได้ใช้ API ตัวนี้อย่างเต็มรูปแบบ

---

## 11. ระบบภาษา

ไฟล์ภาษาอยู่ใน:

- `locales/th.js`
- `locales/en.js`

แนวคิดคือไม่เขียนข้อความตรง ๆ ทุกจุด  
แต่เก็บเป็น key เช่น:

```js
t("nav.home")
```

ข้อดี:

- เปลี่ยนภาษาได้ง่าย
- จัดการข้อความจากศูนย์กลางได้
- ลดโอกาสข้อความไม่ตรงกันหลายหน้า

---

## 12. ระบบ CSS

### `App.css`

ไฟล์นี้คือ CSS หลักของเกือบทั้งระบบ

มันดูแลหลายอย่าง เช่น:

- layout หลัก
- header
- sidebar
- hero sections
- project cards
- project detail
- modal
- dark theme
- responsive design

สรุปง่าย ๆ:

> ถ้า React เป็น “โครงสร้างบ้าน”  
> `App.css` ก็คือ “การตกแต่งบ้านทั้งหมด”

### `index.css`

มักใช้กับ style พื้นฐานของทั้งเว็บ เช่น reset, font, body

### CSS แยกเฉพาะหน้า

เช่น:

- `GameHub.css`
- `MiniGames.css`
- `SnakeGame.css`

ใช้กับหน้าที่มี style เฉพาะของตัวเอง

---

## 13. การทำงานของข้อมูลในแอป

โปรเจกต์นี้ใช้ข้อมูล 2 แบบ

### แบบที่ 1: ข้อมูลเขียนตรงในไฟล์

เช่น:

- `Projects.jsx`
- `Portfolio.jsx`
- `SkillsSection.jsx`
- `Sidebar.jsx`

ข้อดี:

- เขียนเร็ว
- เหมาะกับ portfolio site

ข้อเสีย:

- ถ้าข้อมูลเยอะขึ้น จะดูแลยาก

### แบบที่ 2: ข้อมูลแยกออกเป็นไฟล์

เช่น:

- `portfolioData.js`
- `locales/*.js`

ข้อดี:

- เป็นระเบียบกว่า
- แก้ข้อมูลง่ายขึ้น

---

## 14. flow การทำงานของหน้า “โปรเจกต์ -> รายละเอียด”

นี่เป็น flow สำคัญของเว็บ

### ขั้นตอน

1. ผู้ใช้อยู่หน้า `/projects`
2. หน้า `Projects.jsx` แสดงรายการโปรเจกต์
3. เมื่อกด “ดูรายละเอียด”
4. React Router เปลี่ยน URL เป็น `/portfolio/...`
5. `App.jsx` ส่งหน้าที่ route นี้ไปให้ `Portfolio.jsx`
6. `Portfolio.jsx` ใช้ `useParams()` อ่านชื่อ section
7. หา section นั้นจาก `projectDetails`
8. ถ้าเจอ -> ส่งข้อมูลเข้า `ProjectDetail`
9. `ProjectDetail` แสดงข้อมูลทั้งหมด
10. ถ้ากดรูป -> เก็บรูปใน `selectedImage`
11. modal preview เปิดขึ้นมา

สรุปเป็นภาษาง่าย:

> หน้า Projects เป็นแค่รายการ  
> ส่วนหน้า Portfolio คือคนที่รับหน้าที่เปิด “รายละเอียดลึก” ของแต่ละงาน

---

## 15. ส่วนที่สำคัญที่สุดของโปรเจกต์นี้

ถ้าต้องเลือกส่วนที่สำคัญจริง ๆ มี 6 ส่วน

### 1. `main.jsx`

จุดเริ่มต้นของแอป

### 2. `App.jsx`

ตัวควบคุม layout และ routing

### 3. `Header.jsx` + `Sidebar.jsx` + `BackButton.jsx`

ตัวควบคุมประสบการณ์การใช้งานและการนำทาง

### 4. `Portfolio.jsx`

เป็นไฟล์ที่ซับซ้อนและสำคัญที่สุดฝั่งข้อมูลโปรเจกต์

### 5. `useTheme.js` และ `useTranslation.js`

เป็น logic กลางที่มีผลกับทั้งเว็บ

### 6. `App.css`

คุมหน้าตาเกือบทั้งหมด

---

## 16. ส่วนที่ดูเหมือนยังไม่ถูกใช้เต็มที่

จากโค้ดปัจจุบัน มีบางส่วนที่เหมือนเตรียมไว้หรือเป็นโค้ดเก่า

- `components/ProjectCard.jsx`
- `components/Tabs.jsx`
- `services/api.js` ยังดูเหมือนยังไม่ถูกใช้จริงใน flow หลัก

ไม่ได้แปลว่าผิด  
แค่หมายความว่าอาจเป็น:

- โค้ดเก่า
- โค้ดสำรอง
- โค้ดที่เตรียมไว้ใช้ในอนาคต

---

## 17. ถ้าคนเริ่มต้นจะไล่อ่านโค้ด ควรเริ่มจากตรงไหน

แนะนำลำดับนี้

1. `main.jsx`
2. `App.jsx`
3. `components/Header.jsx`
4. `components/Sidebar.jsx`
5. `components/BackButton.jsx`
6. `pages/Home.jsx`
7. `pages/Projects.jsx`
8. `pages/Portfolio.jsx`
9. `hooks/useTheme.js`
10. `hooks/useTranslation.js`
11. `i18n.js`
12. `App.css`

เหตุผล:

- จะเห็นภาพรวมก่อน
- แล้วค่อยลงรายละเอียด
- ไม่หลงกับไฟล์ย่อยเร็วเกินไป

---

## 18. ถ้าจะพัฒนาต่อ ควรปรับตรงไหนได้บ้าง

ไอเดียที่พัฒนาต่อได้:

### แยกข้อมูลโปรเจกต์ออกจาก `Portfolio.jsx`

ตอนนี้ข้อมูล `projectDetails` ใหญ่มาก  
ถ้าย้ายไปไฟล์แยก เช่น `data/projectDetails.js` จะดูแลง่ายขึ้น

### แยก `ProjectDetail` ออกเป็น component ของตัวเอง

จะช่วยให้ `Portfolio.jsx` สั้นลงและอ่านง่ายขึ้น

### ใช้ API จริงแทนข้อมูล hard-coded

ถ้าในอนาคตอยากให้ข้อมูลแก้จาก backend ได้  
สามารถต่อจาก `services/api.js` ได้เลย

### ตรวจข้อความภาษาไทยที่ encoding เพี้ยน

บางไฟล์มีข้อความไทยแสดงเป็นตัวอักษรเพี้ยน  
ควรเปิดไฟล์ด้วย UTF-8 และแก้ให้ข้อความอ่านตรง

### ลบ component ที่ไม่ได้ใช้

เช่น `ProjectCard.jsx` หรือ `Tabs.jsx` ถ้าแน่ใจว่าไม่ใช้แล้ว

---

## 19. สรุปสั้นที่สุด

ถ้าอธิบายทั้งโปรเจกต์ในไม่กี่บรรทัด:

- `main.jsx` เริ่มแอป
- `App.jsx` จัด layout และ route
- `Header`, `Sidebar`, `BackButton` จัดการการนำทาง
- `pages/*` คือหน้าต่าง ๆ
- `Portfolio.jsx` คือหัวใจของหน้ารายละเอียดผลงาน
- `hooks/*` คือ logic ใช้ซ้ำ เช่น theme กับ language
- `i18n.js` จัดการสองภาษา
- `App.css` คุมหน้าตาเกือบทั้งหมด

พูดให้เห็นภาพที่สุด:

> โปรเจกต์นี้คือเว็บ Portfolio ที่ใช้ React แบ่งหน้าเป็น component  
> ใช้ Router คุมการเปลี่ยนหน้า  
> ใช้ Hook คุม theme กับ language  
> ใช้ข้อมูลคงที่สำหรับโปรเจกต์  
> และใช้ CSS ก้อนใหญ่เพื่อออกแบบหน้าตาทั้งเว็บ

---

## 20. ถ้าอยากให้ผมช่วยต่อ

ผมช่วยทำต่อได้หลายแบบ เช่น:

- เขียนเอกสารเวอร์ชัน “อธิบายทีละบรรทัด” ให้
- แยกอธิบายเฉพาะ `Portfolio.jsx`
- วาด flow diagram แบบง่ายให้ในไฟล์ `.md`
- ทำเอกสาร “วิธีเริ่มแก้โปรเจกต์นี้” สำหรับมือใหม่
- ทำเอกสาร “component ไหนเรียก component ไหน” แบบเป็นแผนภาพ

