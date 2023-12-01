import React, { useState, useEffect, useRef } from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";
import { useNavigate } from 'react-router-dom';
import closebutton from '../image/close1.png';

import { MdOutlineEventAvailable } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import { FaBars } from "react-icons/fa";

import '../css/Sidebar.css';

import {handleLogout} from './logout';

const Sidebar=() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(); // 사이드바 요소에 대한 ref를 생성
    const  navigate  = useNavigate();
  // 클릭 이벤트 리스너
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false); // 사이드바 외부를 클릭하면 사이드바를 닫음
    }
  };

  // 컴포넌트가 마운트되었을 때 클릭 이벤트 리스너를 등록하고, 언마운트되었을 때 리스너를 제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    return (
      <>
       {!isSidebarOpen && (
          <button
            style={{position:"absolute",right:1, width: 50, height: 50, borderRadius:10, backgroundColor:"white" }}
            className="btn-menu"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            {/* <Icon name="burger" className="w-6 h-6" />
             */}
             {/* <GoSidebarExpand size={30} /> */}
             <FaBars size={30}/>
          </button>
        )}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`overlay ${isSidebarOpen ? "block" : "hidden"}`}
        style={{zIndex:30}}
      />
      {isSidebarOpen && (
      <div ref={sidebarRef} className="sidebarobj" style={{height: isSidebarOpen ? '100vh' : '0'}} >
      
      {/* 사이드바 펼쳤을때 나머지화면 어둡게 만들기 */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <p id='closebutton' onClick={() => setIsSidebarOpen(false)}>X</p> */}
        <img src={closebutton} id='closebutton' onClick={() => setIsSidebarOpen(false)} ></img>
        <Navigation 
            onSelect={({ itemId }) => {
                if (itemId === 'logout') {
                handleLogout();
              } else {
                navigate(itemId);
              }
            }}
          
            // you can use your own router's api to get pathname
            
            items={[
          
              {
                className:'sidebaritem',
                title: '마이 페이지',
                itemId: '/mypage',
                elemBefore: () =><FaCircleUser />,
              },
              {
                className:'sidebaritem',
                title: '이벤트',
                itemId: '/event',
            
                elemBefore: () => <MdOutlineEventAvailable />
              },
            
              {
                className:'sidebaritem',
                title: '영수증 촬영',
                itemId: '/receiptfilming',
            
                elemBefore: () => <MdAddAPhoto />
              },
              {
                className:'sidebaritem',
                title: '상점',
                itemId: '/Store',
            
                elemBefore: () => <FaShoppingBag />
              },
              {
                className:'sidebaritem',
                title: '로그아웃',
                itemId: 'logout',
                elemBefore: () => <IoLogOut />
              },
            ]}
          
          />
          <br></br>
      
          

        </div>
        )}
      </>
    );
};
export default Sidebar;