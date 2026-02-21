import React, { useState, useEffect, useRef } from 'react';
import EventPage from './page/EventPage';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from './Lottie/animation.json';

// src/assets/categories 이미지 import (파일명: categories_1.png 형식)
import cat1 from './assets/categories/categories_1.png';
import cat2 from './assets/categories/categories_2.png';
import cat3 from './assets/categories/categories_3.png';
import cat4 from './assets/categories/categories_4.png';
import cat5 from './assets/categories/categories_5.png';
import cat6 from './assets/categories/categories_6.png';
import cat1_1 from './assets/categories/categories_1_1.png';
import cat1_2 from './assets/categories/categories_1_2.png';
import cat1_3 from './assets/categories/categories_1_3.png';
import cat1_4 from './assets/categories/categories_1_4.png';
import cat1_5 from './assets/categories/categories_1_5.png';
import cat1_6 from './assets/categories/categories_1_6.png';
import adImg from './assets/ad/ad.png';

import res_1 from './assets/Restaurant/res_2.png';

import freeDeliveryIcon from './assets/freeDelivery/freeDeliveryIcon.png';
import right from './assets/freeDelivery/right.png';

import { useResizeObserver } from './Utile/resizeObserver';
import { dimmedBackground, dimmedScale, EnterFromBottom_modal, button_animate } from './Animation_Variants/variants';
import ThanksPage from './page/ThanksPage';

// --- 데이터 (Mock Data) ---------------------------------------------------------------------------------------------------------------------------

const CATEGORIES = [
  { id: 1, name: '딱1인분', img: cat1 },
  { id: 2, name: '양식', img: cat2 },
  { id: 3, name: '치킨', img: cat3 },
  { id: 4, name: '커피/차', img: cat4 },
  { id: 5, name: '버거', img: cat5 },
  { id: 6, name: '버거', img: cat6 },
];

const CATEGORIES_2 = [
  { id: 1, name: `장보기·쇼핑 ${'\n'}더보기`, img: cat1_1 },
  { id: 2, name: 'GS25', img: cat1_2 },
  { id: 3, name: 'CU', img: cat1_3 },
  { id: 4, name: `홈플러스 ${'\n'}익스프레스`, img: cat1_4 },
  { id: 5, name: 'GS더프레시', img: cat1_5 },
  { id: 6, name: '하나로마트', img: cat1_6 },
]

const RESTAURANTS = [
  {
    id: 1,
    name: '내일도 스파게티 문정점',
    rating: 4.9,
    reviewCount: '8,178',
    distance: '1.9km',
    time: '26분',
    img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    recentOrder: '대왕소세지 오므라이스',
    badge: 'wow + 즉시할인',
    coupon: null,
    reviewEvent: true,
  },
  {
    id: 2,
    name: '샐러리 포차페이 장지점',
    rating: 4.9,
    reviewCount: '7,244',
    distance: '1.5km',
    time: '25분',
    img: res_1,
    recentOrder: '[1인] 김치삼겹구이',
    badge: 'wow + 즉시할인',
    coupon: '9,000원 쿠폰',
    reviewEvent: true,
  },
];

const FREE_DELIVERY_ITEMS = [
  {
    id: 1,
    discount: '29%',
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', // 샌드위치 이미지 (임시)
    badgeText: '하나만 담아도 무료배달',
    title: '베이컨 에그(BLT)\n샌드위치',
    price: '7,800원',
    originalPrice: '11,000원',
    store: '샌딜리버블 SAND & SALAD ...',
    rating: '4.9',
    reviewCount: '2,065',
    time: '17분'
  },
  {
    id: 2,
    discount: '45%',
    img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop', // 볶음밥 이미지 (임시)
    badgeText: '하나만 담아도 무료배달',
    title: '[하나만]불닭 필라프',
    price: '9,900원',
    originalPrice: '18,000원',
    store: '파스타입니다 본점',
    rating: '5.0',
    reviewCount: '8,508',
    time: '44분',
    isPasta: true
  },
  {
    id: 3,
    discount: '47%',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', // 튀김 이미지 (임시)
    badgeText: '하나만 담아도 무료배달',
    title: '튀김(야채,고구마...)\n묵6새우...',
    price: '8,000원',
    originalPrice: '15,000원',
    store: '나의 최애떡볶이',
    rating: '4.9',
    reviewCount: '2,642',
    time: '30분'
  }
];

// --- 컴포넌트 ---------------------------------------------------------------------------------------------------------------------------------------------------

const Header = () => (
  <header className="p-4 flex justify-between items-center bg-white sticky top-0">
    <div className="flex items-center text-base font-bold cursor-pointer text-gray-800">
      <i className="fa-solid fa-location-arrow mr-1.5 text-orange-400"></i>
      서울 송파구 올림픽로 265
      <i className="fa-solid fa-chevron-down ml-1.5 text-gray-800 text-xs"></i>
    </div>
    <i className="fa-regular fa-bell text-xl text-gray-800"></i>
  </header>
);

const SearchBar = () => (
  <div className="px-4 pb-4">
    <div className="bg-white border border-gray-200 rounded-full px-4 py-2.5 flex items-center shadow-sm">
      <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2.5"></i>
      <input 
        type="text" 
        className="w-full border-none outline-none text-sm text-gray-800 placeholder-gray-400"
        placeholder="박건도님, 김밥 어때요?" 
      />
    </div>
  </div>
);

const CategoryItem = ({ item }) => {
  const renderIcon = (img) => {
    // 공통 스타일: 원형, 크기, 정렬
    const baseClass = "w-[60px] h-[60px] mb-1.5 flex justify-center items-center overflow-hidden object-cover";
    return <img src={item.img} className={baseClass} alt={item.name} />;
  };
  return (
    <div className="flex flex-col items-center w-[60px]">
      {renderIcon(item.img)}
      <span className="text-[14px] leading-[1.4] w-[66px] text-center text-gray-800 whitespace-pre-line">{item.name}</span>
    </div>
  );
};

const Banner = () => (
  <div 
    className="mb-5 min-h-[140px] w-full text-white p-5 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${adImg})` }}
  >
    <div className="absolute bottom-2.5 right-2.5 bg-black/40 text-white px-2 py-0.5 rounded-full text-[10px]">
      4 / 7 전체보기
    </div>
  </div>
);

const RestaurantCard = ({ data }) => (
  <div className="min-w-[280px] bg-white overflow-hidden cursor-pointer">
    {/* 이미지 영역 */}
    <div className="relative w-full h-40">
      <img src={data.img} className="w-full h-full object-cover rounded-xl" alt={data.name} />
      <div className="absolute left-[50%] translate-x-[-50%] w-[237px] h-[30px] translate-y-[-50%] bg-gradient-to-r from-[#0D3165] via-[#044DBE] to-[#4C97F4] text-white px-2.5 py-1.5 text-xs font-semibold flex items-center justify-center rounded-full">
        <span className="bg-[#3C7ACF] text-white px-1 rounded-[3px] mr-1.5 text-[10px] font-medium rounded-full">wow</span> 
        무료배달 + 1,000원 즉시할인
      </div>
    </div>

    {/* 정보 영역 */}
    <div className="pt-[22px]">
      <div className="text-base font-bold mb-1 flex items-center">
        {data.name}
        <span className="bg-blue-50 text-[#0088cc] text-[12px] px-1 py-0 ml-1.5 rounded-full">
        <span className="bg-[#3C7ACF] text-white px-1 py-[2px] rounded-[3px] mr-1.5 text-[10px] font-light rounded-full">wow</span> 
          + 즉시할인</span>
      </div>
      <div className="text-[13px] text-gray-600 mb-1">
        <i className="fa-solid fa-star text-yellow-400 mr-1"></i> 
        {data.rating}({data.reviewCount}) · {data.distance} · {data.time}
      </div>
      <div className="text-xs text-gray-400 mb-1.5">최근주문 {data.recentOrder}</div>
      <div className="flex gap-1">
        {data.coupon && (
          <span className="inline-block bg-[#D9F4FF] text-[#0589ED] text-[11px] px-1.5 py-0.5 rounded font-semibold">
            <i className="fa-solid fa-tag mr-1"></i> {data.coupon}
          </span>
        )}
        {data.reviewEvent && (
          <span className="inline-block bg-[#D9F4FF] text-[#0589ED] text-[11px] px-1.5 py-0.5 rounded font-semibold">
            <i className="fa-solid fa-gift mr-1"></i> 리뷰이벤트
          </span>
        )}
      </div>
    </div>
  </div>
);

const FreeDeliveryCard = ({ data }) => (
  <div className="min-w-[160px] w-[160px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col cursor-pointer shrink-0">
    {/* 카드 이미지 영역 */}
    <div className="relative h-[160px] w-full bg-gray-100">
      <img src={data.img} className="w-full h-full object-cover" alt={data.title} />
      {/* 할인율 뱃지 */}
      <div className="absolute top-3 left-3 bg-[#E43118] text-white text-[14px] font-bold px-2 py-0.5 rounded-full">
        {data.discount}
      </div>
      {/* 하나만 담아도 무료배달 라벨 */}
      <div className="absolute bottom-0 left-0 w-full pt-6 pb-1 px-3 bg-gradient-to-t from-black/55 to-transparent">
        <span className="text-[#E25526] font-bold text-[13px] tracking-tight">{data.badgeText}</span>
      </div>
    </div>

    {/* 정보 영역 */}
    <div className="p-3 pt-2 flex flex-col flex-1">
      <h4 className="text-[16px] text-gray-800 font-medium leading-[1.3] mb-2 whitespace-pre-line h-[42px] line-clamp-2">
        {data.title}
      </h4>
      <div className="mb-3">
        <span className="text-[#E43118] text-[16px] font-bold mr-1.5">{data.price}</span>
        <span className="text-gray-400 text-[13px] line-through">{data.originalPrice}</span>
      </div>
      <div className="mt-auto">
        <div className="text-[13px] text-gray-500 truncate mb-1.5 flex items-center gap-1">
          {data.isPasta && (
            <span className="w-4 h-4 rounded-full bg-[#11233F] text-[#F9CA24] text-[8px] flex items-center justify-center font-bold leading-none">
              파스타<br/>입니다
            </span>
          )}
          {data.store}
        </div>
        <div className="text-[13px] text-gray-600 font-medium flex items-center">
          <i className="fa-solid fa-star text-[#FFB300] mr-1 text-[11px]"></i>
          {data.rating}({data.reviewCount}) · {data.time}
        </div>
      </div>
    </div>
  </div>
);

const FreeDeliverySection = () => (
  <div className="bg-[#FFF6EF] py-6 mb-4">
    {/* 헤더 타이틀 영역 */}
    <div className="px-5 mb-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="relative flex flex-col items-center justify-center w-[44px] h-[44px]">
          <img src={freeDeliveryIcon} alt="free delivery icon" className="w-full h-full" />
        </div>
        <div className="pt-1">
          <div className="text-[14px] text-gray-700 font-medium mb-0.5">최소주문금액 걱정 없이</div>
          <div className="text-[20px] font-bold text-gray-900 leading-tight">하나만 담아도 무료배달</div>
        </div>
      </div>
      <div className="text-[15px] text-gray-800 font-medium cursor-pointer flex items-center pb-0.5">
        전체보기 <img src={right} className="w-[16px] h-[16px] ml-1"/>
      </div>
    </div>

    {/* 가로 스크롤 카드 리스트 */}
    <section className="flex px-5 gap-3 overflow-x-auto scrollbar-hide pb-2">
      {FREE_DELIVERY_ITEMS.map(item => (
        <FreeDeliveryCard key={item.id} data={item} />
      ))}
    </section>
  </div>
);

const BottomNav = ({ stage }) => {
  const [activeTab, setActiveTab] = useState('home');
  const navItems = [
    { id: 'home', icon: 'fa-house', label: '홈' },
    { id: 'search', icon: 'fa-magnifying-glass', label: '검색' },
    { id: 'fav', icon: 'fa-regular fa-heart', label: '즐겨찾기' },
    { id: 'order', icon: 'fa-list-check', label: '주문내역' },
    { id: 'my', icon: 'fa-regular fa-user', label: 'My 이츠' },
  ];

  // BottomNav의 높이 (py-2.5 + 아이콘 + 텍스트 + 여백)
  const navHeight = 70; // 대략적인 높이

  return (
    <nav 
      className="fixed w-full max-w-[393px] bg-white border-t border-gray-100 flex justify-around py-2.5 transition-transform duration-300"
      style={{
        bottom: stage === 'event' ? `-${navHeight}px` : '0'
      }}
    >
      {navItems.map((item) => (
        <a 
          key={item.id} 
          href="#!" 
          className={`flex flex-col items-center text-[10px] no-underline cursor-pointer ${activeTab === item.id ? 'text-gray-900' : 'text-gray-400'}`}
          onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }}
        >
          <i className={`fa-solid ${item.icon} text-xl mb-1`}></i>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

const BoottmButton = ({ onRegisterClick, stage, reviewText, setReviewText, setShowLetterAnimation }) => {
  const isActive = reviewText.length >= 20;

  // 하단 버튼 영역만 show/hidden 제어 (등록하기 클릭 시 이 부분만 hidden)
  const [bottomShow, setBottomShow] = useState(true);

  const handleRegisterClick = () => {
    setBottomShow(false);
    setShowLetterAnimation(true);
  };

  return (
    <>
      {/* 그라데이션 배경 오버레이 */}
      <motion.div className="fixed -bottom-full left-0 right-0 w-full max-w-[393px] mx-auto pointer-events-none z-10"
        variants={EnterFromBottom_modal}
        custom={80}
        initial="hidden"
        animate={stage === "event" && bottomShow ? "show" : "hidden"}
      >
        {/* 페이드 영역 */}
        <div className="h-[150px] bg-gradient-to-b from-transparent via-white/50 to-white" />
        {/* 완전 흰색 영역 (108px) */}
        <div className="h-[400px] bg-white" />
      </motion.div>

      {/* 하단 — 등록하기 클릭 시 이 블록만 hidden */}
      <motion.div
        className="fixed gap-x-[9px] bottom-0 w-full flex max-w-[393px] h-[108px] flex-col z-50 px-[25px] z-0"
        variants={EnterFromBottom_modal}
        custom={0}
        initial="hidden"
        animate={stage === "event" && bottomShow ? "show" : "hidden"}
      >
        <div className="flex flex-row gap-x-[9px] w-full">
          <button className="w-full h-[55px] font-bold border border-[#00AFFE] text-[#00AFFE] rounded-[4px] bg-white">
            <span>다음에</span>
          </button>
          <motion.button
            onClick={handleRegisterClick}
            className="w-full h-[60px] font-bold rounded-[4px]"
            variants={button_animate}
            animate={isActive ? "active" : "inactive"}
          >
            <span>등록하기</span>
          </motion.button>
        </div>
        <div className="flex flex-row text-[14px] text-gray-400 items-center mt-[12px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/check_1.png`}
            className="w-[16px] h-[16px] mr-[4px]"
          />
          <span>이 화면 다시 보지 않기</span>
        </div>
      </motion.div>
    </>
  );
};

function App() {

    // --- 상태변화 ---------------------------------------------------------------------------------------------------------------------------------------------------------
    const { ref: containerRef, width, height } = useResizeObserver();
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 1초 후 레이아웃 나타나게 만드는 함수
  const [stage, setStage] = useState(null);
  // showAnimation: 애니메이션 표시 여부
  const [showAnimation, setShowAnimation] = useState(false);
  // 등록하기 버튼 누를 시 편지 애니메이션 표시 여부
  const [showLetterAnimation, setShowLetterAnimation] = useState(false);
  // reviewText: 리뷰 텍스트 상태 (Review와 BoottmButton에서 공유)
  const [reviewText, setReviewText] = useState("");

  // lottieRef: Lottie 애니메이션 참조
  const lottieRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // setStage("event");
    }, 1000); // 1초 후 event로 변경
    
    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    // 전체 배경 및 모바일 컨테이너 설정
    <div className="bg-gray-100 min-h-screen flex justify-center font-sans">
      <div 
        ref={containerRef}
        className="relative overflow-x-hidden overflow-y-hidden w-full max-w-[393px] bg-white min-h-screen relative pb-[70px] mx-auto shadow-lg"
      >

        {/* 딤드 */}
        <motion.div className="absolute inset-0 bg-black/40 z-10"
          variants={dimmedBackground}
          initial="hidden"
          animate={stage === "event" ? "show" : "hidden"}
        >
        </motion.div>


        {/* 배경 */}
        <motion.div className="absolute inset-0"
          variants={dimmedScale}
          initial="hidden"
          animate={stage === "event" ? "show" : "hidden"}
        >
          <Header />
          <SearchBar />
          
          <ul className="divide-y divide-gray-200">
            {/* 카테고리 그리드 */}
            <div className="inline-flex overflow-x-auto gap-x-2 px-4 py-2.5 text-center">
              {CATEGORIES.map(cat => <CategoryItem key={cat.id} item={cat} />)}
            </div>
            {/* 카테고리 그리드 */}
            <div className="inline-flex overflow-x-auto gap-x-2 px-4 py-2.5 text-center">
              {CATEGORIES_2.map(cat => <CategoryItem key={cat.id} item={cat} />)}
            </div>
          </ul>

          <Banner />

          <h3 className="text-lg font-bold px-4 pb-2.5 text-gray-800">자주 주문한 맛집</h3>
          
          {/* 가로 스크롤 섹션 (스크롤바 숨김 처리) */}
          <section className="flex px-4 pb-5 gap-4 scrollbar-hide">
            {RESTAURANTS.map(res => <RestaurantCard key={res.id} data={res} />)}
          </section>

          <FreeDeliverySection />
          
        </motion.div>


        {stage === "event" && <EventPage reviewText={reviewText} setReviewText={setReviewText} showLetterAnimation={showLetterAnimation} setShowLetterAnimation={setShowLetterAnimation} setShowAnimation={setShowAnimation} />}
        <BottomNav stage={stage}/>
        {stage === "event" && <BoottmButton stage={stage} reviewText={reviewText} setReviewText={setReviewText} setShowLetterAnimation={setShowLetterAnimation} />}

        {/* Lottie 애니메이션 오버레이 */}
        {showAnimation && (
          <motion.div className="absolute inset-0 h-full z-50 overflow-hidden">
              <ThanksPage />
            <motion.div 
              className="w-full h-full absolute inset-0"
              style={{
                transform: width && height ? `scale(${height / width})` : 'scale(1)'
              }}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                // onComplete={() => setShowAnimation(false)}
                loop={false}
                autoplay
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;