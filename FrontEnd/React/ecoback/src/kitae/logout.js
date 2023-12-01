import React from "react";
import { IoLogOut } from "react-icons/io5";

export function handleLogout() {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    
    if (confirmLogout) {
    // 로컬 스토리지 비우기
      localStorage.removeItem("token");
    // 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    }
  }

