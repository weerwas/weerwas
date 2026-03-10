# Team Review & Daily Report Web App

Web App ตัวอย่างสำหรับใช้ในองค์กรและกับลูกค้า เพื่อ **Submit Daily Report** และ **ทำ Review** โดยผู้ใช้เพียงกรอกข้อมูลแล้วกดบันทึก

## Features
- ฟอร์ม `Daily Report` สำหรับรายงานงานประจำวัน
- ฟอร์ม `Review` สำหรับให้คะแนนและข้อเสนอแนะ
- ตารางแสดงข้อมูลที่บันทึกล่าสุด
- เก็บข้อมูลใน `localStorage` (เหมาะกับ MVP / Demo)
- ปุ่มล้างข้อมูลทั้งหมด

## วิธีรัน (แนะนำ)
> ต้องมี `python3` ในเครื่อง

1) เข้าโฟลเดอร์โปรเจกต์
```bash
cd /workspace/weerwas
```

2) รันสคริปต์
```bash
./run.sh
```

3) เปิดเว็บ
- `http://localhost:8000`

### เปลี่ยนพอร์ต
```bash
./run.sh 9000
```
แล้วเปิด `http://localhost:9000`

## วิธีรัน (สำรอง)
ถ้าไม่ใช้สคริปต์ สามารถรันตรงได้:
```bash
python3 -m http.server 8000
```

## Troubleshooting
- ถ้าเจอ `Permission denied` ตอนรัน `./run.sh`
  ```bash
  chmod +x run.sh
  ./run.sh
  ```
- ถ้าเครื่องไม่มี `python3`
  - ติดตั้ง Python 3 ก่อน แล้วรันใหม่
- ถ้าพอร์ต 8000 ถูกใช้งานอยู่
  ```bash
  ./run.sh 9000
  ```

## Next steps for SaaS (production)
- เพิ่มระบบ Login / Role (Admin, Manager, Client)
- ต่อฐานข้อมูลจริง (PostgreSQL, MySQL, etc.)
- API Backend สำหรับจัดการ reports/reviews
- Export รายงานเป็น Excel/PDF
- Notification (Email / LINE / Slack)
