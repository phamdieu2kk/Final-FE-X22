import React, { useEffect, useState } from "react";
import { Carousel, Button } from "antd"; // Import Button component from antd

const TopicSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (n) => {
    const newIndex = currentPage + n;
    if (newIndex >= 0 && newIndex < Math.ceil(challenges.length / challengesPerPage)) {
      setCurrentPage(newIndex);
    }
  };

  const challengesPerPage = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      handlePageChange(1); // Chuyển slide qua trang kế tiếp
    }, 5000); // 5000 milliseconds = 5 giây
    return () => clearInterval(timer);
  }, [currentPage]); // Chạy useEffect mỗi khi currentPage thay đổi

  return (
    <div  className="container-page">
      <h1  style={{
        textAlign: "center",
      }} className="home__title">Thử thách nổi bật</h1>
      <Carousel autoplay dotPosition="bottom" beforeChange={(prev, next) => setCurrentPage(next)}>
       
      </Carousel>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button onClick={() => handlePageChange(-1)} type="primary">Prev</Button>
        <Button onClick={() => handlePageChange(1)} type="primary">Next</Button>
      </div>
    </div>
  );
};

export default TopicSlider;