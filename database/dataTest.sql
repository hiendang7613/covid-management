----SoNguoiTungTrangThai
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","TuVong","BinhThuong")
VALUES(CURRENT_DATE - 1,0,0,0,0,0,0,0);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","TuVong","BinhThuong")
VALUES(CURRENT_DATE,0,0,0,0,0,0,0);

----NoiDieuTriCachLy
INSERT INTO "NoiDieuTriCachLy"("SoLuongHienTai","SucChua")
VALUES(15,30);
INSERT INTO "NoiDieuTriCachLy"("SoLuongHienTai","SucChua")
VALUES(10,25);

----NguoiLienQuan
INSERT INTO "NguoiLienQuan"("TrangThaiHienTai","NoiDieuTri")
VALUES('F1',1);
INSERT INTO "NguoiLienQuan"("TrangThaiHienTai","NoiDieuTri")
VALUES('F2',1);
INSERT INTO "NguoiLienQuan"("TrangThaiHienTai","NoiDieuTri")
VALUES('F2',1);
INSERT INTO "NguoiLienQuan"("TrangThaiHienTai","NoiDieuTri")
VALUES('F3',1);
INSERT INTO "NguoiLienQuan"("TrangThaiHienTai","NoiDieuTri")
VALUES('F3',2);

----MoiLienHe
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(1,2);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(1,3);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(2,4);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(2,5);

----GoiNhuYeuPham
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi")
VALUES('Hoa qua sach',CURRENT_DATE);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi")
VALUES('Thuc An Kieng',CURRENT_DATE);

----LichSuMuaGoiNYP
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien")
VALUES (1,1,120000);
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien")
VALUES (1,2,50000);

---LichSuThanhToan
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(1,NOW(),100000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(1,NOW(),200000);
