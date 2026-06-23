import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import portfolioData from "../data/portfolioData";
import { useState } from "react";

import label1 from "../assets/label1.jpg";
import PY1 from "../assets/PY/222.jpg";
import PY2 from "../assets/PY/333.jpg";
import PAO from "../assets/PAO/001.jpg";
import PAO1 from "../assets/PAO/002.jpg";
import img005 from "../assets/005.png";
import img101 from "../assets/101.jpg";
import imgB2 from "../assets/01/B2.jpg";
import imgB1 from "../assets/01/B1.jpg";
import imgB3 from "../assets/01/B3.jpg";
import imgBB from "../assets/work.png";
import imgB4 from "../assets/01/B4-test.jpg";
import YL1 from "../assets/YL/confusion_matrix_normalized.png";
import YL2 from "../assets/YL/confusion_matrix.png";
import YL3 from "../assets/YL/F1_curve (1).png";
import YL4 from "../assets/YL/F1_curve.png";
import YL5 from "../assets/YL/labels_correlogram.jpg";
import YL6 from "../assets/YL/labels.jpg";
import YL7 from "../assets/YL/results.png";
import YL8 from "../assets/YL/train_batch0.jpg";
import YL9 from "../assets/YL/train_batch1.jpg";
import YL10 from "../assets/YL/train_batch2.jpg";

const imageMap = {
  prayuen: { 1: PY1, 2: PY2 },
  khonkaen: { 1: PAO, 2: PAO1 },
  project: { 1: label1, 2: img005 },
  history: { 1: null },
};

const projectDetails = {
  portfolio: {
    number: "01",
    badge: "BB",
    status: "พร้อมใช้งาน",
    title: "Portfolio Website",
    type: "Personal Website",
    summary:
      "เว็บไซต์แฟ้มสะสมงานส่วนตัว สำหรับนำเสนอประวัติ ทักษะ ผลงาน และช่องทางติดต่อ โดยออกแบบให้ดูสะอาด อ่านง่าย และรองรับการใช้งานบนมือถือ",
    stack: ["React", "Vite", "CSS", "Responsive", "React Router"],
    coverImage: imgBB,
    
    images: [
    {
    src: imgB2,
    title: "หน้า Portfolio",
    desc: "หน้าหลักสำหรับแสดงผลงานและข้อมูลส่วนตัว",
    detail:
      "หน้านี้ออกแบบเพื่อแนะนำตัวเองแบบมืออาชีพ แสดงชื่อ ตำแหน่ง ความสนใจ และปุ่มติดต่อ เพื่อให้ผู้เข้าชมเข้าใจภาพรวมได้รวดเร็ว",
    points: [
      "แสดงข้อมูลส่วนตัวแบบกระชับ",
      "มีปุ่มนำทางไปหน้าผลงานและติดต่อ",
      "ออกแบบโทนสีเข้มให้ดูทันสมัย",
    ],
  },
  {
    src: imgB3,
    title: "หน้า ประวัติ",
    desc: "หน้าสำหรับแสดงประวัติเส้นทางการเรียนรู้ของผม",
    detail:
      "หน้านี้ใช้เล่าเส้นทางการเรียนรู้ ประสบการณ์ และทักษะที่เกี่ยวข้องกับสายงาน Developer",
    points: [
      "แสดงประวัติการเรียนรู้",
      "จัดหมวดหมู่ทักษะให้อ่านง่าย",
      "ช่วยให้ผู้ชมเข้าใจพื้นฐานและแนวทางการพัฒนา",
    ],
 },
{
  src: imgB4,
  title: "หน้า ผลงาน",
  desc: "หน้าสำหรับแสดงโปรเจกต์ต่าง ๆ",
  detail:
    "หน้านี้รวบรวมผลงานที่เคยพัฒนา โดยแยกเป็นการ์ดโปรเจกต์ สามารถกดดูรายละเอียดแต่ละงานได้",
  points: [
    "แสดงรายการโปรเจกต์แบบการ์ด",
    "มีสถานะและเทคโนโลยีที่ใช้",
    "เชื่อมไปยังหน้ารายละเอียดของแต่ละโปรเจกต์",
  ],
},
  ],

    highlights: [
      "รองรับหน้า Home, About, Projects และ Contact",
      "มีระบบเปลี่ยนภาษาไทย / อังกฤษ",
      "ออกแบบ Responsive รองรับมือถือ แท็บเล็ต และ Desktop",
      "มีหน้าแสดงรายละเอียดโปรเจกต์แยกตามผลงาน",
    ],
    roles: [
      "ออกแบบ UI/UX",
      "พัฒนา Frontend ด้วย React",
      "จัดโครงสร้าง Routing",
      "ปรับ Responsive และ Styling",
    ],
    learned: [
      "การจัดโครงสร้าง React Project",
      "การใช้ React Router",
      "การจัด CSS ให้รองรับหลายขนาดหน้าจอ",
    ],
  },

  "sport-booking": {
    number: "02",
    badge: "SBP",
    status: "กำลังพัฒนา",
    title: "Sport Booking Platform",
    type: "Web Application",
    summary:
      "ระบบจองสนามกีฬาออนไลน์ มีขั้นตอนเลือกสนาม เลือกช่วงเวลา ตรวจสอบรายการจอง อัปโหลดสลิป และรอการอนุมัติจากผู้ดูแลระบบ",
    stack: ["Vue 3", "Pinia", "PrimeVue", "Tailwind CSS", "Node.js"],
    coverImage: img101,  //รูปกรอบหลัก
    images: [
    {
      src: img101,
      title: "หน้า แรก",
      desc: "หน้าหลักสำหรับแสดงการประกาศการแข่งขัน",
    },
    {
      src: img101,
      title: "หน้า หน้าจองสนาม",
      desc: "หน้าสำหรับแสดงการเลือกเวลาจองสนาม",
    },
    {
      src: img101,
      title: "หน้า จ่ายตัง",
      desc: "หน้าสำหรับแสดงการยืนยันการจอง",
    },
    ],
    highlights: [
      "เลือกสนามและช่วงเวลาที่ต้องการจอง",
      "ป้องกันการจองเวลาซ้ำ",
      "มีขั้นตอนอัปโหลดสลิปชำระเงิน",
      "มีหน้าผู้ดูแลระบบสำหรับอนุมัติหรือปฏิเสธการจอง",
    ],
    roles: [
      "ออกแบบ Flow การจองสนาม",
      "พัฒนา Frontend ด้วย Vue 3",
      "จัดการ State ด้วย Pinia",
      "เชื่อมต่อ Backend API",
    ],
    learned: [
      "การออกแบบ Booking Flow",
      "การตรวจสอบช่วงเวลาซ้ำ",
      "การจัดการสถานะการจอง",
    ],
  },

  erp: {
    number: "03",
    badge: "ERP",
    status: "Backend พร้อมต่อยอด",
    title: "Inventory / ERP System",
    type: "Business System",
    summary:
      "ระบบจัดการสินค้าและข้อมูลธุรกิจ รองรับข้อมูลพนักงาน ลูกค้า สินค้า การรับเข้า การเบิกออก และข้อมูลสรุปสำหรับใช้งานภายในองค์กร",
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB"],
    highlights: [
      "จัดการข้อมูลพนักงาน ลูกค้า และสินค้า",
      "รองรับการรับสินค้าเข้าและเบิกสินค้าออก",
      "มีโครงสร้างฐานข้อมูลสำหรับต่อยอดระบบจริง",
      "แยก Backend API เป็นสัดส่วนชัดเจน",
    ],
    roles: [
      "ออกแบบ Database Schema",
      "พัฒนา Backend API",
      "จัดการ Prisma Migration",
      "เตรียมระบบสำหรับเชื่อมต่อ Frontend",
    ],
    learned: [
      "การออกแบบระบบหลังบ้าน",
      "การใช้ Prisma กับ PostgreSQL",
      "การแยก Module ระบบธุรกิจ",
    ],
  },

  ai: {
    number: "04",
    badge: "AI",
    status: "Prototype",
    title: "AI Object Detection",
    type: "AI Project",
    summary:
      "โปรเจกต์ตรวจจับวัตถุจากรูปภาพด้วย AI แสดงภาพก่อนและหลังประมวลผล เหมาะสำหรับงาน Computer Vision และการทดลองโมเดลตรวจจับวัตถุ",
    stack: ["Python", "YOLO", "AI", "Object Detection", "Computer Vision"],
    coverImage: img101,
    images: [
    {
      src: img101,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL1,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL2,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL3,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL4,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL5,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL6,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL7,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL8,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL9,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    {
      src: YL10,
      title: "หน้าการเตรียมข้อมูล",
      desc: "หน้าหลักสำหรับแสดงทำ",
    },
    ],
    highlights: [
      "อัปโหลดรูปภาพเพื่อประมวลผล",
      "แสดงผลภาพก่อนและหลังตรวจจับ",
      "แสดงรายการวัตถุที่ตรวจพบ",
      "เหมาะสำหรับต่อยอดงานด้าน AI Vision",
    ],
    roles: [
      "เตรียม Flow การอัปโหลดภาพ",
      "ออกแบบหน้าผลลัพธ์",
      "จัดวางข้อมูล Detection Result",
      "ทดลองแนวทางการใช้งาน AI",
    ],
    learned: [
      "พื้นฐาน Computer Vision",
      "การแสดงผล Detection Result",
      "การออกแบบ UI สำหรับงาน AI",
    ],
  },
};

function ProjectDetail({ project }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <main className="project-detail-page">
        <section className="project-detail-hero">
          <div className="project-detail-cover">
            <div className="project-detail-cover-top">
              <span>{project.number}</span>
              <small>{project.status}</small>
            </div>

            {project.coverImage ? (
              <div className="project-detail-cover-image">
                <img src={project.coverImage} alt={project.title} />
              </div>
            ) : (
              <div className="project-detail-badge">{project.badge}</div>
            )}
          </div>

          <div className="project-detail-copy">
            <p className="about-badge">{project.type}</p>

            <h1>{project.title}</h1>

            <p>{project.summary}</p>

            <div className="project-detail-stack">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <button
              type="button"
              className="project-detail-back-link"
              onClick={() => navigate("/projects", { replace: true })}
            >
              ← กลับไปหน้า Projects
            </button>
          </div>
        </section>

        {project.images?.length > 0 && (
          <section className="project-detail-gallery">
            <div className="project-detail-section-head">
              <p className="section-kicker">PREVIEW</p>
              <h2>รูปภาพประกอบโปรเจกต์</h2>
            </div>

            <div className="project-detail-gallery-grid">
              {project.images.map((image, index) => (
                <button
                  type="button"
                  className="project-detail-image-card project-detail-image-button"
                  key={`${image.title}-${index}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.src} alt={image.title} />

                  <div>
                    <h3>{image.title}</h3>
                    <p>{image.desc}</p>
                    <span className="project-detail-click-hint">
                      คลิกดูรายละเอียด →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="project-detail-grid">
          <article className="project-detail-card project-detail-card-large">
            <p className="section-kicker">HIGHLIGHTS</p>
            <h2>จุดเด่นของโปรเจกต์</h2>

            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="project-detail-card">
            <p className="section-kicker">MY ROLE</p>
            <h2>หน้าที่ที่ทำ</h2>

            <ul>
              {project.roles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="project-detail-card">
            <p className="section-kicker">LEARNING</p>
            <h2>สิ่งที่ได้เรียนรู้</h2>

            <ul>
              {project.learned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      {selectedImage && (
        <div
          className="project-preview-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="project-preview-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-preview-close"
              onClick={() => setSelectedImage(null)}
              aria-label="ปิดรายละเอียดรูปภาพ"
            >
              ×
            </button>

            <img src={selectedImage.src} alt={selectedImage.title} />

            <div className="project-preview-content">
              <p className="section-kicker">PREVIEW DETAIL</p>
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.detail || selectedImage.desc}</p>

              {selectedImage.points?.length > 0 && (
                <ul>
                  {selectedImage.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Portfolio() {
  const params = useParams();
  const section = params.section || params.slug || params.id || "portfolio";
  const navigate = useNavigate();
  const { t } = useTranslation();

  const projectDetail = projectDetails[section];

  if (projectDetail) {
    return <ProjectDetail project={projectDetail} />;
  }

  const data = portfolioData[section];

  if (!data) {
    return (
      <main className="portfolio-page">
        <section className="portfolio-shell">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="btn-secondary portfolio-back"
          >
            {t("common.back")}
          </button>

          <div className="portfolio-hero">
            <p className="about-badge">{t("common.portfolio")}</p>
            <h1>{t("portfolio.notFoundTitle")}</h1>
            <p>{t("portfolio.notFoundDescription")}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="portfolio-page">
      <section className="portfolio-shell">
        <button
          type="button"
          onClick={() => navigate("/about")}
          className="btn-secondary portfolio-back"
        >
          {t("common.back")}
        </button>

        <div className="portfolio-hero">
          <p className="about-badge">{t("common.portfolio")}</p>
          <h1>{t(`portfolio.sections.${section}.title`)}</h1>
          <p>
            <strong>{t(`portfolio.sections.${section}.period`)}</strong>
            {" • "}
            {t("portfolio.roleSeparator")}{" "}
            {t(`portfolio.sections.${section}.role`)}
          </p>
          <p>{t(`portfolio.sections.${section}.overview`)}</p>
        </div>

        <div className="portfolio-content portfolio-grid">
          <section className="portfolio-cards">
            {data.items.map((itemId, index) => {
              const img = imageMap[section]?.[itemId];

              return (
                <article key={itemId} className="portfolio-card">
                  {img ? (
                    <img
                      src={img}
                      alt={t(
                        `portfolio.sections.${section}.items.${itemId}.title`
                      )}
                    />
                  ) : (
                    <div className="showcase-placeholder">
                      <strong>{t("portfolio.notFoundTitle")}</strong>
                      <span>{t("portfolio.previewUnavailable")}</span>
                    </div>
                  )}

                  <div className="portfolio-card-body">
                    <p className="portfolio-meta">
                      {t("common.item")} {index + 1}
                    </p>

                    <h3>
                      {t(
                        `portfolio.sections.${section}.items.${itemId}.title`
                      )}
                    </h3>

                    <p>
                      {t(`portfolio.sections.${section}.items.${itemId}.desc`)}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;