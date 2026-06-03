import { useState } from "react";
import sampleInputImg from "../assets/YL/test006.jpeg";
import sampleOutputImg from "../assets/test007.jpeg";

function Projects() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compareSplit, setCompareSplit] = useState(50);

  const beforeImage = preview || sampleInputImg;
  const afterImage = result || sampleOutputImg;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult(null);
    setDetections([]);
    setError(null);
    setCompareSplit(50);
    setImage(file);
  };

  const handleDetect = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const res = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend ตอบกลับผิดพลาด");

      const data = await res.json();
      setResult(`data:image/jpeg;base64,${data.image}`);
      setDetections(data.detections || []);
      setCompareSplit(50);
    } catch {
      setError("เชื่อมต่อ Backend ไม่ได้ - ตรวจสอบว่า uvicorn รันอยู่หรือยัง");
    }

    setLoading(false);
  };

  return (
    <main className="yolo-page">
      <h2>ตรวจจับวัตถุด้วย YOLO</h2>
      <p className="yolo-desc">
        อัปโหลดรูปภาพแล้วกดตรวจจับ เพื่อดูผลลัพธ์ก่อนและหลังประมวลผลจาก YOLOv11
      </p>

      <div className="project-tips">
        <div className="tip-card">
          <span>1</span>
          <p>อัปโหลดรูปภาพต้นฉบับ</p>
        </div>
        <div className="tip-card">
          <span>2</span>
          <p>กดตรวจจับเพื่อส่งไป Backend</p>
        </div>
        <div className="tip-card">
          <span>3</span>
          <p>เลื่อน slider เพื่อเปรียบเทียบ Before / After</p>
        </div>
      </div>

      <section className="project-showcase">
        <div className="showcase-header">
          <div>
            <p className="showcase-kicker">Example Flow</p>
            <h3>ตัวอย่างก่อนตรวจจับและหลังตรวจจับ</h3>
          </div>
          <p className="showcase-note">
            ส่วนนี้ช่วยให้เห็น flow ของงานชัดขึ้น: ภาพก่อนตรวจจับอยู่ฝั่งซ้าย และภาพหลังผ่านการตรวจจับอยู่ฝั่งขวา
          </p>
        </div>

        <div className="compare-shell">
          <div className="compare-stage" style={{ "--split": `${compareSplit}%` }}>
            <img className="compare-img compare-before" src={beforeImage} alt="before detection" />

            <div className="compare-after-wrap">
              <img className="compare-img compare-after" src={afterImage} alt="after detection" />
            </div>

            <div className="compare-divider" />
            <div className="compare-tag compare-tag-before">Before</div>
            <div className="compare-tag compare-tag-after">After</div>
          </div>

          <label className="compare-control">
            <span>เลื่อนเพื่อเปรียบเทียบ</span>
            <input
              type="range"
              min="0"
              max="100"
              value={compareSplit}
              onChange={(e) => setCompareSplit(Number(e.target.value))}
            />
          </label>
        </div>
      </section>

      <div className="upload-zone">
        <label className="upload-btn">
          📁 เลือกภาพ
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>

        {preview && (
          <button className="detect-btn" onClick={handleDetect} disabled={loading}>
            {loading ? "🔍 กำลังตรวจจับ..." : "🎯 ตรวจจับวัตถุ"}
          </button>
        )}
      </div>

      {error && <p className="yolo-error">{error}</p>}

      {preview && (
        <div className="yolo-result">
          <div className="yolo-img-box">
            <p className="img-label">ภาพต้นฉบับ</p>
            <img src={preview} alt="original" />
          </div>
          <div className="yolo-img-box">
            <p className="img-label">ผลลัพธ์ YOLO</p>
            {result ? (
              <img src={result} alt="detected" />
            ) : (
              <div className="img-placeholder">
                {loading ? "กำลังประมวลผล..." : "กดตรวจจับเพื่อดูผลลัพธ์"}
              </div>
            )}
          </div>
        </div>
      )}

      {detections.length > 0 && (
        <div className="detection-list">
          <h3>พบวัตถุทั้งหมด {detections.length} รายการ</h3>
          <div className="detection-items">
            {detections.map((d, i) => (
              <div key={i} className="detection-item">
                <span className="det-label">{d.label}</span>
                <div className="det-bar-wrap">
                  <div className="det-bar" style={{ width: `${d.confidence * 100}%` }} />
                </div>
                <span className="confidence">{(d.confidence * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;
