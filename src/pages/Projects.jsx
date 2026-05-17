import { useState } from "react";

function Projects() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult(null);
    setDetections([]);
    setError(null);
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
      setDetections(data.detections);
    } catch (err) {
      setError("❌ เชื่อมต่อ Backend ไม่ได้ — ตรวจสอบว่ารัน uvicorn แล้วหรือยัง");
    }

    setLoading(false);
  };

  return (
    <div className="yolo-page">
      <h2>ตรวจจับวัตถุด้วย YOLO</h2>
      <p className="yolo-desc">อัปโหลดรูปภาพแล้วกดตรวจจับเพื่อดูผลลัพธ์จาก YOLOv11</p>

      {/* Upload Zone */}
      <div className="upload-zone">
        <label className="upload-btn">
          📁 เลือกรูปภาพ
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            hidden
          />
        </label>

        {preview && (
          <button
            className="detect-btn"
            onClick={handleDetect}
            disabled={loading}
          >
            {loading ? "🔍 กำลังตรวจจับ..." : "🎯 ตรวจจับวัตถุ"}
          </button>
        )}
      </div>

      {/* Error */}
      {error && <p className="yolo-error">{error}</p>}

      {/* Images */}
      {preview && (
        <div className="yolo-result">
          <div className="yolo-img-box">
            <p className="img-label">ภาพต้นฉบับ</p>
            <img src={preview} alt="original" />
          </div>
          <div className="yolo-img-box">
            <p className="img-label">ผลลัพธ์ YOLO</p>
            {result
              ? <img src={result} alt="detected" />
              : <div className="img-placeholder">
                  {loading ? "กำลังประมวลผล..." : "กดตรวจจับเพื่อดูผล"}
                </div>
            }
          </div>
        </div>
      )}

      {/* Detection List */}
      {detections.length > 0 && (
        <div className="detection-list">
          <h3>พบวัตถุทั้งหมด {detections.length} รายการ</h3>
          <div className="detection-items">
            {detections.map((d, i) => (
              <div key={i} className="detection-item">
                <span className="det-label">{d.label}</span>
                <div className="det-bar-wrap">
                  <div
                    className="det-bar"
                    style={{ width: `${d.confidence * 100}%` }}
                  />
                </div>
                <span className="confidence">
                  {(d.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;