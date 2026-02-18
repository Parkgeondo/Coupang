import React, { useState, useEffect, useRef } from 'react';
import EventPage from './page/EventPage';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from './Lottie/animation.json';
import { useResizeObserver } from './Utile/resizeObserver';
import { dimmedBackground, dimmedScale, EnterFromBottom_modal, button_animate } from './Animation_Variants/variants';
import ThanksPage from './page/ThanksPage';

// --- 데이터 (Mock Data) ---------------------------------------------------------------------------------------------------------------------------

const CATEGORIES = [
  { id: 1, name: '딱1인분', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop' },
  { id: 2, name: '양식', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=100&h=100&fit=crop' },
  { id: 3, name: '치킨', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100&fit=crop' },
  { id: 4, name: '커피/차', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop' },
  { id: 5, name: '버거', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop' },
  { id: 6, name: '버거', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop' }
  // { id: 6, name: '장보기·쇼핑', icon: 'fa-basket-shopping', color: '#9b59b6', type: 'icon' },
  // { id: 7, name: 'GS25', text: 'GS25', color: '#007cba', textColor: 'white', type: 'text' },
  // { id: 8, name: 'CU', text: 'CU', color: '#652f8d', textColor: '#8dc63f', type: 'text' },
  // { id: 9, name: '홈플러스', text: 'Home\nplus', color: '#e60012', textColor: 'white', type: 'text', fontSize: '10px' },
  // { id: 10, name: 'GS더프레시', text: 'GS\nFresh', color: '#00564d', textColor: 'white', type: 'text', fontSize: '10px' },
];

const RESTAURANTS = [
  {
    id: 1,
    name: '오늘은 오므라이스 송파점',
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
    name: '삼겹살은 원래 보약이다',
    rating: 4.9,
    reviewCount: '7,244',
    distance: '1.5km',
    time: '25분',
    img: 'https://images.unsplash.com/photo-1624374053855-442438575a60?w=400&h=300&fit=crop',
    recentOrder: '[1인] 김치삼겹구이',
    badge: 'wow + 즉시할인',
    coupon: '9,000원 쿠폰',
    reviewEvent: true,
  },
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
  const renderIcon = () => {
    // 공통 스타일: 원형, 크기, 정렬
    const baseClass = "w-[60px] h-[60px] rounded-full mb-1.5 flex justify-center items-center overflow-hidden object-cover bg-gray-100";
    
    if (item.type === 'text') {
      return (
        <div 
          className={`${baseClass} font-bold text-center leading-tight whitespace-pre-line`}
          style={{ backgroundColor: item.color, color: item.textColor, fontSize: item.fontSize || '12px' }}
        >
          {item.text}
        </div>
      );
    } else if (item.type === 'icon') {
      return (
        <div className={baseClass} style={{ backgroundColor: item.color }}>
          <i className={`fa-solid ${item.icon} text-white text-base`}></i>
        </div>
      );
    } else {
      return <img src={item.img} className={baseClass} alt={item.name} />;
    }
  };

  return (
    <div className="flex flex-col items-center w-[60px]">
      {renderIcon()}
      <span className="text-[11px] text-gray-800 whitespace-nowrap">{item.name}</span>
    </div>
  );
};

const Banner = () => (
  <div className="my-5 bg-[#ff8c00] text-white p-5 relative overflow-hidden flex justify-between items-center">
    <div className="">
      <h2 className="text-xl font-extrabold mb-1.5 leading-snug">이츠 기프트카드로<br />식사를 선물하세요</h2>
      <a href="#!" className="inline-flex items-center text-[13px] text-white">
        카카오톡 선물하기로 보내기 
        <i className="fa-solid fa-chevron-right text-[10px] ml-1.5"></i>
      </a>
    </div>
    
    {/* 카드 이미지 느낌 */}
    <div className="bg-white p-2.5 rounded w-20 h-12 flex items-center justify-center text-[#ff8c00] font-bold shadow-md transform -rotate-6">
      <div className="text-center text-xs leading-tight">coupang<br />eats</div>
    </div>
    
    <div className="absolute bottom-2.5 right-2.5 bg-black/40 text-white px-2 py-0.5 rounded-full text-[10px]">
      4 / 7 전체보기
    </div>
  </div>
);

const RestaurantCard = ({ data }) => (
  <div className="min-w-[280px] bg-white rounded-xl overflow-hidden cursor-pointer">
    {/* 이미지 영역 */}
    <div className="relative w-full h-40">
      <img src={data.img} className="w-full h-full object-cover" alt={data.name} />
      <div className="absolute bottom-0 left-0 w-full bg-[#0088cc] text-white px-2.5 py-1.5 text-xs font-semibold flex items-center rounded-b-xl">
        <span className="bg-white text-[#0088cc] px-1 rounded-[3px] mr-1.5 text-[10px] font-bold italic">wow</span> 
        무료배달 + 1,000원 즉시할인
      </div>
    </div>

    {/* 정보 영역 */}
    <div className="py-2.5">
      <div className="text-base font-bold mb-1 flex items-center">
        {data.name}
        <span className="bg-blue-50 text-[#0088cc] text-[10px] px-1 py-0.5 ml-1.5 rounded">wow + 즉시할인</span>
      </div>
      <div className="text-[13px] text-gray-600 mb-1">
        <i className="fa-solid fa-star text-yellow-400 mr-1"></i> 
        {data.rating}({data.reviewCount}) · {data.distance} · {data.time}
      </div>
      <div className="text-xs text-gray-400 mb-1.5">최근주문 {data.recentOrder}</div>
      <div className="flex gap-1">
        {data.coupon && (
          <span className="inline-block bg-blue-50 text-[#0088cc] text-[11px] px-1.5 py-0.5 rounded font-semibold">
            <i className="fa-solid fa-tag mr-1"></i> {data.coupon}
          </span>
        )}
        {data.reviewEvent && (
          <span className="inline-block bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded font-semibold">
            <i className="fa-solid fa-gift mr-1"></i> 리뷰이벤트
          </span>
        )}
      </div>
    </div>
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
            className="w-full h-[55px] font-bold rounded-[4px]"
            variants={button_animate}
            animate={isActive ? "active" : "inactive"}
          >
            <span>등록하기</span>
          </motion.button>
        </div>
        <div className="flex flex-row text-[14px] text-gray-400 items-center mt-[12px]">
          <img src="/assets/check_1.png" className="w-[16px] h-[16px] mr-[4px]"/>
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
      setStage("event");
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
          
          {/* 카테고리 그리드 */}
          <div className="inline-flex overflow-x-auto gap-x-3 px-4 py-2.5 text-center">
            {CATEGORIES.map(cat => <CategoryItem key={cat.id} item={cat} />)}
          </div>

          <Banner />

          <h3 className="text-lg font-bold px-4 pb-2.5 text-gray-800">자주 주문한 맛집</h3>
          
          {/* 가로 스크롤 섹션 (스크롤바 숨김 처리) */}
          <section className="flex overflow-x-auto px-4 pb-5 gap-4 scrollbar-hide">
            {RESTAURANTS.map(res => <RestaurantCard key={res.id} data={res} />)}
          </section>
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