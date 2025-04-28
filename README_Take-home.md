
# แบบฟอร์มส่งงานสอบ Take-home | Take-home Assignment Template
- ชื่อ - นามสกุล (Full Name): ณภัทร เสมือนโพธิ์
- รหัสนักศึกษา (Student ID): 6631503016
- ชื่อแอป (App Name): NomNom
- Framework ที่ใช้ (Framework Used): React Native 
- ลิงก์ GitHub Repository: https://github.com/Napus-BackendDev/NomNom
- ลิงก์ไฟล์ติดตั้ง (APK/IPA): https://expo.dev/artifacts/eas/uwirmcshArC3Ki16XqJYmH.apk

## 1. User Personas

**ปลื้ม**  
- อายุ: 20 ปี  
- อาชีพ: นักศึกษาปี 2  
- ความต้องการ: ต้องการแอพสั่งอาหารในร้านค้าที่มี UI ใช้งานง่าย

**สัน**  
- อายุ: 20 ปี  
- อาชีพ: นักศึกษาปี 2  
- ความต้องการ: ต้องการแอพที่สามารถจองโต๊ะได้สะดวก

**มาค์ก**  
- อายุ: 26 ปี  
- อาชีพ: นักธุรกิจร้านอาหาร  
- ความต้องการ: ต้องการแอพที่ต้นทุนต่ำ ใช้งานง่าย รองรับร้านอาหารขนาดเล็ก

## 2. App Goals

- พัฒนาแอพที่ใช้งานง่าย ไม่ซับซ้อน
- มีระบบสั่งอาหาร และจองโต๊ะที่เข้าใจง่าย
- สร้างแอพที่ต้นทุนต่ำ เพื่อรองรับกลุ่มร้านอาหาร SME

## 3. Mockup & User Flow

**Mockup**
1. หน้า MainScreen: มีหน้าที่ใช้สั่งอาหารต่างๆ 
2. หน้า BookTable: มีหน้าที่จองโต็ะอาหาร
3. หน้า CartScreen: มีหน้าที่ดูอาหารที่เราสั่งไว้แล้ว และ confirm อาหารและโต้ะที่เราสั่ง

**User Flow:**
1. เปิดแอพ
2. เลือกดูเมนูอาหาร
3. เลือกอาหารที่ต้องการ
4. ดูสถานะโต๊ะว่าง
5. จองโต๊ะที่ว่าง
6. ตรวจสอบรายการอาหารและโต๊ะที่จอง
7. ชำระเงิน

## 4. App Implementation

- **Framework**: React Native (v0.76.9)
- **Toolchain**: Expo (v52.0.46)
- **Library**: React (v18.3.1)

## 5. Features Implemented ✅

- เพิ่ม / แก้ไข / ลบ รายการอาหารได้
- ระบบจองโต๊ะอัตโนมัติ
- แสดงข้อมูลอาหารแบบเรียลไทม์

## App Screenshots

- ![MainScreen](/picture/MainScreen.jpg)
- ![BookTable](/picture/BookTable.jpg)
- ![CartScreen](/picture/CartScreen.jpg)


## Deployment 

**Build Type**

- Debug

**Platform Tested**

- Android

**README & Install Guide**

ลิงค์ https://expo.dev/artifacts/eas/uwirmcshArC3Ki16XqJYmH.apk

1. ดาวน์โหลดไฟล์ .apk
2. เปิดในอุปกรณ์ Android
3. ติดตั้งผ่าน File Manager

## 6. Reflection (สรุปการเรียนรู้)

**สิ่งที่ได้เรียนรู้:**
- ใช้งาน AI Cursor เพื่อช่วยพัฒนาฟีเจอร์
- เชื่อมต่อกับ Database ฝั่ง Client
- เสริมระบบหลังบ้าน (Order Management System) หากมีเวลาเพิ่มเติม

## 7. AI Assisted Development

| หมวด | Prompt ที่ใช้ | ผลลัพธ์ที่ได้ |
|:---|:---|:---|
| Idea Generation | แนะนำหน่อย ว่าประเภทของแอพที่ใช้ในร้านอาหาร มีแบบไหนบ้าง | เข้าใจกลุ่มเป้าหมายชัดเจนขึ้น |
| UI Layout | ช่วยออกแบบหน้าจองโต๊ะของลูกค้าหน่อย ขอแบบใช้งานง่าย | ได้โครงสร้างข้อมูลที่ต้องมีในหน้าจองโต๊ะ |
| Code Writing | ช่วยเขียนโค้ดให้ เวลากดหน้า MENU ให้ข้อมูลไปแสดงในหน้าคิดเงินหน่อย | ปรับ Logic การทำงานของหน้า MENU และ Checkout |
| Debug | ช่วยเขียนกัน user error ในแอพให้หน่อย | ได้ฟังก์ชันป้องกัน user error เช่น กันปุ่มกดซ้ำ |
| Deployment | วิธี deploy react native ยังไงใน EXPO | เรียนรู้การใช้คำสั่ง eas build --platform android --profile production เพื่อ Deploy |
